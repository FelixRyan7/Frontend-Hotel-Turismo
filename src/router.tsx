import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MainLayout from "./layout/MainLayout";
import BuscarHabitaciones from "./views/Reservas/BuscarHabitaciones";
import LoginPage from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import ConfirmarReserva from "./views/Reservas/ConfirmarReserva";
import Dashboard from "./components/dashboards/Dashboard";
import HotelDetails from "./components/HotelDetails";
import MisReservas from "./components/dashboards/MisReservas";
import MisDatos from "./components/dashboards/MisDatos";
import Reportes from "./components/dashboards/Reportes";
import Administracion from "./components/dashboards/Administracion";
import VentajasRJClub from "./components/SidebarComponents/VentajasRJClub";
import Eventos from "./components/SidebarComponents/Eventos";




export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

          {/* RUTAS PUBLCIAS */}
          <Route path="/" element={<Home />} index />
          <Route path="/Reservas/Buscar-habitaciones" element={<BuscarHabitaciones />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/access-denied" element={<AccessDenied />} />
          <Route path="/ventajasRJClub" element={<VentajasRJClub />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/hotel/:hotelId" element={<HotelDetails />} />

          {/* RUTAS PROTEGIDAS SIN RESTRICCION DE ROL */}
          <Route path="/confirmar-reserva" 
             element={ 
              <ProtectedRoute> 
                 <ConfirmarReserva/> 
              </ProtectedRoute> 
            } 
          />
          <Route path="/dashboard" 
             element={
              <ProtectedRoute>
                <Dashboard  />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard/mis-datos" 
             element={
              <ProtectedRoute>
                <MisDatos  />
              </ProtectedRoute>
            }
          />

          <Route path="/dashboard/mis-reservas" 
             element={
              <ProtectedRoute>
                <MisReservas  />
              </ProtectedRoute>
            }
          />

           {/* RUTAS PROTEGIDAS CON RESTRICCION DE ROL [ROLE_USER] */}
           

          {/* RUTAS PROTEGIDAS CON RESTRICCION DE ROL [ROLE_ADMIN] */}
          <Route path="/adminDashboard/reportes" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                 <Reportes />
               </ProtectedRoute>
            }
          />

          <Route path="/adminDashboard/administracion" 
            element={
              <ProtectedRoute allowedRoles={['ROLE_ADMIN']}>
                 <Administracion />
               </ProtectedRoute>
            }
          />
          

        </Route>
      </Routes>
    </BrowserRouter>
  )
}
