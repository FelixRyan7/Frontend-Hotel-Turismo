import { useEffect, useState } from "react"
import LoginForm from "../components/forms/LoginForm"
import { SingUpForm } from "../components/forms/SingUpForm";
import IsTokenExpired from "../helpers/IsTokenExpired";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

  const [isLogin, setIsLogin] = useState<boolean>(true)

  const navigate = useNavigate()
 

  const handleRegisterClick = () => {
    setIsLogin(false);
  };

  const handleLoginClick = () => {
    setIsLogin(true);
  };

  // este handle es para pasarselo al componente de registro , para que al haer un registro exitoso se muestre el form del login con un mensaje de exito 
  const handleRegisterSuccess = () => {
    setIsLogin(true); // Cambiar a login tras un registro exitoso
  };

  useEffect(() => {
    if (!IsTokenExpired()) {
      // Si el token es válido, redirigir al home
      navigate('/'); 
    }
  }, []);


  return (
    <>
    <div className="bg-login">
      
    {isLogin ? 
    (
      
      <div className="container flex justify-center items-center mx-auto text-center md:grid md:grid-cols-2 min-h-screen">
        <h1 className="hidden md:block my-12 text-dark ">Todavia no tienes cuenta? <br /> <button type="button" className="font-bold text-dark text-5xl px-5 py-1 mt-1 outline hover:bg-dark hover:text-background hover:outline-none" onClick={handleRegisterClick}>Registrate!</button></h1>
        <div className="bg-white bg-opacity-80 md:max-w-md p-8 w-full md:mx-auto rounded-lg shadow-lg mb-4 mx-3 md:my-0 ">
          <LoginForm />
          <h2 className="md:hidden block my-4 text-dark">Todavia no tienes cuenta?  <button type="button" className="font-bold text-dark" onClick={handleRegisterClick}>Registrate!</button></h2>

        </div>
      </div>)
    : 
    
    <div className="container flex justify-center items-center mx-auto text-center md:grid md:grid-cols-2 min-h-screen">
    <div className="bg-white bg-opacity-80 md:max-w-md p-8 w-full md:mx-auto rounded-lg shadow-lg mt-12 mb-4 mx-3 md:my-0 ">
      <SingUpForm onSuccess={handleRegisterSuccess} />
      <h2 className="md:hidden block mt-3 text-dark">Ya has creado una cuenta? <button type="button" className="text-dark font-bold" onClick={handleLoginClick}>Inicia sesion!</button></h2>
    </div>

    <h1 className="hidden md:block text-dark">Ya has creado una cuenta? <br /> <button type="button" className="text-dark font-bold  outline px-3 py-1 mt-1 hover:bg-dark hover:text-background hover:outline-none text-5xl" onClick={handleLoginClick}>Inicia sesion!</button></h1>
    
    </div>
  }
    
        
    </div>
    </>
  )
}

export default LoginPage