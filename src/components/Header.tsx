import { useLocation } from 'react-router-dom';
import '../styles/styles.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import IsTokenExpired from '../helpers/IsTokenExpired';
import DefaultHeader from './Headers/DefaultHeader';
import LoggedHeader from './Headers/LoggedHeader';


export default function Header() {

  const location = useLocation(); // Obtenemos la ruta actual
  const isHome = location.pathname === '/'; 
  const isRoomPage = location.pathname === '/Reservas/Buscar-habitaciones'; 
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token && !IsTokenExpired(); // Verificar si el token existe y no ha expirado
  });
 
  const handleLogout = () => {
      localStorage.removeItem("jwtToken");
      setIsAuthenticated(false);
      navigate("/"); // Redirigir al home
  };
  

  useEffect(() => {
    // Escuchar cambios en el token
    const handleStorageChange = () => {
      const token = localStorage.getItem("jwtToken");
      setIsAuthenticated(token && !IsTokenExpired()); // Actualizar el estado según la validez del token
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
 

  return (
    <>
  
    <div className={`p-10 ${isHome || isRoomPage ? '' : 'bg-dark'} flex justify-between items-center h-[120px]`}>
    
      {!isAuthenticated ? 
        ( <DefaultHeader /> ) 
        : 
        ( <LoggedHeader handleLogout={handleLogout}/> )
      } 

    </div>


    </>
  )
}
