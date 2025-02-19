import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const VentajasRJClub = () => {
  return (
    <>
    <div className="container mx-auto p-5">
  <h2 className="text-3xl font-bold mb-6">Comparativa de Planes</h2>
  
  <table className="w-full border-collapse border-b-2 shadow-sm shadow-secondary">
    <thead>
      <tr className="bg-dark">
        <th className="text-left p-4 text-background">Ventajas</th>
        <th className="text-center p-4 text-background">Silver</th>
        <th className="text-center p-4 text-background">Gold</th>
        <th className="text-center p-4 text-background">Premium</th>
      </tr>
    </thead>
    
    <tbody>
    <tr className='bg-secondary h-20'>
        <td className="p-4">Welcome Cocktail</td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='h-20'>
        <td className="p-4">Acceso a descuentos exclusivos</td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='bg-secondary h-20'>
        <td className="p-4">Acceso a eventos exclusivos</td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='h-20'>
        <td className="p-4">Soporte prioritario</td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='bg-secondary h-20'>
        <td className="p-4">Acceso a mejores habitaciones</td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='h-20'>
        <td className="p-4">Late check-out</td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className='bg-secondary h-20'>
        <td className="p-4">Upgrade de habitacion gratuito</td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      <tr className=' h-20'>
        <td className="p-4">Traslado al aeropuerto gratuito</td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><CloseOutlinedIcon className='bg-red-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
        <td className="text-center p-4"><DoneOutlinedIcon className='bg-green-400 text-background rounded-full ' sx={{ fontSize: '30px' }}/></td>
      </tr>
      
    </tbody>
  </table>
</div>

    </>
  )
}

export default VentajasRJClub