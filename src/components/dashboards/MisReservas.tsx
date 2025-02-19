import axios from "axios";
import { useEffect, useState } from "react"
import { Customer, Reservation } from "../../@types/Hotel";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



const MisReservas = () => {
    const[reservas, setReservas] = useState<Reservation[]>([])
    const[customer, setCustomer] = useState<Customer| null>(null)
    const [ReservaCancelada, setReservaCancelada] = useState<boolean>(false)

    const rootStyles = getComputedStyle(document.documentElement);
    const darkColor = rootStyles.getPropertyValue("--dark-charcoal").trim();
  
    const navigate = useNavigate()
  
    useEffect(() => {
      // Llamada asincrónica a la API
      const fetchUserReservations = async () => {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          
          const token = localStorage.getItem("jwtToken");
        
         
          if (!token) {
            throw new Error("No token found in localStorage.");
          }
          if (token) {
            
            const response = await axios.get(`${baseUrl}api/MisReservas`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              
              
            });
            const {Reservas, Customer} = response.data
            setReservas(Reservas);
            setCustomer(Customer);
            console.log(Reservas)
     
          }
        } catch (error) {
          console.error("Error al obtener las reservas del cliente:", error);
        }
      };
  
      fetchUserReservations();
    }, [ReservaCancelada]);

    const handleCancelation = (id:number) => {
      Swal.fire({
           title: "¿Eliminar Reserva?",
           text: "Si eliges eliminarla perderas la reserva definitivamente",
           icon: "error",
           showCancelButton: true,
           confirmButtonColor: "#E63946",
           cancelButtonColor: darkColor,
           confirmButtonText: "Sí, Eliminar",
           cancelButtonText: "Cancelar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem("jwtToken");
            await axios.delete(`${baseUrl}api/EliminarReserva`,{
            params: {ReservationId: id},
            headers: {
              Authorization: `Bearer ${token}`,
            },
            });
            Swal.fire({
              title: "¡Reserva Cancelada!",
              text: "Tu reserva ha sido cancelada con éxito. Te Rembolsaremos el dinero en un plazo de 3 dias",
              icon: "success",
              timer: 3500, 
              
            })
            setReservaCancelada(!ReservaCancelada)
          } 
          catch (error) {
            Swal.fire({
              title: "¡No se pudo cancelar la reserva!",
              text: "Ponte en contacto con nuestro servicio al cliente si tienes problemas",
              icon: "error",
              timer: 3500, 
              
            })
            console.log(error)
          }
        }
      }) 
    }
      
    return (
      <>
      <div className="min-h-[calc(100vh-310px)]">
      <div className="container my-10 mx-auto max-w-7xl ">
      <h1 className="text-3xl mb-5 mx-2">Hola {customer?.firstName}</h1>
      <h2 className="text-center text-xl bg-secondary rounded-xl p-2 text-primary font-bold mb-3 max-w-md mx-2 md:mx-auto">{reservas.length ? "Mis Reservas" : "Parece que aun no tienes Reservas"}</h2>
        {reservas.length ? (
          <>
            
            <div>
            <>
              {reservas.map((reserva) => 
             
              <div key={reserva.id} className="shadow-md bg-white mx-2 md:grid grid-cols-3 gap-5 mb-5">
                <img src={`${reserva.hotel.imageUrl}`} className="fotos_reserva h-full" alt="foto hotel" />
                <div className="p-3 flex flex-col gap-2 justify-between">
                  <h2>{reserva.id}</h2>
                  <h1 className="text-2xl ">Tu reserva en: <span className="text-primary">{reserva.hotel.name}</span></h1>
                  <h2 className="">Habitacion: <span>{reserva.room.roomType.type} <br />({reserva.mealPlan.name})</span></h2>  
                  <h2 className="">Desde {reserva.startDate} Hasta {reserva.endDate}</h2>              
                  <h2 className="">Reservas para: {reserva.numberPeople} Personas (max: {reserva.room.roomType.capacity})</h2>
                  <h2 className=" font-semibold tracking-wider text-2xl">${reserva.totalPrice}</h2>
                </div>
                <div className="flex flex-col justify-between  p-2">
                  <div className="flex flex-col gap-2">
                    <h1 className="text-xl mt-2">contacta!</h1>
                    <h2>Telefono: {reserva.hotel.phone}</h2>
                    <h2>Email: {reserva.hotel.email}</h2>
                  </div>
                  <div className="flex justify-end">
                  <button type="button" onClick={() => handleCancelation(reserva.id)}className="bg-red-500 w-1/3 p-3 rounded text-background font-semibold uppercase">cancelar</button>
                  </div>
                </div>
              
                
              </div>
              
              )}
              </>
            </div>
            
        </>
        ):
        (
          <>
          <div className="conatiner  mx-auto max-w-xl flex flex-col justify-center items-center gap-3">
          
          <h2>Empieza ahora planear tus vacaciones!</h2>
          <button className="bg-primary rounded-xl p-3 text-background font-semibold hover:rounded-none transform transition-all duration-300 hover:scale-105 " onClick={() => navigate("/")}>Hacer Reserva Ahora</button>
          </div>
          </>
        )}
         
      </div>
      </div>
      </>
    )
  }


export default MisReservas