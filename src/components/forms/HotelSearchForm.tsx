import { useState } from "react";
import { HotelSearch, HotelSelectOption } from "../../@types/Hotel";
import { validateHotelSearch } from "../../helpers/formValidation";
import { useMessages } from "../../hooks/useMessages";
import MessageList from "../MessageList";
import '../../styles/styles.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';




type Props = {
  initialSearch: HotelSearch;
  onSearchSubmit: (search: HotelSearch) => void;
  hotelsByLocation: Map<string, HotelSelectOption[]>;
};

const HotelSearchForm: React.FC<Props> = ({ initialSearch, onSearchSubmit, hotelsByLocation }) => {
  const [hotelSearch, setHotelSearch] = useState<HotelSearch>(initialSearch);
  const { messages, addMessage, clearMessages } = useMessages();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para manejar el modal

  const handleIncrement = () => {
    if (hotelSearch.guests < 6) {
      
      handleHotelSearchChange('guests', (Number(hotelSearch.guests) + 1).toString());
    }
  };

  const handleDecrement = () => {
    if (hotelSearch.guests > 1) {
      handleHotelSearchChange('guests', (Number(hotelSearch.guests) - 1).toString());
    }
  };
  

  const handleHotelSearchChange = (key: string, value: string) => {
    setHotelSearch((prev: HotelSearch) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const today = new Date().toISOString().split("T")[0];
    const errors = validateHotelSearch(hotelSearch, today);

    if (errors.length) {
      errors.forEach((error) => addMessage(error.text, error.style));
      return;
    }

    
    onSearchSubmit(hotelSearch);
    
    // Cierra el modal después de enviar la búsqueda en pantallas pequeñas
    setIsModalOpen(false);
  };

  return (
    <>
    
      {/* Botón en pantallas pequeñas */}
      <div className="rounded flex justify-center bottom-10 md:hidden">
       <button
        className="py-5 w-3/4 px-4 text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform"
        onClick={() => setIsModalOpen(true)}
      >
       Hacer Reserva
      </button>
      </div>

      {/* Modal en pantallas pequeñas */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-background p-10 overflow-y-auto">
          <div className="mx-auto flex justify-center">
          <div className="w-full ">
          <button
            className="absolute top-4 right-12 text-gray-600 hover:text-gray-900 font-bold text-xl"
            onClick={() => setIsModalOpen(false)}
          >
            &#x2715; {/* Botón de cerrar */}
          </button>
          <form onSubmit={handleSubmit} className="sm:grid sm:grid-cols-2 gap-6 items-center">
            <MessageList messages={messages} />
            <div className="mb-4">
              <label htmlFor="hotel" className="block text-sm font-medium text-gray-800 mb-2">
                Elige Un Hotel
              </label>
              <select
                id="hotel"
                name="hotelId"
                className="py-6 px-2 block text-center w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400 font-medium"
                value={hotelSearch.hotelId || ""}
                onChange={(e) => handleHotelSearchChange("hotelId", e.target.value)}
                required
              >
                <option value="" disabled>
                  Nuestros hoteles
                </option>
                {Array.from(hotelsByLocation.entries()).map(([location, hotels]) => (
                  <optgroup key={location} label={location}>
                    {hotels.map((hotel) => (
                      <option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="entrada" className="block text-sm font-medium text-gray-800 mb-2">
                Fecha de entrada
              </label>
              <input
                type="date"
                id="entrada"
                name="startDate"
                value={hotelSearch.startDate}
                onChange={(e) => handleHotelSearchChange("startDate", e.target.value)}
                className="py-6 px-2 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400 text-center font-medium"
                required
              />
            </div>

            

            <div className="mb-4">
              <label htmlFor="salida" className="block text-sm font-medium text-gray-800 mb-2">
                Fecha de salida
              </label>
              <input
                type="date"
                id="salida"
                name="endDate"
                value={hotelSearch.endDate}
                onChange={(e) => handleHotelSearchChange("endDate", e.target.value)}
                className="py-6 px-2 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400 text-center font-medium"
                required
              />
            </div>

            <div className="mb-4">
            <label htmlFor="huespedes" className="block text-sm font-medium text-gray-800 mb-2">
                Huespedes
              </label>
              <div className="flex">
            <button
      type="button"
        onClick={handleDecrement}
        className="px-5 font-bold bg-white text-dark shadow-sm rounded-sm border border-gray-200 rounded-l hover:bg-gray-700 focus:outline-none"
      >
        -
      </button>
              
              <input
                type="number"
                id="huespedes"
                name="huespedes"
                value={hotelSearch.guests}
                onChange={(e) => handleHotelSearchChange("guests", e.target.value)}
                className="py-6 px-2 block w-full border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400 text-center font-medium"
                min="1"
                max="6"
                required
              />
              <button
              type="button"
              onClick={handleIncrement}
              className="px-5 font-bold bg-white shadow-sm text-dark rounded-r border border-gray-200 hover:bg-gray-700 focus:outline-none"
              >
                +
              </button>
            </div>
            </div>


            <div className="mb-4">
              <label htmlFor="promoCode" className="block text-sm font-medium text-gray-800 mb-2">
                Código Promocional
              </label>
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                value={hotelSearch.promoCode || ""} // Asegurarte de manejar un valor inicial si no está definido
                onChange={(e) => handleHotelSearchChange("promoCode", e.target.value)}
                className="py-6 px-2 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600 placeholder-gray-400 text-center font-medium"
                placeholder="Introduce tu código promocional"
              />
            </div>
            
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full py-4 px-4 text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform mt-4"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
        </div>
        </div>
      )}

      {/* Formulario visible en pantallas medianas y grandes */}
      <div className="hidden md:block">
       
      
        <form
          onSubmit={handleSubmit}
          className="flex justify-between gap-2"
        >
          
          {/* Campos del formulario (igual que antes) */}
          <div >
           
            <select
              id="hotel"
              name="hotelId"
              className="p-2 lg:p-4 text-xs lg:text-sm block bg-transparent focus:outline-none w-full rounded text-gray-800 placeholder-gray-400 font-medium"
              value={hotelSearch.hotelId || ""}
              onChange={(e) => handleHotelSearchChange("hotelId", e.target.value)}
              required
            >
              <option value="" disabled>
                Nuestros hoteles
              </option>
              {Array.from(hotelsByLocation.entries()).map(([location, hotels]) => (
                <optgroup key={location} label={location}>
                  {hotels.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>

          <div className="w-px bg-gray-600 h-auto"></div>
           <div className="block">
           <div className="flex items-center">
           
           <div >
            
              <input
                type="date"
                id="entrada"
                name="startDate"
                value={hotelSearch.startDate}
                onChange={(e) => handleHotelSearchChange("startDate", e.target.value)}
                className="p-2 lg:p-4 text-xs lg:text-sm block w-full focus:outline-none rounded bg-transparent text-gray-800 placeholder-gray-400 text-center font-medium"
                required
              />

          </div> 

          <p className="text-center items-center text-dark"> <ArrowForwardOutlinedIcon/> </p>
        
            <div className="">
              
              <input
                type="date"
                id="salida"
                name="endDate"
                value={hotelSearch.endDate}
                onChange={(e) => handleHotelSearchChange("endDate", e.target.value)}
                className="p-2 lg:p-4 text-xs lg:text-sm block w-full focus:outline-none rounded bg-transparent border-gray-300 text-gray-800 placeholder-gray-400 text-center font-medium"
                required
              />
            </div> 
            
            </div>
            <MessageList messages={messages} />
            </div>

            <div className="w-px bg-gray-600 h-auto"></div>

            <div className="flex items-center">
              

            <p className="mr-2 text-dark"><PeopleAltOutlinedIcon/></p>

      {/* Input de número */}
      <input
        type="number"
        id="huespedes"
        name="huespedes"
        value={hotelSearch.guests}
        onChange={(e) => handleHotelSearchChange('guests', e.target.value)}
        className="p-2 lg:p-4 text-xs lg:text-sm block w-auto lg:w-full rounded bg-transparent border-gray-300 focus:outline-none text-gray-800 placeholder-gray-400 text-center font-medium appearance-none"
        min="1"
        max="6"
        required
        
      />

    </div>
    <div className="block w-5">

              {/* Botón Incrementar */}
              <button
              type="button"
                onClick={handleIncrement}
                className="w-full mb-2 font-bold bg-background text-dark rounded hover:bg-gray-200 focus:outline-none"
              >
                +
              </button>
              {/* Botón Decrementar */}
              <button
              type="button"
                onClick={handleDecrement}
                className="w-full font-bold bg-background text-dark rounded hover:bg-gray-200  focus:outline-none"
              >
                -
              </button>
            </div>

            

            <div className="w-px ml-2 bg-gray-600 h-auto"></div>

            <div>
              
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                value={hotelSearch.promoCode} // Asegurarte de manejar un valor inicial si no está definido
                onChange={(e) => handleHotelSearchChange("promoCode", e.target.value)}
                className="p-2 lg:p-4 text-xs lg:text-sm block bg-transparent rounded focus:outline-none border-gray-300  text-gray-800 placeholder-gray-600 text-center font-medium"
                placeholder="código promocional"
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="p-2 lg:p-4 text-xs text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform"
              >
                <p className=""><SearchOutlinedIcon/></p> <p className="hidden">Buscar</p>
              </button>
            </div>
        </form>
      </div>
      
      </>


  );
};

export default HotelSearchForm;

