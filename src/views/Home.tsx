import { useEffect, useState } from "react";
import axios from 'axios';
import '../styles/styles.css'
import { HotelSelectOption, HotelSearch } from "../@types/Hotel";
import { useNavigate } from 'react-router-dom';
import HotelSearchForm from "../components/forms/HotelSearchForm";
import IsTokenExpired from "../helpers/IsTokenExpired";
import HazteMiembro from "../components/homeComponents/HazteMiembro";
import PorqueRJHotels from "../components/homeComponents/PorqueRJHotels";
import ShowHotels from "../components/homeComponents/ShowHotels";



export default function Home() {

  useEffect(() => {
    if (IsTokenExpired()) {
      localStorage.removeItem("jwtToken"); // Eliminar el token
    }
  }, []);


  const navigate = useNavigate();
  const [hotelsByLocation, setHotelsByLocation] = useState<Map<string, HotelSelectOption[]>>(new Map());
  
  
  const [hotelSearch, setHotelSearch] = useState<HotelSearch>({
    hotelId: 0,
    startDate: '',
    endDate: '',
    guests : 1,
    promoCode: ""
  });

  // Establecer titulo de la pagina
  useEffect(() => {
    document.title = 'Home - RJHotels';
  }, []);

  // fetch a la api del home 
  useEffect(() => {
    const fetchHomePageData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
         
        // Realizamos el llamado GET al endpoint
        const response = await axios.get(`${baseUrl}api/home`);
       
        const hotelsByLocationData: Map<string, HotelSelectOption[]> = response.data.hotelsByLocation;
        const formattedMap = new Map(Object.entries(hotelsByLocationData));
        setHotelsByLocation(formattedMap);
        console.log(hotelsByLocation)

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



  return (
    <>
    <div className="min-h-[calc(100vh-160px)] md:min-h-[calc(100vh-120px)]">
    <div
      className="px-3 md:flex flex-col items-center justify-between text-center text-white gap-10 lg:gap-44"
    >
      <div>
        <h1 className="text-6xl font-bold mb-3 mt-10">
          Es hora de <span className="typing-effect">Disfrutar</span>
        </h1>
        <p className="text-xl mb-5">
          Explora el lujo y la comodidad en nuestros hoteles. Tu próxima aventura te espera.
        </p>
      </div>
      
  
    <div className="absolute bottom-16 w-full px-4 sm:px-8 mb-6">
      
      <div className="menu bg-form py-6 pr-8 pl-2 rounded md:max-w-5xl md:mx-auto mx-4">
        <HotelSearchForm
          initialSearch={hotelSearch}
          onSearchSubmit={handleSearchSubmit}
          hotelsByLocation={hotelsByLocation}
        />
      </div>
    </div>

    
      
    </div>
    </div>
    <div className="bg-background">
    <div className="p-5 bg-background "><PorqueRJHotels /></div>
    <div className="border-b-2 my-10 container mx-auto"></div>
    <div className="p-5 bg-background"><ShowHotels hotelsByLocation={hotelsByLocation}/></div>
     <div className="my-20"><HazteMiembro/></div> 
     </div>
    
  
</>
  );
  
}
