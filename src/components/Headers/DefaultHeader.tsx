import { UserIcon } from "@heroicons/react/solid"
import { XIcon } from "@heroicons/react/solid";
import { MenuIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel, HotelSelectOption } from "../../@types/Hotel";
import axios from "axios";
import '../../styles/styles.css'

const DefaultHeader = () => {
    
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHotelsMenuOpen, setIsHotelsMenuOpen] = useState(false);
    const [hotelsByLocation, setHotelsByLocation] =  useState<Map<string, HotelSelectOption[]>>(new Map());

  

    useEffect(() => {
        const fetchHotelData = async () => {
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
        fetchHotelData();
      }, []);


    const handleLogin = () => {
  
        navigate("/login"); // Redirigir al login
      };
  return (
    <>
        <div 
          className="text-white text-2xl cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-8 w-8 text-white burger-icon" /> 
        </div>
    
          <a href="/" className="text-white font-serif text-4xl font-bold">
            JRHotels
          </a>

          <a onClick={handleLogin} className="flex bg-transparent border-2 border-white text-white py-2 px-2 sm:px-4 rounded-full sm:rounded-lg hover:bg-white hover:text-slate-800 transition duration-300 cursor-pointer">
        <UserIcon className="h-5 w-5 sm:hidden" /> {/* O usa LockClosedIcon si prefieres el candado */}
        <span className="hidden sm:inline">Login</span> 
        </a> 
  

        {/* menu desplegable */}
        <div
          className={`absolute top-0 left-0 w-full sm:w-1/3 h-screen bg-black bg-opacity-90 z-20 bg-blur-Menu flex flex-col items-center justify-center
                    transition-transform duration-500 ease-in-out ${
                      isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-4 left-4 z-50 text-white"
          >
            <XIcon className="h-8 w-8 burger-icon m-4 "/>
          </button>

          <nav className="flex flex-col gap-6 text-dark text-2xl">
            <a onClick={() => setIsHotelsMenuOpen(true)}  className="hover:bg-background p-2 rounded transition-all hover:font-semibold duration-300 ease-in-out cursor-pointer">Nuestros Hoteles</a>
            <a href="/ventajasRJClub" className="hover:bg-background p-2 rounded transition-all hover:font-semibold duration-300 ease-in-out cursor-pointer">Ventajas RJClub</a>
            <a href="/eventos" className="hover:bg-background p-2 rounded transition-all hover:font-semibold duration-300 ease-in-out cursor-pointer">Eventos</a>
          </nav>
        </div>

        
         <div
         className={`absolute top-0 left-0 w-full sm:w-1/3 h-screen z-30 bg-blur-Menu flex flex-col items-center justify-center
          transition-transform duration-500 ease-in-out ${
            isHotelsMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
         >
          <button
            onClick={() => setIsHotelsMenuOpen(false)}
            className="absolute top-4 left-4 z-50 text-dark"
          >
            <XIcon className="h-8 w-8 burger-icon m-4 "/>
          </button>

          {Array.from(hotelsByLocation.entries()).map(([location, hotels]) => (
            <div key={location} className="border-b-2 border-dark w-4/5 p-3 ">
               <h2 className="font-semibold text-xl tracking-wider">🏝️ {location}</h2>
                  <optgroup className="" key={location}>
                  
                    {hotels.map((hotel) => (
                      <option onClick={() => navigate(`/hotel/${hotel.id}`)} className="mb-1 cursor-pointer hover:bg-white hover:bg-opacity-35 rounded " key={hotel.id} value={hotel.id}>
                        {hotel.name}  {" *".repeat(hotel.stars)}
                      </option>
                    ))}
                  </optgroup>
                  </div>
                ))}
        </div>
    </>
  )
}

export default DefaultHeader