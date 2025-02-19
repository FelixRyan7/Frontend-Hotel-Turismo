import { useState } from "react";
import { signUpForm } from "../../@types/loginPage";
import { AccountCircleOutlined as AccountCircleOutlinedIcon, LockOutlined as LockOutlinedIcon, EmailOutlined as EmailOutlinedIcon } from '@mui/icons-material';
import axios from "axios";
import Swal from 'sweetalert2';

type SignUpFormProps = {
  onSuccess: () => void;
};


export const SingUpForm: React.FC<SignUpFormProps> = ({onSuccess}) => {

  // Estado del form
    const [signUpFormData, setSignUpFormData] = useState<signUpForm>({
        username: '',
        email: '',
        confirmEmail: '',
        password: '',
      });

      // Gestion de erroress, seguardan aqui y si esto no esta vacio se muestran los errores en pantalla al hacer submit
      const [errors, setErrors] = useState<{ [key: string]: string }>({
        username: '',
        email: '',
        password: '',
      });  

      // Gestion del cambio de los inputs del form y guardado en el state
      const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSignUpFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      // validacion previa a mandar datos a la api
      const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
      
        // Validaciones
        if (signUpFormData.email !== signUpFormData.confirmEmail) {
          newErrors.email = 'Los correos no coinciden';
        }
      
        if (signUpFormData.password.length < 8) {
          newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
        }
        // Actualizar el estado con los errores
        setErrors(newErrors);
      
        // Si hay errores, retornar false (formulario inválido)
        return Object.keys(newErrors).length === 0;
      };


      // Gestion del submit y llamado a la api para guardar datos si todo va bien
      const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Si no hay errores, proceder con el envío
            const { confirmEmail, ...dataToSend } = signUpFormData;

            try {
              const baseUrl = import.meta.env.VITE_API_BASE_URL;
              // Realizar la solicitud POST a la API
              const response = await axios.post(`${baseUrl}api/register`, dataToSend);
  
              // Manejar respuesta exitosa
              console.log('Usuario registrado exitosamente:', response.data);
              Swal.fire({
                title: 'Usuario registrado correctamente!',
                text: 'Ya puedes iniciar sesion y disfrutar de las ventajas',
                icon: 'success',
                timer: 3500, 
                showConfirmButton: false, 
              });
              
              onSuccess()
              setErrors({})
              
              
            } catch (error: any) {
              // Manejar errores de la solicitud, la api devuelve los errores con la misma estructura que el estado de errors por lo que se los pasamos al estado al recibirlos para que se muestren
              if (error.response && error.response.status === 400) {
                  console.error('Error en la solicitud:', error.response.data);
                  setErrors(error.response.data.errors);
                  
              } else {
                  console.error('Error inesperado:', error);
                  
              }
          }
          }
        
      };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6 text-dark">Registrate!</h2>
      <form onSubmit={handleSignUpSubmit}>
        {/* Usuario */}
        <div className="mb-4 h-20">
            <div className="flex items-baseline gap-3">
          <div className={`${errors.username ? 'text-red-500' : 'text-gray-500'}`}><AccountCircleOutlinedIcon /></div>
          <div className="relative w-full">
          <input
            type="text"
            id="username"
            name="username"
            value={signUpFormData.username}
            onChange={handleSignUpChange}
            required
            
            className="mb-2 p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer"
          />
          <label
              htmlFor="username"
              className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
                signUpFormData.username
                  ? "top-[-10px] left-0 text-xs text-gray-500"
                  : "top-2 text-sm text-gray-500"
              }`}
            >
              Usuario
            </label>

          </div>
          </div>
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}

        </div>

        {/* Email */}
        <div className="mb-4 h-20">
            <div className="flex items-baseline gap-3">
        <div className={`${errors.email ? 'text-red-500' : 'text-gray-500'}`}><EmailOutlinedIcon /></div>
        <div className="relative w-full">
          <input
            type="email"
            id="email"
            name="email"
            value={signUpFormData.email}
            onChange={handleSignUpChange}
            required
            
            className="mb-2 p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer"
          />
          <label
              htmlFor="email"
              className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
                signUpFormData.email
                  ? "top-[-10px] left-0 text-xs text-gray-500"
                  : "top-2 text-sm text-gray-500"
              }`}
            >
              Email
            </label>
        </div>
        </div>
         {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

        </div>

        {/* Confirmar Email */}
        <div className="mb-4 h-20">
            <div className="flex items-baseline gap-3">
          <div className={`${errors.email ? 'text-red-500' : 'text-gray-500'}`}><EmailOutlinedIcon /></div>
          <div className="relative w-full">
          <input
            type="email"
            id="confirmEmail"
            name="confirmEmail"
            value={signUpFormData.confirmEmail}
            onChange={handleSignUpChange}
            required
            
            className="mb-2 p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer"
          />
          <label
              htmlFor="confirmEmail"
              className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
                signUpFormData.confirmEmail
                  ? "top-[-10px] left-0 text-xs text-gray-500"
                  : "top-2 text-sm text-gray-500"
              }`}
            >
              Confirmar Email
            </label>
        </div>
          </div>
          {/* Mensaje de error si los correos no coinciden */}
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
         
        </div>

        {/* Contraseña */}
        <div className="mb-6 h-20 ">
            <div className="flex items-center gap-3">
            <div className={`${errors.password ? 'text-red-500' : 'text-gray-500'}`}><LockOutlinedIcon /></div>
            <div className="relative w-full">
            <input
            type="password"
            id="password"
            name="password"
            value={signUpFormData.password}
            onChange={handleSignUpChange}
            required
            
            className="mb-2 p-2 w-full border-b-2 focus:border-primary border-gray-300 bg-transparent focus:outline-none peer"
          />
          <label
              htmlFor="password"
              className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-0 peer-focus:text-xs peer-focus:text-primary ${
                signUpFormData.password
                  ? "top-[-10px] left-0 text-xs text-gray-500"
                  : "top-2 text-sm text-gray-500"
              }`}
            >
              Ingresa tu contraseña
            </label>
        </div>
          </div>
          {errors.password && <span className="text-red-500 text-sm ">{errors.password}</span>}
        </div>

        {/* Botón de registro */}
        <div className="">
          <button
            type="submit"
            className="w-full py-3 mt-3 bg-gradient-to-r from-accent1 to-accent2 text-white rounded-md focus:outline-none hover:bg-gradient-to-l hover:scale-105 transition-transform"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  )
}
