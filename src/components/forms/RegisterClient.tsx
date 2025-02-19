import axios from 'axios';
import { useState } from 'react';

interface RegisterClientProps {
  onRegisterClientSubmitSuccess: () => void; // Tipo de la función que se ejecutará después del submit exitoso
}


const RegisterClient: React.FC<RegisterClientProps> = ({onRegisterClientSubmitSuccess}) => {

  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    direccion: '',
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    direccion: '',
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  });

  // Manejador de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación del formulario
  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    if (!formData.nombre) {
      newErrors.nombre = 'El nombre es obligatorio';
      valid = false;
    } else {
      newErrors.nombre = '';
    }

    if (!formData.apellido) {
      newErrors.apellido = 'El apellido es obligatorio';
      valid = false;
    } else {
      newErrors.apellido = '';
    }

    if (!formData.dni) {
      newErrors.dni = 'El DNI es obligatorio';
      valid = false;
    } else {
      newErrors.dni = '';
    }

    if (!formData.telefono) {
      newErrors.telefono = 'El teléfono es obligatorio';
      valid = false;
    } else {
      newErrors.telefono = '';
    }

    if (!formData.direccion) {
      newErrors.direccion = 'La dirección es obligatoria';
      valid = false;
    } else {
      newErrors.direccion = '';
    }
    if (!formData.numeroTarjeta || formData.numeroTarjeta.length !== 16) {
      newErrors.numeroTarjeta = "Introduce un número de tarjeta válido (16 dígitos)";
      valid = false;
    } else {
      newErrors.numeroTarjeta = "";
    }

    // Validar fecha de caducidad
    if (!formData.fechaExpiracion || !/^\d{2}\/\d{2}$/.test(formData.fechaExpiracion)) {
      newErrors.fechaExpiracion = "Introduce una fecha válida (MM/AA)";
      valid = false;
    } else {
      newErrors.fechaExpiracion = "";
    }

    // Validar CVV
    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = "El CVV debe tener 3 dígitos";
      valid = false;
    } else {
      newErrors.cvv = "";
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejador del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try{
          // Simular que obtenemos el token o el ID del usuario de alguna manera
         const token = localStorage.getItem("jwtToken");
         
        if (!token) {
          throw new Error("No token found in localStorage.");
        }
        if (token) {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          const { cvv, fechaExpiracion, ...formDataToSend } = formData;
          const response = await axios.post(`${baseUrl}api/registerClient`, formDataToSend,
          { 
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data)
        onRegisterClientSubmitSuccess();
        
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          console.error('Error en la solicitud:', error.response.data);
          setErrors(error.response.data.errors);
          
      } else {
          console.error('Error inesperado:', error.response);
           
      }
      }
    }
  };

  return (
    <div className='mt-4 p-2'>
      
      
      <form onSubmit={handleSubmit} >
      <div className="mb-3 mx-2  p-5 bg-white rounded shadow-sm md:grid grid-cols-2 gap-5">
      <h2 className='col-span-2'>Datos de cliente</h2>
        <div className='h-20 p-2'>
        <div className="flex items-baseline relative">
         
          <input
            className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${errors.nombre ? 'border-red-400' : 'border-gray-300'} border-gray-300 bg-transparent focus:outline-none text-base peer`}
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder=''
          />
          <label
            htmlFor="nombre"
            className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
          >
            Tu nombre
          </label>
          
        </div>
        {errors.nombre && <p className="text-red-500 text-center">{errors.nombre}</p>}
        </div>

        <div className='h-20 p-2'>
        <div className="flex items-baseline">
          
          <input
           className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${errors.apellido ? 'border-red-400' : 'border-gray-300'} border-gray-300 bg-transparent focus:outline-none`}
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            placeholder='Tus Apellidos'
          />
          </div>
          {errors.apellido && <p className="text-red-500 text-center">{errors.apellido}</p>}
        </div>

        <div className='h-20 p-2'>
        <div className="flex items-baseline">
          
          <input
            className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${errors.dni ? 'border-red-400' : 'border-gray-300'} border-gray-300 bg-transparent focus:outline-none`}
            type="text"
            id="dni"
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            placeholder='Documento de Identidad'
          />
          </div>
          {errors.dni && <p className="text-red-500 text-center">{errors.dni}</p>}
        </div>

        <div className='h-20 p-2'>
        <div className="flex items-baseline">
          
          <input
            className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${errors.telefono ? 'border-red-400' : 'border-gray-300'} border-gray-300 bg-transparent focus:outline-none`}
            type="text"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder='Tu telefono'
          />
          </div>
          {errors.telefono && <p className="text-red-500 text-center">{errors.telefono}</p>}
        </div>

        <div className='h-20 p-2'>
        <div className="flex items-baseline">
          
          <input
            className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${errors.direccion ? 'border-red-400' : 'border-gray-300'} bg-transparent focus:outline-none `}
            type="text"
            id="direccion"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder='Tu direccion'
          />
          </div>
          {errors.direccion && <p className="text-red-500 text-center">{errors.direccion}</p>}
        </div>
        </div>
        <div className='md:grid grid-cols-3 mx-2 p-5 bg-white shadow-sm rounded gap-4'>
          <h2 className='col-span-3'>Datos de tarjeta de Credito</h2>

        <div className="h-20 p-2 col-span-3">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.numeroTarjeta ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="numeroTarjeta"
              name="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={handleChange}
              placeholder=""
              maxLength={16}
            />
            <label
              htmlFor="numeroTarjeta"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              Número de Tarjeta
            </label>
          </div>
          {errors.numeroTarjeta && (
            <p className="text-red-500 text-center">{errors.numeroTarjeta}</p>
          )}
        </div>

        <div className="h-20 p-2">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.fechaExpiracion ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="fechaExpiracion"
              name="fechaExpiracion"
              value={formData.fechaExpiracion}
              onChange={handleChange}
              placeholder=""
              maxLength={5}
            />
            <label
              htmlFor="fechaExpiracion"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              Fecha de Caducidad (MM/AA)
            </label>
          </div>
          {errors.fechaExpiracion && (
            <p className="text-red-500 text-center">{errors.fechaExpiracion}</p>
          )}
        </div>

        {/* CVV */}
        <div className="h-20 p-2">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.cvv ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder=""
              maxLength={3}
            />
            <label
              htmlFor="cvv"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              CVV
            </label>
          </div>
          {errors.cvv && (
            <p className="text-red-500 text-center">{errors.cvv}</p>
          )}
        </div>

        <button className='p-5 md:p-2 w-full mt-5 lg:p-4 text-xs text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform' type="submit">Confirmar Datos</button>

        </div>
    
      </form>
    </div>
  );
};

export default RegisterClient;
