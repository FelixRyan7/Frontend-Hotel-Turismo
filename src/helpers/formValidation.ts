import { Message } from "../@types/globales"; 
import { HotelSearch } from "../@types/Hotel";



export const validateHotelSearch = (hotelSearch: HotelSearch, today: string): Message[] => {

  
  const errors: Message[] = [];

  if (hotelSearch.startDate && hotelSearch.endDate && hotelSearch.startDate > hotelSearch.endDate) {
    errors.push({ id: Date.now(), text: "Fecha de entrada posterior a fecha de salida", style: "error" });
  }

  if (hotelSearch.startDate && hotelSearch.startDate < today) {
    errors.push({ id: Date.now(), text: "fecha de entrada anterior a fecha actual", style: "error" });
  }

  if (hotelSearch.startDate === hotelSearch.endDate) {
    errors.push({ id: Date.now(), text: "fecha de entrada igual a salida", style: "error" });
  }

  if (hotelSearch.startDate === "" || hotelSearch.endDate === "" || hotelSearch.hotelId === 0) {
    errors.push({ id: Date.now(), text: "Debes rellenar todos los datos", style: "error" });
  }

  return errors;
};