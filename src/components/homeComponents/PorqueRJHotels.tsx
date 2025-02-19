import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import LocalAirportOutlinedIcon from '@mui/icons-material/LocalAirportOutlined';
import { useNavigate } from 'react-router-dom';

const PorqueRJHotels = () => {

    const navigate = useNavigate();

  return (
    <>
       <div className="text-center p-4">
            <h1 className="text-6xl text-dark">Por que RJhotels?</h1>
            <div className="flex md:flex-row md:justify-between flex-col gap-5 items-center mx-auto container max-w-[1200px] mt-5 outline outline-primary py-10 px-4 shadow-md shadow-primary">

                <div className='flex items-center gap-2'>
                    <RecyclingOutlinedIcon fontSize="large" className='text-primary' />
                    <div className='block text-start'>
                        <h1 className='text-xl'>Sostenibilidad</h1>
                        <p className='text-xs'>Usamos energías renovables para proteger la isla</p>
                    </div>
                </div>

                <div className='flex items-center gap-2'>
                    <AddTaskOutlinedIcon fontSize="large" className='text-primary'/>
                    <div className='block text-start'>
                        <h1 className='text-xl'>Experiencias para todos los viajeros</h1>
                        <p className='text-xs'>Aventura,fiesta,relax... tenemos un sitio para todos</p>
                    </div>
                    </div>
            
                <div className='flex items-center gap-2'>
                    <LocalAirportOutlinedIcon fontSize="large" className='text-primary'/>
                    <div className='block text-start'>
                        <h1 className='text-xl'>20 años Mejorando el turismo</h1>
                        <p className='text-xs'>Experiencia consolidada en la isla y su potencial</p>
                    </div>
                </div>
            </div>
       </div>

       <div className=' mx-auto container max-w-[1200px] mt-5'>
            <h2 className='text-center text-xl text-dark'>Ademas puedes hacerte miembro para descuentos exclusivos en <span onClick={() => {navigate("/login")}} className='uppercase text-3xl cursor-pointer font-bold bg-gradient-to-r from-accent1 to-primary bg-clip-text text-transparent'>RJClub</span></h2>
       </div>
    </>
  )
}

export default PorqueRJHotels