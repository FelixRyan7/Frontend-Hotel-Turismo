import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';

const AccessDenied = () => {
  return (
    <>
    
    <div className=" text-white text-center">
        <div className="mt-14 mb-5 bg-red-500 p-16 mx-10 rounded">
          <h1 className="text-4xl font-bold uppercase"><BlockOutlinedIcon /> Acceso denegado</h1>
          <h2 className="mt-5">Se te ha restringido el acceso a esta area probablemente por falta de permisos</h2>
        </div>
        
    </div>
    </>
    
  )
}

export default AccessDenied