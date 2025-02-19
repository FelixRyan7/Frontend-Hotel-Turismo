import { useState } from "react";
import { loginForm } from "../../@types/loginPage";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";



const LoginForm: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const [loginFormData, setLoginFormData] = useState<loginForm>({
        username: '',
        password: '',
      });

      

      const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginFormData((prevState) => ({
          ...prevState,
          [name]: value, // Actualizar el campo correspondiente
        })); 
        console.log(loginFormData)
      };
    
      const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          // Enviar los datos al backend usando axios
          const response = await axios.post(`${baseUrl}api/auth/login`, loginFormData);
          
          console.log("Respuesta del servidor:", response.data);
    
          // Guardar el token en localStorage
          localStorage.setItem('jwtToken', response.data.token);

          const token = localStorage.getItem("jwtToken"); // Obtener el token desde localStorage
          if (token) {
            const decodedToken = jwtDecode<any>(token);
            const expirationTime = decodedToken.exp; // Decodificar el token
            const username = decodedToken.sub; // Extraer el "username" (subject)
            const roles = decodedToken.roles; // Extraer los "roles"
            const currentTime = Math.floor(Date.now() / 1000);
            
            console.log("Username:", username);
            console.log("Roles:", roles[0]);
            if (expirationTime > currentTime) {
              console.log("El token es válido. Tiempo restante (segundos):", expirationTime - currentTime);
            }
            else 
            {
              console.log("El token ha expirado.");
            }
            
            navigate("/dashboard/mis-Reservas")
            
          }
          
 
        }catch(error) {
          console.log(error)
          setError("El Username o la contraseña son incorrectos.");
          return;
        }
          
           
      };

  

  return (
    <div className="">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>
        {error && <p className="text-red-500 uppercase font-semibold text-xs mb-5">{error}</p>} {/* Mostrar mensaje de error */}
        <form onSubmit={handleLoginSubmit}>
          <div className="mb-4 h-20 flex items-center gap-3 relative">
          <div className="text-gray-500"><AccountCircleOutlinedIcon /></div>
          <div className="relative w-full">
            <input
              type="text"
              id="username"
              name="username"
              value={loginFormData.username}
              onChange={handleLoginChange}
              required
              className="mb-2 p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer text-base"
            />
            <label
              htmlFor="username"
              className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
                loginFormData.username
                  ? "top-[-10px] left-0 text-xs text-gray-500"
                  : "top-2 text-sm text-gray-500"
              }`}
            >
              Usuario
            </label>
            </div>
          </div>
          
          <div className="mb-6 h-20 flex items-center gap-3 relative">
  <div className="text-gray-500">
    <LockOutlinedIcon />
  </div>

  <div className="relative w-full">
    {/* Input */}
    <input
      type="password"
      id="password"
      name="password"
      value={loginFormData.password}
      onChange={handleLoginChange}
      required
      className={`p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer text-base`}
    />

    {/* Label animado */}
    <label
      htmlFor="password"
      className={`absolute left-2 top-2 text-gray-500 transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
        loginFormData.password
          ? "top-[-10px] left-0 text-xs text-gray-500"
          : "top-2 text-sm text-gray-500"
      }`}
    >
      Contraseña
    </label>
  </div>
</div>

          
          <div className=" ">
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-accent1 to-accent2 text-white rounded-md focus:outline-none hover:bg-gradient-to-l hover:scale-105 transition-transform">Iniciar sesión</button>
          </div>
          <div className="flex justify-between mt-5 mx-2">
          <a href="/" className="text-sm font-semibold ">Volver a Inicio</a>
          <p className="text-sm">Has olvidado la contraseña?</p>
          </div>
        </form>
      </div>
  )
}

export default LoginForm