import { useNavigate } from 'react-router-dom';
import '../../styles/styles.css'
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';


const HazteMiembro = () => {

  const navigate = useNavigate()
  return (
    <>
  
  <div className="shadow text-center bg-club px-4 py-8 sm:px-6 sm:py-12 lg:p-24
   flex flex-col items-center">
    <h2 className="text-3xl sm:text-5xl lg:text-6xl text-background text-center md:tracking-wider">
      Conoce Las Ventajas de Pertenecer a RJClub
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-10 gap-6 w-full max-w-6xl">
      {/* Tarjeta 1 */}
      <div className="outline outline-2 flex flex-col justify-between gap-3 outline-background p-4">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-accent1"><StarBorderOutlinedIcon  /></h2>
          <h2 className="text-background text-center text-2xl sm:text-3xl lg:text-4xl p-2 uppercase">
            RJ Silver Club
          </h2>
        </div>
        <div className="flex justify-center items-baseline">
          <h2 className="text-background text-2xl sm:text-3xl lg:text-4xl">10% Descuento</h2>
        </div>
        <h2 className="text-white text-lg text-center">
          + <br />Acceso gratuito a eventos <br /> de 0 a 9 noches disfrutadas
        </h2>
      </div>

      {/* Tarjeta 2 */}
      <div className="outline outline-2 flex flex-col justify-between gap-3 outline-background p-4">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-accent1"><AutoAwesomeOutlinedIcon /></h2>
          <h2 className="text-background text-center text-2xl sm:text-3xl lg:text-4xl p-2 uppercase">
            RJ Gold Club
          </h2>
        </div>
        <div className="flex justify-center items-baseline">
          <h2 className="text-background text-2xl sm:text-3xl lg:text-4xl">20% Descuento</h2>
        </div>
        <h2 className="text-white text-lg text-center">
          + <br />Acceso gratuito a eventos <br /> de 10 a 19 noches disfrutadas
        </h2>
      </div>

      {/* Tarjeta 3 */}
      <div className="outline outline-2 flex flex-col justify-between gap-3 outline-white p-4 shadow-lg">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-accent1"><DiamondOutlinedIcon /></h2>
          <h2 className="text-background text-center text-2xl sm:text-3xl lg:text-4xl p-2 uppercase">
            RJ Premium Club
          </h2>
        </div>
        <div className="flex justify-center items-baseline">
          <h2 className="text-background text-2xl sm:text-3xl lg:text-4xl">30% Descuento</h2>
        </div>
        <h2 className="text-white text-lg text-center">
          + <br />Acceso gratuito a eventos <br /> a partir de 20 noches disfrutadas
        </h2>
      </div>
    </div>

    {/* Botón */} 
    <div className="flex justify-center w-full max-w-xs mt-6">
      <button 
        onClick={() => navigate("/login")} 
        className="outline outline-accent1 shadow-lg text-accent1 shadow-accent1 py-4 px-6 font-bold text-lg 
                   hover:bg-accent2 hover:text-background hover:shadow-none
                   transform transition-all duration-300 ease-in-out rounded w-full"
      >
        Unirme al Club
      </button>
    </div>
  </div>
  
</>


  )
}

export default HazteMiembro