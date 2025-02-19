import { useEffect, useState } from "react";
import { CustomerToUpdate } from "../../@types/Hotel";
import axios from "axios";

interface UpdateCustomerProps{
 customerData: CustomerToUpdate,
 setUserUpdated: React.Dispatch<React.SetStateAction<Boolean>>,
 userUpdated: Boolean
}

const UpdateClient = ({customerData, setUserUpdated, userUpdated}: UpdateCustomerProps) => {

    // Estado para guardar la copia de user con los cambios hechos en el formulario
    const [customerFormData , setCustomerFormData] = useState<CustomerToUpdate>({
        firstName: "",
        lastName: "",
        address: "",
        dni: "",
        phone: "",
        cardNumber: "",
      })
    
    useEffect(() => {
        if (customerData) {
         setCustomerFormData(customerData);
        }
    }, 
    [customerData]);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
          
        setCustomerFormData((prevData) =>
            prevData && { ...prevData, [name]: value }
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(customerFormData)
        // Crear un nuevo objeto solo con los campos editables
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem("jwtToken");
            // Realizar la solicitud POST a la API
            const response = await axios.put(`${baseUrl}api/actualizarCliente`, customerFormData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });

            // Manejar respuesta exitosa
            console.log('cliente Actualiado exitosamente:', response.data);
            setUserUpdated(!userUpdated)
        } catch(error){
            console.log(error)
        }
    }

  return (
    <form className="bg-white md:w-2/3 w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center p-3 bg-background">Tus Datos Personales</h2>
          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Nombre:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="firstName" 
            value={customerFormData.firstName || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Apellidos:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="lastName" 
            value={customerFormData.lastName || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Direccion:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="address" 
            value={customerFormData.address || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Telefono:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="phone" 
            value={customerFormData.phone || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Dni:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="dni" 
            value={customerFormData.dni || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Tarjeta:</label>
            <input className="mt-2 p-2 w-full border-b-2 border focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="cardNumber" 
            value={customerFormData.cardNumber || ""} 
            onChange={handleCustomerChange} />
          </div>

          <div className="flex justify-end px-6">
          <button type="submit" className="bg-accent1 hover:bg-accent2 p-3 w-1/3 mb-2 mt-4 text-background font-semibold">Actualizar Datos</button>

          </div>
    </form>
  )
}

export default UpdateClient