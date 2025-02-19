import { jwtDecode } from "jwt-decode";

const IsTokenExpired = () => {
    const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decodedToken: any = jwtDecode<any>(token);
                const expirationTime = decodedToken.exp;  // Tiempo de expiración en segundos
                const currentTime = Date.now() / 1000;
                
                   if (currentTime > expirationTime) {
                    return true // Eliminar el token del localStorage 
                   } 
                   return false;
            }catch(error){
              console.log(error)
              return true
            }
        } else{
            return true
        }
 
}

export default IsTokenExpired