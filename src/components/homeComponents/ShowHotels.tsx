
import { Link } from 'react-router-dom'
import { HotelSelectOption } from '../../@types/Hotel'
import '../../styles/styles.css'

type ShowHotelsProps ={
    hotelsByLocation : Map<string, HotelSelectOption[]>
} 

const ShowHotels = ({hotelsByLocation}: ShowHotelsProps) => {
    console.log(hotelsByLocation)
    
    const hotelsCalvia = hotelsByLocation.get('Calvia') || [];
    const hotelsAlcudia = hotelsByLocation.get('Alcudia') || [];
    const hotelsPalma = hotelsByLocation.get('Palma') || [];
    const hotelsArenal = hotelsByLocation.get('Arenal') || [];
    
  return (
    <>
        <div className="grid md:grid-cols-2 container mx-auto gap-5 max-w-[1050px]">
         
            <div className="hotel-card bg-santa-ponsa">
                <div className='flex justify-center'>
                    <h1 className="titleZona bg-background w-2/3 rounded-b text-dark text-xl px-2 text-center"> 
                        Hoteles en zona <span className='text-primary '>Calvia</span>
                    </h1>
                </div>
                <div className="overlay flex flex-col justify-center items-center text-white">
                    <h1 className="text-2xl text-background text-center"> 
                        Calvia
                    </h1>
                    <ul className='grid grid-cols-2 gap-x-4 px-3 md:px-0 md:gap-x-10'>  
                    {hotelsCalvia.map(hotel => (
                        <li className='mt-4' key={hotel.id}>
                            <Link className={hotel.stars === 5 ? "text-yellow-400" : "" } to={`/hotel/${hotel.id}`}>-{hotel.name} {"* ".repeat(hotel.stars)}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
                
            </div>

            <div className="hotel-card bg-alcudia">
                <div className='flex justify-center'>
                    <h1 className="titleZona bg-background w-2/3 rounded-b text-dark text-xl px-2 text-center"> 
                        Hoteles en zona <span className='text-primary '>Alcudia</span>
                    </h1>
                </div>
                <div className="overlay text-white flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-background text-center"> 
                        Alcudia
                    </h1>
                    <ul>
                    {hotelsAlcudia.map(hotel => (
                        <li className='mt-4' key={hotel.id}>
                            <Link className={hotel.stars === 5 ? "text-yellow-400" : "" } to={`/hotel/${hotel.id}`}>-{hotel.name} {"* ".repeat(hotel.stars)}</Link>
                        </li>
                    ))}
                    </ul>
                </div>
            </div>

            <div className='hotel-card bg-palma '>
                <div className='flex justify-center'>
                    <h1 className="titleZona bg-background w-2/3 rounded-b text-dark text-xl px-2 text-center"> 
                        Hoteles en zona <span className='text-primary '>Palma</span> 
                    </h1>
                </div>
                <div className="overlay text-white flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-background text-center"> 
                        Palma
                    </h1>
                    <ul>
                    {hotelsPalma.map(hotel => (
                        <li className='mt-4' key={hotel.id}>
                            <Link className={hotel.stars === 5 ? "text-yellow-400" : "" } to={`/hotel/${hotel.id}`}>-{hotel.name} {"* ".repeat(hotel.stars)}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className='hotel-card bg-arenal'>
                <div className='flex justify-center'>
                    <h1 className="titleZona bg-background w-2/3 rounded-b text-dark text-xl px-2 text-center"> 
                        Hoteles en Zona <span className='text-primary'>Arenal</span>
                    </h1>
                </div>
            
                <div className="overlay text-white flex flex-col justify-center items-center">
                    <h1 className="text-2xl text-background text-center"> 
                        Arenal
                    </h1>
                    <ul>
                        {hotelsArenal.map(hotel => (
                        <li className='mt-4' key={hotel.id}>
                            <Link className={hotel.stars === 5 ? "text-yellow-400" : "" } to={`/hotel/${hotel.id}`}>-{hotel.name} {"* ".repeat(hotel.stars)}</Link>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    </>
  )
}

export default ShowHotels