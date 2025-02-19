import { useEffect, useState } from "react"
import { User } from "../../@types/Hotel"
import axios from "axios"

interface UpdateUserProps{
 userData: User,
 setUserUpdated: React.Dispatch<React.SetStateAction<Boolean>>,
 userUpdated: Boolean
}

const UpdateUser = ({userData, setUserUpdated, userUpdated}: UpdateUserProps) => {
    
    // Estado para guardar la copia de user con los cambios hechos en el formulario
    const [userFormData, setUserFormData] = useState<User>({
     username: "",
     email: "",
     
    })

    useEffect(() => {
        if (userData) {
         setUserFormData(userData);
        }
     }, [userData]);

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
          
        setUserFormData((prevData) =>
            prevData && { ...prevData, [name]: value }
        );
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Crear un nuevo objeto solo con los campos editables
        const updatedUser = {
        username: userFormData.username,
        email: userFormData.email,
        };
        try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem("jwtToken");
            // Realizar la solicitud POST a la API
            const response = await axios.put(`${baseUrl}api/actualizarUser`, updatedUser, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });

            // Manejar respuesta exitosa
            console.log('Usuario Actualiado exitosamente:', response.data);
            setUserUpdated(!userUpdated)
        } catch(error){
            console.log(error)
        }
    }

  return (
    <form className="bg-white md:w-2/3 w-full" onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center p-3 bg-background">Tus Datos de Usuario</h2>
          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Username:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="text" 
            name="username" 
            value={userFormData.username || ""} 
            onChange={handleUserChange} />
          </div>

          <div className="flex flex-col px-6 h-20 mt-5">
            <label className="uppercase">Email:</label>
            <input className="mt-2 p-2 w-full border-b-2 border  focus:border-dark border-gray-300 bg-transparent focus:outline-none" 
            type="email" 
            name="email" 
            value={userFormData.email || ""} 
            onChange={handleUserChange} />
          </div>

          <div className="flex justify-end px-6">
          <button type="submit" className="bg-accent1 hover:bg-accent2 p-3 w-1/3 mb-2 mt-4 text-background font-semibold ">Actualizar Datos</button>

          </div>
    </form>
  )
}

export default UpdateUser