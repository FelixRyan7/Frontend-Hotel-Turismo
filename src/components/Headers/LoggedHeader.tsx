import { UserIcon } from "@heroicons/react/solid";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import { MenuIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";
import { HotelSelectOption } from "../../@types/Hotel";
import { XIcon } from "@heroicons/react/solid";
import axios from "axios";
import '../../styles/styles.css'

type LoggedHeaderProps = {
    handleLogout: () => void;
};

const LoggedHeader = ({ handleLogout }: LoggedHeaderProps) => {

const[username, setUsername] = useState<string> ("")
const [userRole, setUserRole] = useState<string | null>(null)
const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isHotelsMenuOpen, setIsHotelsMenuOpen] = useState(false);
    const [hotelsByLocation, setHotelsByLocation] =  useState<Map<string, HotelSelectOption[]>>(new Map());

useEffect(() => {
    
    const token = localStorage.getItem("jwtToken");
    if(token){
      const decodedToken: any = jwtDecode<any>(token);
      setUsername(decodedToken.sub)
      const roles = decodedToken.roles;
      if (roles.includes("ROLE_ADMIN")) {
        setUserRole("admin");
      } else if (roles.includes("ROLE_USER")) {
        setUserRole("user");
      } else {
        setUserRole(null); // Si no tiene roles válidos
      }
      
    }
  }, []);

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

  return (
    <>
    <div 
      className="text-white text-2xl cursor-pointer flex gap-3 align-baseline items-center "
      onClick={() => setIsMenuOpen(!isMenuOpen)}>
      <MenuIcon className="h-8 w-8 burger-icon"/>  
      
    </div>
    <a href="/" className="text-white font-serif text-4xl font-bold tracking-wider">
        JR
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

        {/* otro menu desplegable para ver hoteles y clickas en ellos */}
         <div
          className={`absolute top-0 left-0 w-full sm:w-1/3 h-screen bg-blur-Menu z-30 bg-blur-side-menu flex flex-col items-center justify-center
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
                  <optgroup key={location} >
                  
                    {hotels.map((hotel) => (
                      <option onClick={() => navigate(`/hotel/${hotel.id}`)} className="mb-1 cursor-pointer hover:bg-white hover:bg-opacity-35 rounded " key={hotel.id} value={hotel.id}>
                        {hotel.name}  {" *".repeat(hotel.stars)}
                      </option>
                    ))}
                  </optgroup>
                  </div>
                ))}
          
        </div>
 
          {/* informacion para usuario logeado y menu para usuario */}
        <div className='relative flex gap-2 items-center'>
          <div  className="flex gap-2 border bg-blur text-dark py-2 px-2 sm:px-4 rounded-full sm:rounded-lg hover:outline-none transition duration-300 "> 
            <UserIcon className="h-5 w-5 text-background md:text-dark" /> 
            <span className='uppercase font-bold text-background w-3 md:hidden'>{username.charAt(0)}</span>
            <span className=' hidden md:block text-dark font-semibold'>{username}</span>
          </div>
          <div onClick={() => setIsOpen(!isOpen)} >
            {!isOpen ? (<ArrowDropDownOutlinedIcon fontSize="large" className=" cursor-pointer bg-background text-dark rounded-full"/>   ) : (
              <ArrowDropUpOutlinedIcon fontSize="large" className='rounded-full bg-blur text-dark'/>
            )}
                 
          </div>
          {isOpen && (
                <div className="absolute z-10 w-52 right-0 top-full mt-2 bg-background shadow-lg p-2 rounded-lg">
                  <div className="flex flex-col gap-2 ">
                    {userRole === "admin" && (
                        <>
                        <a href="/adminDashboard/reportes" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">📜 Reportes</a>
                        <a href="/adminDashboard/administracion" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">🏨 Administración de Establecimientos </a>
                        </>
                    )}
                    <a href="/" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">🏠 Home</a>
                    <a href="/dashboard" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">📊 Mi Dashboard</a>
                    <a href="/dashboard/mis-reservas" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">📝 Mis Reservas</a>
                    <a  href="/dashboard/mis-datos" className="text-dark text-sm font-bold text-center border-b border-dark hover:rounded p-2 hover:bg-dark hover:text-background transition duration-300 cursor-pointer">👤 Mis Datos</a>
                    <a onClick={handleLogout} className="bg-secondary text-dark text-sm font-bold text-center hover:rounded p-2 hover:bg-primary hover:text-background transition duration-300 cursor-pointer">🚪 Cerrar Sesión</a>
                  </div>
                  </div>
                )}
        </div>
    </>
  )
}

export default LoggedHeader