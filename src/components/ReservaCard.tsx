import axios from "axios";
import { ReservationData } from "../@types/Hotel"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

type ReservationDataProps ={
    reservationData : ReservationData
    isClient : boolean | null
}


const ReservaCard = ({ reservationData, isClient}: ReservationDataProps) => {

  const navigate = useNavigate();

  const handleConfirmReservation = () => {

    const ReservationDataToSend = {
      startDate : reservationData.startDate,
      endDate: reservationData.endDate,
      finalPrice: reservationData.finalPrice,
      numberPeople: reservationData.numberPeople,
      hotelId: reservationData.hotel?.id,
      mealPlanId: reservationData.mealPlan.id,
      roomTypeId: reservationData.roomDetails.id
    }
    
       
    Swal.fire({
      title: "¿Confirmar reserva?",
      text: "Si ya has revisado tus datos de reserva, no te lo pienses",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2EC4B6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, Reservar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          const token = localStorage.getItem("jwtToken");
          await axios.post(`${baseUrl}api/registerReservation`, ReservationDataToSend,{
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          Swal.fire({
            title: "¡Reserva confirmada!",
            text: "Tu reserva ha sido realizada con éxito.",
            icon: "success",
            confirmButtonText: "Ver mis reservas",
           
          }).then((result) => {
            if (result.isConfirmed) {
              // Cambia la ruta según tu aplicación
              const token = localStorage.getItem('jwtToken');
              if (!token) {
                navigate("/login");
              } else{
              try{
                const decodedToken: any = jwtDecode<any>(token);
                const userRoles: string[] = decodedToken.roles || [];
                console.log(userRoles)
                // Verifica el rol del usuario y redirige
                if (userRoles.includes("ROLE_ADMIN") || userRoles.includes("ROLE_USER")) {
                  navigate("/dashboard/mis-reservas");
                } else {
                  navigate("/login"); // Si no tiene roles válidos, lo redirige al login
                }
              } catch (error) {
                 console.log(error)
                }}
            }
          });  
          
          
        } catch (error) {
          console.error(error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al confirmar la reserva.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
  <div className="my-5 mx-2 p-5 bg-white rounded shadow-sm">
  <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Datos de la Reserva</h1>

  <div className="space-y-4">
  
    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Hotel:</p>
      <p className="text-accent1 font-bold">{reservationData.hotel?.name}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Personas:</p>
      <p className="text-accent1 font-bold">{reservationData.numberPeople}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Habitación:</p>
      <p className="text-accent1 font-bold">{reservationData.roomDetails.name}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Plan de comida:</p>
      <p className="text-accent1 font-bold">{reservationData.mealPlan.name}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Check-in:</p>
      <p className="text-accent1 font-bold">{reservationData.startDate}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Check-out:</p>
      <p className="text-accent1 font-bold">{reservationData.endDate}</p>
    </div>

    <div className="flex justify-between">
      <p className="text-gray-600 font-medium">Precio final:</p>
      <p className="text-accent1 font-bold">${reservationData.finalPrice}</p>
    </div>
  </div>

  <div className="mt-6">
    {isClient && (
      <button
      className={`w-full py-3 uppercase bg-primary text-white font-semibold rounded-lg hover:bg-primaryDark transition duration-200`}
      onClick={handleConfirmReservation}
    >
      Confirmar Reserva
    </button>
    )}
    
  </div>
  </div>
  )
}

export default ReservaCard