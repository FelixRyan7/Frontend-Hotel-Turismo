import { Outlet, useLocation } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"
import '../styles/styles.css';

export default function MainLayout() {
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isRoomPage = location.pathname === '/Reservas/Buscar-habitaciones';
  const isLoginPage = location.pathname === '/login';
  const isAccessDenied = location.pathname === '/access-denied';
  const isClientRegister = location.pathname === '/confirmar-reserva'
  const isHotelPage = location.pathname.startsWith("/hotel/");
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* Solo renderizamos el Header y el Footer si no estamos en la página de login */}
      {!isLoginPage && !isClientRegister && !isHotelPage && (
        <div className={`relative flex flex-col ${isHome ? ' bg-home-video min-h-screen' : isRoomPage ? 'bg-home-image2' : isAccessDenied ? 'min-h-screen bg-background' : isDashboard ? 'bg-background' : 'bg-background'}`}>
          
          {isHome && (
            <video className="absolute top-0 left-0 w-full h-full object-cover -z-10" autoPlay muted loop>
             <source src="/imagenes/Videos/VideoHome.mp4" type="video/mp4" />
             Tu navegador no soporta videos.
            </video>
          )}

          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </div>
      )}
      {/* Si estamos en la página de login, solo renderizamos el main */}
      {isLoginPage && (
        <div className="flex flex-col min-h-screen bg-background">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      )}

      {isClientRegister && 
      (
        <div className="flex flex-col min-h-screen bg-background">
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      )}

      {isHotelPage && (
        <div className="flex flex-col min-h-screen bg-background">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      )}
    </>
  )
}
