import { useNavigate, useLocation } from "react-router-dom"
import { ReservationData } from "../../@types/Hotel";
import ReservaCard from "../../components/ReservaCard";
import { useEffect, useState } from "react";
import axios from "axios";
import RegisterClient from "../../components/forms/RegisterClient";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import ClientDetails from "../../components/ClientDetails";


const ConfirmarReserva = () => {

    const location = useLocation()

    const navigate = useNavigate()

    const [isClient, setIsClient] = useState<boolean | null>(null);

    const [registerClientSubmitSuccess, setRegisterClientSubmitSuccess] = useState(false);

    const handleRegisterClientSubmitSuccess = () => {
      setRegisterClientSubmitSuccess(true); // Activamos el estado para ejecutar useEffect
    };

    const reservationData: ReservationData = location.state;
   

    //esta llamada a la api sirve para recoger si el user es cliente o no y en consecuencia mostrar una vista o otra
    useEffect(() => {
      // Llamada asincrónica a la API
      const fetchUserStatus = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          // Simular que obtenemos el token o el ID del usuario de alguna manera
          const token = localStorage.getItem("jwtToken");
         
          if (!token) {
            throw new Error("No token found in localStorage.");
          }
          if (token) {
            const response = await axios.get(`${baseUrl}api/status`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
             // Almacenar la información de la respuesta en los estados
             setIsClient(response.data);
             
          }
        } catch (error) {
          console.error("Error al obtener los datos del usuario:", error);
        }
      };
  
      fetchUserStatus();
    }, [registerClientSubmitSuccess]);
    

      useEffect(() => {
        if (!reservationData) {
          navigate("/"); // Redirige al usuario.
        }
      }, [reservationData, navigate]);

      if (!reservationData) {
        return <p>Redirigiendo...</p>;
      }
    
      
      return (
        <>
        <div className="bg-background">
          <div className="bg-white p-7 border-b-2 md:flex items-baseline gap-x-4 ">
          <h1 className="font-bold text-primary text-center md:text-start mb-4 md:mb-0 text-xl">{reservationData.hotel?.name} </h1>
          {!isClient ? (
            <>
            <div className="flex items-center justify-center space-x-2">
              {/* Primer paso con ícono */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex items-center justify-center text-white">
                <DoneOutlinedIcon />
              </h2>
              <h2 className="text-xs md:text-sm">Buscar Habitación</h2>

              {/* Segundo paso con número */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex  items-center justify-center text-white">
                2
              </h2>
              <h2 className="font-semibold text-xs md:text-sm">Rellenar tus datos</h2>
              {/* Segundo paso con número */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex items-center justify-center text-white">
                3
              </h2>
              <h2 className="text-xs md:text-sm">Oficializar la reserva</h2>
            </div>

            </>
          ): (
            <>
            <div className="flex items-center justify-center space-x-2">
              {/* Primer paso con ícono */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex items-center justify-center text-white">
                <DoneOutlinedIcon />
              </h2>
              <h2 className="text-xs md:text-sm">Buscar Habitación</h2>

              {/* Segundo paso con número */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex  items-center justify-center text-white">
              <DoneOutlinedIcon />
              </h2>
              <h2 className="text-xs md:text-sm">Rellenar tus datos</h2>
              {/* Segundo paso con número */}
              <h2 className="font-bold bg-accent1 rounded-full w-8 h-8 flex items-center justify-center text-white">
                3
              </h2>
              <h2 className="font-semibold text-xs md:text-sm">Oficializar la reserva</h2>
            </div>
            </>
          )}
          </div>
          
          
        {!isClient ? (
        <>
        <div className="text-center md:grid md:grid-cols-3 mt-10 md:mt-0">
            <div className="col-span-2"><RegisterClient onRegisterClientSubmitSuccess={handleRegisterClientSubmitSuccess}/></div>
            <div className="col-span-1"><ReservaCard reservationData={reservationData} isClient={isClient} /></div>
           
          </div>
        </>
        ) : (
       <>
         <div className="text-center md:grid md:grid-cols-2 mt-10 md:mt-0">
            <div className="col-span-1"><ClientDetails/></div>
            <div className="col-span-1"><ReservaCard reservationData={reservationData} isClient={isClient} /></div>
           
          </div>
        </>
        )}
          
        
        
        
        </div>
        
        </>
        
      )
}

export default ConfirmarReserva