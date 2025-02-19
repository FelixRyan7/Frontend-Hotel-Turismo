import axios from "axios";
import { useEffect, useState } from "react";
import { Customer, CustomerToUpdate, User} from "../../@types/Hotel";
import UpdateUser from "../forms/UpdateUser";
import UpdateClient from "../forms/UpdateClient";


const MisDatos = () => {

  const[userUpdated, setUserUpdated] = useState<Boolean>(false)

  const [userData , setUserData] = useState<User>({
    username: "",
    email: ""
  })

  const [customerData , setCustomerData] = useState<CustomerToUpdate>({
    firstName: "",
    lastName: "",
    address: "",
    dni: "",
    phone: "",
    cardNumber: "",
  })

    useEffect(() => {
        const fetchUserAndClientData = async () => {
          try {
            const baseUrl = import.meta.env.VITE_API_BASE_URL;
            const token = localStorage.getItem("jwtToken");
            
            const response = await axios.get(`${baseUrl}api/ClientAndUserData`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
            });

            
            const {User, Customer, error} = response.data 
            setCustomerData(Customer)
            setUserData(User)
            console.log(Customer)
            console.log(response.data)
   

          } catch (error: any) {
            // Manejo de errores si la llamada falla
            if (error.response?.status === 404) {
              console.log(error)
            }
          }
        };
        fetchUserAndClientData();
      }, [userUpdated]);

      

      
  return (
    <div className="md:grid grid-cols-2 bg-secondary">
      <div className="rounded p-5 flex justify-center items-center">
        <UpdateUser userData={userData} setUserUpdated={setUserUpdated} userUpdated={userUpdated}/>
      </div>

      <div className="rounded p-5 flex justify-center items-center">
        {customerData !== undefined && <UpdateClient customerData={customerData} setUserUpdated={setUserUpdated} userUpdated={userUpdated}/>}
          
        
      </div>
    </div>
  )
}

export default MisDatos