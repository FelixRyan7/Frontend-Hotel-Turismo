import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
}

// Esta ruta sirve para establecer un filtro para las rutas que requieren autenticacion, mediante token y si es necesaario tambien mediante rol del usuario
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('jwtToken');

  // Si no hay token, redirige al login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decodificar el token para extraer el tiempo de expiracion
    const decodedToken: any = jwtDecode<any>(token);
    const expirationTime = decodedToken.exp;  // Tiempo de expiración en segundos
    const currentTime = Date.now() / 1000;
    // const secondsLeft = expirationTime - currentTime;
    // console.log(secondsLeft)
    

    //Primera accion a realizar es verificar si el token ha expirado, y en ese caso eliminarlo y redirigir al login
    if (currentTime > expirationTime) {
      localStorage.removeItem('jwtToken'); // Eliminar el token del localStorage
      return <Navigate to="/login" replace />; // Redirigir al login si ha expirado
    }

    // Segundo paso es verificar si aparte de estar autenticado se precisa un rol especifico para acceder, aqui damos acceso si no es necesario un rol
    // Si no se especifican roles permitidos(es decir, no se pasa como prop que roles tienen acceso a esta ruta, lo cual significaque culquier rol puede acceder si esta autenticado), solo verifica la existencia del token
    if (!allowedRoles) {
      return <>{children}</>;
    }

    //Si es necesario algun rol para acceder entonces comprobamos primero los roles que tiene el usuario y vemos si conicide con el rol requerido para acceder
    const userRoles: string[] = decodedToken.roles || []; // guardamos en la variable los roles o el rol del usuario

    // Si se pasa un rol como condicion para entrar a la ruta, Verificar si el usuario tiene al menos uno de los roles permitidos
    const hasAccess = userRoles.some(role => allowedRoles?.includes(role));
    if (!hasAccess) {
      // Redirigir a una página de acceso denegado o al dashboard si no se encuentra
      return <Navigate to="/access-denied" replace />;
    }
    
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    // En caso de error, redirigir al login
    return <Navigate to="/login" replace />;
  }
    // finalmente si el usuario tiene token valido y tiene el rol permitido para entrar a la ruta se devuelve el componente al que se quiere acceder
    return <>{children}</>;
};

export default ProtectedRoute;
