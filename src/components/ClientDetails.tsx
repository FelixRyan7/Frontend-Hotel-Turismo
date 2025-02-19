import axios from "axios";
import { useEffect, useState } from "react"
import { ClientData } from "../@types/Hotel";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Swal from "sweetalert2";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


const ClientDetails = () => {

    const [clientData, setClientData] = useState<ClientData>({
      id: 0,
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      address: '',
      cardNumber: ''
     })

    const [isEditing, setIsEditing] = useState(false);
    const [formDataEdit, setFormDataEdit] = useState(clientData);
    const [DatosActualizados, setDatosActualizados] = useState<boolean>(false)
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

    const [errors, setErrors] = useState({
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      direccion: '',
    });

    const validateForm = () => {
      let valid = true;
      let newErrors = { ...errors };
  
      if (!formDataEdit.firstName) {
        newErrors.nombre = 'El nombre es obligatorio';
        valid = false;
      } else {
        newErrors.nombre = '';
      }
  
      if (!formDataEdit.lastName) {
        newErrors.apellido = 'El apellido es obligatorio';
        valid = false;
      } else {
        newErrors.apellido = '';
      }
  
      if (!formDataEdit.dni) {
        newErrors.dni = 'El DNI es obligatorio';
        valid = false;
      } else {
        newErrors.dni = '';
      }
  
      if (!formDataEdit.phone) {
        newErrors.telefono = 'El teléfono es obligatorio';
        valid = false;
      } else {
        newErrors.telefono = '';
      }
  
      if (!formDataEdit.address) {
        newErrors.direccion = 'La dirección es obligatoria';
        valid = false;
      } else {
        newErrors.direccion = '';
      }
      
      setErrors(newErrors);
      return valid;
    };

     const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setFormDataEdit({ ...formDataEdit, [e.target.name]: e.target.value });
    };

// Función para comparar objetos
    const compareObjects = (obj1: any, obj2: any) => {
      return (
        obj1.firstName === obj2.firstName &&
        obj1.lastName === obj2.lastName &&
        obj1.dni === obj2.dni &&
        obj1.phone === obj2.phone &&
        obj1.address === obj2.address
      );
    };

    useEffect(() => {
      // Comparar los objetos y actualizar el estado del botón de submit
      setIsSubmitDisabled(compareObjects(formDataEdit, clientData));
    }, [formDataEdit, clientData]);

    const handleCloseEditForm = () => {
      setIsEditing(false)
      setDatosActualizados(!DatosActualizados)
    }

    const handleSaveNewClientDetails = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(formDataEdit)
      console.log(clientData)
      if (validateForm()) {
        try {
          const baseUrl = import.meta.env.VITE_API_BASE_URL;
          const token = localStorage.getItem("jwtToken");
        
          const response = await axios.put(`${baseUrl}api/updateClient/${formDataEdit.id}`, formDataEdit, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          Swal.fire({
            title: 'Se han cambiado tus datos correctamente!',
            text: 'SIgue con el proceso',
            icon: 'success',
            timer: 2000, 
            showConfirmButton: false, 
          });
          console.log(response.data)
          //usamos este estado para hacer fetch a los datos en la base de datos cada vez que se registran nuevos datos
          setDatosActualizados(!DatosActualizados)
          setIsEditing(false); // Cierra el formulario
        } catch (error: any) {
          if (error.response && error.response.status === 400) {
          console.error('Error en la solicitud:', error.response.data);
          setErrors(error.response.data.errors)
          
          } else 
          {
            console.error('Error inesperado:', error);
          }
        }
      } 
    };

    useEffect(() => {
        // Llamada asincrónica a la API
        const fetchClientData = async () => {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            // Simular que obtenemos el token o el ID del usuario de alguna manera
            const token = localStorage.getItem("jwtToken");
           
            if (!token) {
              throw new Error("No token found in localStorage.");
            }
            if (token) {
              const response = await axios.get(`${baseUrl}api/clientData`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
               // Almacenar la información de la respuesta en los estados
               
               setClientData(response.data)
               
            }
          } catch (error) {
            console.error("Error al obtener los datos del usuario:", error);
          }
        };
    
        fetchClientData();
      }, [DatosActualizados]);

      useEffect(() => {
        setFormDataEdit(clientData); // Actualiza formData cuando clientData cambia
      }, [clientData]);

  return (
   <>
   <div className="my-5 mx-2 p-5 bg-white rounded shadow-sm">
    <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Tus Datos de Cliente</h1>
    <div className="space-y-4">
    <div className="grid grid-cols-2">
      <p className="text-gray-600 font-medium text-start">Nombre: <span>{clientData.firstName}</span></p>
      <p className="text-gray-600 font-medium text-start">Apellidos: <span>{clientData.lastName}</span></p>
    </div>
    <div className="grid grid-cols-2">
      <p className="text-gray-600 font-medium text-start">Dni: <span>{clientData.dni}</span></p>
      <p className="text-gray-600 font-medium text-start">Telefono: <span>{clientData.phone}</span></p>
    </div>
      <p className="text-gray-600 font-medium text-start">Dirección: <span>{clientData.address}</span></p>
      <p className="text-gray-600 font-medium text-start">Tarjeta: <span>**** **** **** {clientData.cardNumber.slice(-4)}</span></p>
    </div>
    <div className="flex justify-end gap-2">
      
    <button 
      type="button" 
      onClick={() => setIsEditing(!isEditing)} 
      className={`${isEditing ? 'bg-red-500' : 'bg-dark'} text-background px-4 py-2 rounded mt-4 text-end`}
    >
      {isEditing ? <CloseOutlinedIcon/> : <EditOutlinedIcon />}
    </button>
    
    </div>
    
   </div>

   {isEditing && (
        // FORMULARIO DE EDICIÓN
        <div className=" mx-2 p-5 bg-white rounded shadow-sm mb-10">
          <div className="space-y-4">

            <div className="grid grid-cols-2">
              <div className='h-20 p-2'>
                <div className="flex items-baseline relative">
                  <input type="text" name="firstName" defaultValue={formDataEdit.firstName} onBlur={handleBlur} className={`bg-transparent border-b-2 focus:border-primary p-2 ${errors.nombre ? 'border-red-400' : 'border-gray-300'} rounded w-full focus:outline-none peer`} placeholder="" />
                  <label
                    htmlFor="firstName"
                    className={`absolute left-2 top-2 text-gray-500 text-sm  transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary ${
                    formDataEdit.firstName
                    ? "top-[-10px] left-0 text-xs text-gray-500"
                    : "top-2 text-sm text-gray-500"
                    }`}
                  >
                    Tu nombre
                  </label>
                </div>
                {errors.nombre && <p className="text-red-500 text-sm mt-2 text-center">{errors.nombre}</p>}
              </div>

              <div className='h-20 p-2'>
                <div className="flex items-baseline relative">

                  <input type="text" name="lastName" defaultValue={formDataEdit.lastName} onBlur={handleBlur} className={`bg-transparent border-b-2 focus:border-primary p-2 ${errors.apellido ? 'border-red-400' : 'border-gray-300'} rounded w-full focus:outline-none peer`} placeholder="" />
                  <label
                    htmlFor="lastName"
                    className={`absolute left-2 top-2 text-gray-500 text-sm  transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary ${
                    formDataEdit.lastName
                      ? "top-[-10px] left-0 text-xs text-gray-500"
                      : "top-2 text-sm text-gray-500"
                  }`}
                  >
                    Tu/s Apellido/s
                  </label>
                  
                </div>
                {errors.apellido && <p className="text-red-500 text-sm mt-2 text-center">{errors.apellido}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className='h-20 p-2'>
                <div className="flex items-baseline relative">
                  <input type="text" name="dni" defaultValue={formDataEdit.dni} onBlur={handleBlur} className={`bg-transparent border-b-2 focus:border-primary p-2 ${errors.dni ? 'border-red-400' : 'border-gray-300'} rounded w-full focus:outline-none peer`} placeholder="" />
                  <label
                    htmlFor="dni"
                    className={`absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary ${
                    formDataEdit.dni
                      ? "top-[-10px] left-0 text-xs text-gray-500"
                      : "top-2 text-sm text-gray-500"
                  }`}
                  >
                    Tu Dni
                  </label>
                  
            
                </div>
                {errors.dni && <p className="text-red-500 mt-2 text-sm text-center">{errors.dni}</p>}
              </div>

              <div className='h-20 p-2'>
                <div className="flex items-baseline relative">
                  <input type="text" name="phone" defaultValue={formDataEdit.phone} onBlur={handleBlur} className={`bg-transparent border-b-2 focus:border-primary p-2 ${errors.telefono ? 'border-red-400' : 'border-gray-300'} rounded w-full focus:outline-none peer`} placeholder="" />
                  <label
                    htmlFor="phone"
                    className={`absolute left-2 top-2 text-gray-500 text-sm  transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary ${
                    formDataEdit.phone
                      ? "top-[-10px] left-0 text-xs text-gray-500"
                      : "top-2 text-sm text-gray-500"
                  }`}
                  >
                    Tu Telefono
                  </label>
                  
            
                </div>
                {errors.telefono && <p className="text-red-500 mt-2 text-sm text-center">{errors.telefono}</p>}
              </div>
            </div> 
              
            <div className='h-20 p-2'>
                <div className="flex items-baseline relative">
                  <input type="text" name="address" defaultValue={formDataEdit.address} onBlur={handleBlur} className={`bg-transparent border-b-2 focus:border-primary p-2 ${errors.direccion ? 'border-red-400' : 'border-gray-300'} rounded w-full focus:outline-none peer`} placeholder="" />
                  <label
                    htmlFor="address"
                    className={`absolute left-2 top-2 text-gray-500 text-sm  transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:left-2 peer-focus:text-xs peer-focus:text-primary ${
                    formDataEdit.address
                      ? "top-[-10px] left-0 text-xs text-gray-500"
                      : "top-2 text-sm text-gray-500"
                  }`}
                  >
                    Tu Direccion
                  </label>
                  
            
                </div>
                {errors.direccion && <p className="text-red-500 mt-2 text-sm text-center">{errors.direccion}</p>}
              </div>
          {/* Botones */}
          <div className="flex justify-between mt-4">
            <button onClick={handleCloseEditForm} className=""><CloseOutlinedIcon/></button>
            <button onClick={handleSaveNewClientDetails} disabled={isSubmitDisabled} className={`bg-primary text-white px-4 py-2 rounded ${isSubmitDisabled ? 'opacity-30 cursor-not-allowed' : ''}`}>Guardar</button>
          </div>
        </div>
        </div>
        )}
   </>
    
  )
}

export default ClientDetails