import axios from "axios";
import { useEffect, useState } from "react"
import { EventosInfo } from "../../@types/Hotel";


const Eventos = () => {

    const [eventosData, setEventosData] = useState<EventosInfo[]> ([])

    useEffect(() => {
        const fetchEventsData = async () => {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
             
            // Realizamos el llamado GET al endpoint
            const response = await axios.get(`${baseUrl}api/eventos`);
            console.log(response.data)
            setEventosData(response.data.eventos)
           
          } catch (error) {
            // Manejo de errores si la llamada falla
            console.error('Error al obtener los datos:', error);
          }
        };
        fetchEventsData();
      }, []);

  return (
   
    <div className="container  mx-auto my-10 p-5">
      <h1 className="text-4xl text-center mb-10">Nuestros eventos confirmados para el año 2025</h1>
      <div className=" md:grid grid-cols-4 gap-5">
      {eventosData.map((evento) => 
        <div key={evento.id} className="p-3 mb-5 flex flex-col gap-1 bg-white bg-opacity-50 shadow-md rounded-lg" >
          <h1 className="text-center text-primary text-3xl ">{evento.name}</h1>
            <h2 className="text-3xl mb-5 text-center">{evento.date}</h2>
            <h2 className="mb-1">- De: <strong>{evento.startTime}</strong> a : <strong>{evento.endTime}</strong></h2>
            <h2 className="mb-1">- {evento.description}</h2>
            
            <h2 className="mb-1">- 📍 {evento.hotel.name}</h2>
            <h2>- Precio para no huespedes: <strong>{evento.price}$</strong></h2>
        </div>
        )}
      </div>
        
    </div>
  )
}

export default Eventos