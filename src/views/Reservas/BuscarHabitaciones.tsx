import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import { Hotel, HotelSearch, HotelSelectOption,MealPlanAvailable,PromoDiscount,ReservationData,RoomTypeDTO, RoomTypeDTOWithPrice } from "../../@types/Hotel";
import '../../styles/styles.css'
import HotelSearchForm from "../../components/forms/HotelSearchForm";


import { featureIcons } from "../../helpers/featureIcons"; // Ruta del archivo
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import RoomDetailsModal from "../../components/modals/RoomDetailsModal";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import { featurePriority } from '../../helpers/featurePriority';
import RoomCarrusel from "../../components/carrusels/RoomCarrusel";
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';

import IsTokenExpired from "../../helpers/IsTokenExpired";

export default function BuscarHabitaciones() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (IsTokenExpired()) {
      localStorage.removeItem("jwtToken"); // Eliminar el token
      
    }
  }, []);

    const [selectedRoom, setSelectedRoom] = useState<RoomTypeDTO | null>(null);

    const handleShowMore = (room: RoomTypeDTO) => {
      setSelectedRoom(room);
    };

    const closeModal = () => {
      setSelectedRoom(null);
    };
  
    const [hotelData , setHotelData] = useState<Hotel | null >(null);

    const [availableRoomTypesDTOsData, setAvailableRoomTypesDTOsData] = useState<RoomTypeDTO[]>([]);
    
    const navigate = useNavigate();

   const [promoDiscount, setPromoDiscount] = useState<PromoDiscount | null>(null);

    const [hotelsByLocation, setHotelsByLocation] = useState<Map<string, HotelSelectOption[]>>(new Map());

    const [searchParams] = useSearchParams();
    const hotelId = searchParams.get('hotelId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const guests = searchParams.get('guests');
    const promoCode = searchParams.get('promoCode');

    const [hotelSearch, setHotelSearch] = useState<HotelSearch>({
      hotelId: hotelId ? parseInt(hotelId) : 0,
      startDate: startDate || '',
      endDate: endDate || '',
      guests: guests? parseInt(guests) : 1 ,
      promoCode: promoCode? promoCode : "" 
    });

    const [selectedMealPlan, setSelectedMealPlan] = useState<{ [key: number]: MealPlanAvailable }>({});

    const handleMealPlanChange = (roomId: number, mealPlan: MealPlanAvailable) => {
      
      setSelectedMealPlan((prev) => ({
        ...prev,
        [roomId]: mealPlan,
      }));
     
    };

    const habitacionesConPrecios = useMemo(() => {
      return availableRoomTypesDTOsData.map((room) => {
         
        const mealPlanModifier = selectedMealPlan[room.id] ? selectedMealPlan[room.id]?.priceModifier : 0;
        
        return {
          ...room,
          finalPrice: room.roomBasePrice * (1 + mealPlanModifier),
        };
      });
     
    }, [availableRoomTypesDTOsData, selectedMealPlan]);

  

  
    useEffect(() => {
        document.title = `Habitaciones ${hotelId} - RJHotels`;
      }, []);
      
    
      useEffect(() => {
        const fetchSearchRoomsData = async () => {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            
            // Realizamos el llamado GET al endpoint
            const response = await axios.get(`${baseUrl}api/buscar-habitaciones`, {
              params: {
                hotelId: hotelId,
                startDate: startDate,
                endDate: endDate,
                guests: guests,
                promoCode: promoCode,
              }
            });

            
            const {hotel, availableRoomTypesDTOs, discount} = response.data

            setHotelData(hotel)
           
            setAvailableRoomTypesDTOsData(availableRoomTypesDTOs)

            setPromoDiscount(discount)

            setIsLoading(false)
            
            console.log(response.data)

            // Aquí puedes usar los datos, por ejemplo, actualizando el estado de tu componente
          } catch (error) {
            // Manejo de errores si la llamada falla
            console.error('Error al obtener los datos:', error);
          }
        };
        fetchSearchRoomsData();
      
      }, [searchParams]);

      useEffect(() => {
        const fetchHomePageData = async () => {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            console.log(baseUrl); 
            // Realizamos el llamado GET al endpoint
            const response = await axios.get(`${baseUrl}api/home`);
            
            // Si la respuesta es exitosa, podemos acceder a los datos como response.data
            const hotelsByLocationData: Map<string, HotelSelectOption[]> = response.data.hotelsByLocation;
            const formattedMap = new Map(Object.entries(hotelsByLocationData));
            setHotelsByLocation(formattedMap);
            
            // Aquí puedes usar los datos, por ejemplo, actualizando el estado de tu componente
          } catch (error) {
            // Manejo de errores si la llamada falla
            console.error('Error al obtener los datos:', error);
          }
        };
        fetchHomePageData();
      }, []);


      const handleSearchSubmit = (search: HotelSearch) => {
        setHotelSearch(search);
        navigate(`/Reservas/Buscar-habitaciones?hotelId=${search.hotelId}&startDate=${search.startDate}&endDate=${search.endDate}&guests=${search.guests}&promoCode=${search.promoCode}`);
      };

      const handleCardSubmit = (room: RoomTypeDTOWithPrice) => {
        
        
        const mealPlanSelected = selectedMealPlan[room.id];
        

        // Aquí agrupamos los datos
        const reservationData: ReservationData = {
          hotel: hotelData ? {
            id: hotelData.id,
            name: hotelData.name,
            location: hotelData.location,
          } : null,
          roomDetails:{
            id: room.id,
            name: room.type
          } ,
          mealPlan: {
            id: mealPlanSelected ? mealPlanSelected.mealPlan.id : 5,
            name: mealPlanSelected ? mealPlanSelected.mealPlan.name : "Solo alojamiento",
          },
          finalPrice: ((room.finalPrice * (1 - (promoDiscount?.discount || 0) / 100)) * room.daysBetweenStartAndEnd).toFixed(2),
          startDate: startDate,
          endDate: endDate,
          photos: room.photos,
          numberPeople: hotelSearch.guests
        };

         // Mostrar los datos agrupados en la consola
        console.log('Datos de la reserva:', reservationData);
        navigate('/confirmar-reserva', { state: reservationData });
        
        };

         
        
      /* COMIENZA EL HTML */
  return (
    <>
   

    <div className="h-60 object-cover flex justify-center items-center ">
      <div className="menu md:bg-white md:bg-opacity-80 md:mx-4 md:shadow-md  py-2  md:py-6 px-8 text-center mb-6 rounded md:w-full w-2/3 md:max-w-[1100px] mx-auto">
        <HotelSearchForm initialSearch={hotelSearch} onSearchSubmit={handleSearchSubmit} hotelsByLocation={hotelsByLocation}  />
      </div>
    </div> 

    {isLoading && (
  <div className="flex justify-center">
    <h1 className="bg-yellow-200 mt-4 w-2/3 text-primary outline-dashed p-3 font-bold text-center">
      Cargando habitaciones...
    </h1>
  </div>)}

    <div className="container mx-auto mb-10">
    {availableRoomTypesDTOsData.length > 0 ? 
       
      
      <div className="block justify-center">
        {/* condicion para mostrar el mensaje de que el codigo de descuento existe o no  */}
        <div className={`text-center p-3 text-background font-bold uppercase ${promoDiscount 
          ? "bg-green-400"
          : hotelSearch.promoCode?.trim()
          ? "bg-red-500"
          : ""
        }`}>
        {promoDiscount ? (
          <p><DiscountOutlinedIcon /> Promocion aplicada </p>
           ) : hotelSearch.promoCode?.trim() ? (
           <p>Codigo no valido o inexistente</p>
           ) : (
           ""
           )}       
      </div>

        <h1 className="text-center my-6 p-4 rounded-lg bg-white bg-opacity-60 sm:mt-0">Habitaciones disponibles en  <br /><span className="text-primary text-4xl font-extrabold">{hotelData ? hotelData.name : 'Cargando...'} </span></h1> 
      </div>
      : 
      <div className="flex justify-center">
        <h1 className="bg-red-200 mt-4 w-2/3 text-red-500 outline-dashed p-3 font-bold text-center">No hay habitaciones disponibles. prueba en otras fechas</h1>
      </div>
    }
   

      <div className="grid grid-cols-1 mx-3 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {availableRoomTypesDTOsData.length > 0 ? (
        habitacionesConPrecios.map((room) => {

        return (

        <form
          key={room.id}
          className="bg-white border border-gray-200 rounded-md overflow-hidden flex flex-col justify-between h-full"
          onSubmit={(e) => {
          e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
          handleCardSubmit(room); // Llamar a handleSubmit cuando se envíe el formulario
         }}
        >
        
        {/* Carrusel de imágenes */}
        {room.photos.length > 0 && (
          <div className="mb-4">
            <RoomCarrusel photos={room.photos} isModal={false}/>
          </div>
        )}

        {/* seccion donde mostramos metros cuadrados ,capacidad y posible mensaje de alerta */}
        <div className="flex justify-between p-2 gap-3 items-center">
          <div className="flex gap-3">
            <p className="text-gray-600 mt-2 text-xs flex items-center gap-1"><PeopleAltOutlinedIcon/>{room.capacity} </p>
            <p className="text-gray-600 mt-2 text-xs flex items-center gap-1"><CropFreeOutlinedIcon /> {room.squareMeters}m²</p>
          </div>
              
          {room.message && <p className={`font-bold text-xs flex items-center gap-1 ${room.message.style}`}><WarningAmberOutlinedIcon/> {room.message.text}</p>}
          
          
        </div>
          
          {/* SEPARADOR DE SECCIONES */}
          <div className="border-t border-gray-300 mx-4"></div>

          {/*seccion donde mostramos el nombre de la habitacion sus features y boton para abrir modal con mas caracteristicas */}
          <div className="p-4 mt-auto">
            <h3 className="text-xl font-semibold text-gray-800">{room.type}</h3>
            
            
              {/* Mostrar solo las primeras 6 características */}
              <ul className="text-gray-600 mt-4 grid grid-cols-2">
               {(() => {
               // Hacemos una copia de los features
               const featuresToDisplay = [...room.features];

                // Se ordenan las características por prioridad con el uso de featurPriority.ts para que siempre se muestren los features mas interesantes
                const prioritizedFeatures = [
                  ...featurePriority.filter(feature => featuresToDisplay.includes(feature)),
                  ...featuresToDisplay.filter(feature => !featurePriority.includes(feature)),
                ];

                // Solo mostramos en la card los primeros 6 features
                return prioritizedFeatures.slice(0, 6).map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 ml-4 list-disc">
                    <div className="text-primary">{featureIcons[feature]}</div>
                    <span>{feature}</span>
                 </li>
                ));
              })()}
            
              </ul>

                {/* Botón para abrir el modal */}
                <button
                type="button"
                  onClick={() => 
                    handleShowMore(room)}
                  className="font-bold h-1 text-primary mt-2 ml-4"
                >
                  Mostrar más detalles...
                </button>

                {/* SEPARADOR DE SECCIONES */}
                <div className="border-t border-gray-300 my-4"></div>

                <div>
                
                   {/* Mostrar meal plans para cada habitación */}
                   <div className="mt-4">
                   <div className="grid grid-cols-2 sm:flex sm:flex-col gap-6 sm:gap-3">
                    
                  {room.mealPlans.map((mealPlan) => {
                    const isDefault = mealPlan.mealPlan.id === 5 && !selectedMealPlan[room.id];
                    const isSelected = selectedMealPlan[room.id]?.id === mealPlan.id;
                    return (
                    <label key={mealPlan.id} className="flex items-center mb-2">
                      <input
                        type="radio"
                        name={`meal-plan-${room.id}`}
                        value={mealPlan.id}
                        className="mr-2 w-5 h-5 sm:w-4 sm:h-4"
                        onChange={() => handleMealPlanChange(room.id, mealPlan)}
                        checked={selectedMealPlan[room.id]?.id === mealPlan.id }
                      />
                    
                      <h2
                       className={`${
                        isSelected || isDefault ? "text-primary font-bold" : "text-gray-800"
                      }`}>{mealPlan.mealPlan.name} {((room.roomBasePrice * (1 + mealPlan.priceModifier)) - room.roomBasePrice) !== 0 && (

                        <span className="font-normal text-gray-500">
                          +
                          {(
                            (room.roomBasePrice * (1 + mealPlan.priceModifier)) - room.roomBasePrice
                          ).toFixed(2)}€
                        </span>
                        )}
                        {mealPlan.mealPlan.id === 5 && !selectedMealPlan[room.id] && (
                         <span className=" text-gray-500 text-sm">(Por Defecto)</span>
                        )}
                      </h2>
                    </label>
                  )})}
                  
                </div>
               
              </div>

            <div className="border-t border-gray-300 my-4"></div>

            
              {/* Precio final ficticio aplicado al final de la card */}
              <div className="mt-4">
                <p className="text-sm text-gray-500 mb-2">Precio Base por noche: {(
                  room.finalPrice *
                  (1 - (promoDiscount?.discount || 0) / 100)
                  ).toFixed(2)}€</p>
                <p className={`text-lg font-semibold ${promoDiscount ? "text-gray-400" : hotelSearch.promoCode?.trim() ? "text-gray-800" : "text-gray-800"}`}>Precio Final: <span className={`${promoDiscount && "line-through"}`}>{(room.finalPrice * room.daysBetweenStartAndEnd).toFixed(2)}€</span></p>
                {promoDiscount && (
                  <>
                  <div className="flex gap-3">
                  <p className="text-lg font-bold text-gray-800">
                  Precio Final:{" "}
                  {(
                  room.finalPrice *
                  room.daysBetweenStartAndEnd *
                  (1 - (promoDiscount?.discount || 0) / 100)
                  ).toFixed(2)}€
                  </p>
                  <p className="text-green-500 text-xl font-bold">-{promoDiscount.discount}%</p>
                  </div>
                  </>
                )}
                
              </div>
                </div>

            <button type="submit" className=" w-full mt-3 py-3 px-4 text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform">
              Reservar
            </button>
            
          </div>
         
        </form>
        
        
      )})
      
    ) : (

      <>
      <div className="py-5 my-10 ">
        <h1>mostrar aqui otras ofertas en hoteles con la misma localizacion</h1>
      </div>
      </>
      
    )}
    
  </div>


  
  {/* Modal */}
  <RoomDetailsModal selectedRoom={selectedRoom} onClose={closeModal} />
      
</div>
</>
  )
}
