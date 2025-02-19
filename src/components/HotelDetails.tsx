import { useEffect, useState } from "react"
import { HotelDetailsToShow, HotelInfo, HotelSearch, HotelSelectOption, MealPlanAvailable, RoomTypeWithOutPrice } from "../@types/Hotel"
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import '../styles/styles.css'
import HotelSearchForm from "./forms/HotelSearchForm";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HotelFeaturesSlider from "./carrusels/HotelFeatureSlider";
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import RoomCarrusel from "./carrusels/RoomCarrusel";
import { jwtDecode } from "jwt-decode";



const HotelDetails = () => {

 const navigate = useNavigate()

  const [hotelInfo, setHotelInfo] = useState<HotelInfo> ({
    id: 0,
    name:"",
    location:"",
    description:"",
    address: "",
    phone: "",
    email:"",
    imageUrl:"",
    stars: 0
  })

  const [hotelsByLocation, setHotelsByLocation] = useState<Map<string, HotelSelectOption[]>>(new Map());
  const [hotelDetailsToShow, setHotelDetailsToShow] = useState<HotelDetailsToShow[]> ([])
  const [mealPlans, setMealPlans] = useState<MealPlanAvailable[]> ([])
  const [hotelRoomTypes, setHotelRoomTypes] = useState<RoomTypeWithOutPrice[]> ([])
  const [isOpen, setIsOpen] = useState(false);
  const {hotelId} = useParams();
  const[username, setUsername] = useState<string>("")
  
  
  useEffect(() => {
    if (!hotelId) return; 

    const fetchHotelDataById = async () => {
      
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
        
        const response = await axios.get(`${baseUrl}api/hotelDataById/${hotelId}`);

        const {Hotel, HotelDetails, HotelMealPlans, RoomTypeWithPhotos} = response.data
        
        setHotelInfo(Hotel)
        setHotelDetailsToShow(HotelDetails)
        setMealPlans(HotelMealPlans)
        setHotelRoomTypes(RoomTypeWithPhotos)
        console.log(response.data)
       
        

      } catch (error) {
        // Manejo de errores si la llamada falla
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchHotelDataById();
  }, []);

  const [hotelSearchFromDetails, setHotelSearchFromDetails] = useState<HotelSearch>({
    hotelId: Number(hotelId),
    startDate: '',
    endDate: '',
    guests : 1,
    promoCode: ""
  });

  useEffect(() => {
   
    const token = localStorage.getItem("jwtToken");
    if(token){
      const decodedToken: any = jwtDecode<any>(token);
      setUsername(decodedToken.sub)
      console.log(decodedToken)
    }
    
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHotelsByLocation = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_BASE_URL;
         
        // Realizamos el llamado GET al endpoint
        const response = await axios.get(`${baseUrl}api/home`);
       
        const hotelsByLocationData: Map<string, HotelSelectOption[]> = response.data.hotelsByLocation;
        const formattedMap = new Map(Object.entries(hotelsByLocationData));
        setHotelsByLocation(formattedMap);
        

      } catch (error) {
        // Manejo de errores si la llamada falla
        console.error('Error al obtener los datos:', error);
      }
    };
    fetchHotelsByLocation();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/"); // Redirigir al login
};

  const handleSearchSubmit = (search: HotelSearch) => {
    setHotelSearchFromDetails(search);
    navigate(`/Reservas/Buscar-habitaciones?hotelId=${search.hotelId}&startDate=${search.startDate}&endDate=${search.endDate}&guests=${search.guests}&promoCode=${search.promoCode}`);
  };

 /* esta funcion guarda en la variable el mealplan con el multiplier mas alto para resaltarlo luego */
  const highestPriceMealPlan = mealPlans.reduce((max, mealPlan) =>
    mealPlan.priceModifier > max.priceModifier ? mealPlan : max,
    mealPlans[0]
  );


  return (
  <>
    <div className="bg-hotel-foto lg:h-[85vh] flex flex-col justify-between" style={{ backgroundImage: `url(${hotelInfo.imageUrl})` }}>
      
      <header className="bg-gradient-to-b from-dark to-transparent p-4 flex justify-between px-10 h-20 items-center">
        <Link to={"/"} className="text-background h1-font text-lg md:text-2xl">RJHOTELS / {hotelInfo.name} / {hotelInfo.address}</Link>
          <div className="relative">
            <div onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white cursor-pointer ">
              <ArrowDropDownCircleOutlinedIcon fontSize="large" />        
            </div>
            {isOpen && (
                <div className="md:hidden absolute z-10 w-52 right-0 mt-2 bg-background shadow-lg p-4 rounded-lg">
                  <div className="flex gap-2 items-center">
                    <h1 className="font-bold bg-background rounded-full w-7 h-7 flex items-center justify-center text-dark">
                      <LocalPhoneOutlinedIcon />
                    </h1>
                    <h2 className="text-dark text-sm font-bold">{hotelInfo.phone}</h2>
                  </div>

                  <div className="flex gap-2 items-center">
                    <h1 className="font-bold bg-background rounded-full w-7 h-7 flex items-center justify-center text-dark">
                      <EmailOutlinedIcon />
                    </h1>
                    <h2 className="text-dark text-xs font-bold">{hotelInfo.email}</h2>
                  </div>
                  {username ? (
                    <a
                    onClick={handleLogout}
                    className="block text-dark font-bold mt-2 p-2 bg-secondary hover:bg-primary rounded text-center hover:text-white"
                    >
                      Logout
                    </a>
                  )
                  : 
                  (
                    <Link
                    to="/login"
                    className="block text-dark font-bold mt-2 p-2 bg-secondary hover:bg-primary rounded text-center hover:text-white"
                    >
                    Login
                  </Link>
                  )}
                  
                </div>
              )}
          </div>
            <div className=" hidden md:flex gap-6 items-center">
              <div className="flex gap-4">
        
                <div className="relative group">
                  <h1 className="font-bold bg-background rounded-full w-10 h-10 flex items-center justify-center text-dark cursor-pointer hover:bg-primary hover:text-background">
                    <LocalPhoneOutlinedIcon />
                  </h1>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full w-28 mt-2 bg-gray-800 text-background text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {hotelInfo.phone}
                  </span>
                </div>    

                <div className="relative group">
                  <h1 className="font-bold bg-background rounded-full w-10 h-10 flex items-center justify-center text-dark cursor-pointer hover:bg-primary hover:text-background">
                    <EmailOutlinedIcon />
                  </h1>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-gray-800 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {hotelInfo.email}
                  </span>
                </div>
              </div>
              {username ? (
                <a
                onClick={handleLogout}
                className="text-background h1-font text-2xl outline px-2 hover:bg-primary hover:text-background hover:outline-none rounded cursor-pointer"
                >
                  Logout
                </a>
              )
              :
              (
               <Link to={"/login"} className="text-background h1-font text-2xl outline px-2 hover:bg-primary hover:text-background hover:outline-none rounded">Login</Link>
              )}
              
            </div>
      </header>

  

    
      <div className="mb-10 rounded md:mx-auto mx-4 md:max-w-5xl">
        <h1 className="text-background text-7xl drop-shadow-2xl">{hotelInfo.name} {"*".repeat(hotelInfo.stars)}</h1>
      
        <div className="menu bg-blur py-6 pr-8 pl-2 rounded">
          <HotelSearchForm
            initialSearch={hotelSearchFromDetails}
            onSearchSubmit={handleSearchSubmit}
            hotelsByLocation={hotelsByLocation}
          />
        </div>
      </div>
    
    </div>

    {/* Seccion de servicios generales */}
    <div className=" bg-gradient-to-b from-background via-secondary to-background py-5">
      <div > 
        <h2 className="text-xl text-dark text-center">{hotelInfo.description} <br/> El mejor lugar para disfrutar de tus vacaciones en {hotelInfo.location}, Mallorca</h2>
      </div>
       
        <h2 className="text-xl text-center my-4">Servicios Generales del
         <span className="text-primary font-semibold"> {hotelInfo.name} </span>
         </h2>
        <div className="">
        <HotelFeaturesSlider features={hotelDetailsToShow} />
        </div>
    </div>

    {/* Seccion de Planes del hotel  */}
    <div className="flex gap-2 justify-center ">
    <h2 className="text-center text-xl">Nuestros planes en este hotel </h2>
    <FastfoodOutlinedIcon className="text-accent1"/>
    </div>
    <div className="container mx-auto p-2">
      <div className="outline outline-primary shadow-sm md:shadow-none shadow-primary rounded md:outline-none p-3  flex flex-col md:flex-row md:justify-center md:gap-8 justify-between">
      {mealPlans.map((mealPlan) => 
      <div className={`flex relative align-baseline items-baseline gap-2 md:gap-2 md:outline outline-secondary rounded md:p-2 md:h-40 md:w-[10rem] md:flex md:flex-col md:shadow-md md:shadow-primary`} key={mealPlan.id} >
        <h1 className="text-xl text-nowrap text-primary ">- {mealPlan.mealPlan.name} </h1>
        <h2 className="text-sm mx-2">{mealPlan.mealPlan.description}</h2>
        {mealPlan.id === highestPriceMealPlan.id && (
          <h3 className="md:hidden text-primary text-center bg-secondary p-1 rounded h1-font text-nowrap">El mas Completo</h3>
        )}
        {mealPlan.id === highestPriceMealPlan.id && (
          <h3 className="hidden absolute bottom-[5px]  left-1/2 transform -translate-x-1/2  md:block text-primary w-4/5 text-center bg-secondary p-1 rounded text-sm h1-font text-nowrap">El mas Completo</h3>
        )}
        
      </div> 
      
      )}
      
      </div>
      <div className="container mx-auto text-2xl max-w-3xl mt-6 text-center">
      <h1>Todos nuestros comedores siguen el siguiente horario:</h1>
      <h2 className="text-xl">7:30/10:30 <span className="text-primary font-semibold">Desayuno</span></h2>
      <h2 className="text-xl">12:00/15:00 <span className="text-primary font-semibold">Almuerzo</span></h2>
      <h2 className="text-xl">19:00/22:00 <span className="text-primary font-semibold">Cena</span></h2>
      </div>
      
    </div>



    {/* Seccion de tipos de habitacion del hotel  */}
    <h1 className="text-3xl text-center mt-5">Descubre Nuestras Habitaciones</h1>

    <div className="mx-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {hotelRoomTypes.map((roomType) => 
      <div key={roomType.id} className="p-5">
        {/* Carrusel de imágenes */}
        {roomType.photos.length > 0 && (
          <div>
            <RoomCarrusel photos={roomType.photos} isModal={false}/>
          </div>
        )}
        <div className="border-l border-r border-b border-dark shadow-sm shadow-dark px-3 pt-3 pb-1 ">
          <div className="flex justify-between ">
            <h1 className="text-xl">{roomType.type}</h1>
            <div className="flex gap-4">
              <h2>{roomType.squareMeters}m2</h2>
              <h2>{roomType.capacity} Personas</h2>
            </div>
          </div>
            <h2>{roomType.description}</h2>        
        </div>
      </div>
      )}
    </div>

  
  </>
  );
  
}

export default HotelDetails