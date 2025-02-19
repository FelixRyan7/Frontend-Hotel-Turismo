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
   
    <div>
        {eventosData.map((evento) => 
        <div key={evento.id}>
            <h1>{evento.date}</h1>
            <h1>{evento.startTime}</h1>
            <h1>{evento.endTime}</h1>
            <h1>{evento.description}</h1>
            <h1>{evento.name}</h1>
            <h1>{evento.hotel.name}</h1>
            <h2>price for non customers: {evento.price}</h2>
        </div>
        )}
    </div>
  )
}

export default Eventos