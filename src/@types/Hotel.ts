import { Message } from "../@types/globales";

export type Hotel = {
    id: number;
    name: string;
    location: string;
    description: string;
    rating: number | null;
    address: string;
    phone: string;
    email: string;
    imageUrl: string;
    priceModifier: number;
  };

  export type HotelSelectOption = {
    id: number;
    name: string;
    stars: number
  };

  export type HotelSearch = {
    hotelId: number,
    startDate: string,
    endDate: string,
    guests: number,
    promoCode: string;
  }

  export type RoomType = {
    id: number;
    type: string;
    description: string;
    price: number;
    capacity: number;
    
  };

  export type Room = {
    id : number
    roomNumber: string
    roomType: RoomType

  }

  export type RoomTypeWithOutPrice = {
    id: number;
    type: string;
    description: string;
    squareMeters: number
    capacity: number;
    photos: string[];
  };

  export type RoomTypeDTO = {
    id: number; // ID del tipo de habitación
    type: string; // Tipo de habitación
    description: string; // Descripción de la habitación
    capacity: number; // Capacidad de la habitación
    squareMeters: number;
    features: string[]; // Lista de características (como un array)
    message?: Message | null; // Mensaje opcional relacionado con la disponibilidad
    photos: string[];
    mealPlans: MealPlanAvailable[];
    roomBasePrice: number;
    remainingRooms: number;
    daysBetweenStartAndEnd:number
    
  };

  export type RoomTypeDTOWithPrice = {
    id: number; // ID del tipo de habitación
    type: string; // Tipo de habitación
    description: string; // Descripción de la habitación
    capacity: number; // Capacidad de la habitación
    squareMeters: number;
    features: string[]; // Lista de características (como un array)
    message?: Message | null; // Mensaje opcional relacionado con la disponibilidad
    photos: string[];
    mealPlans: MealPlanAvailable[];
    roomBasePrice: number;
    remainingRooms: number;
    daysBetweenStartAndEnd:number
    finalPrice: number;
  };

  export type MealPlan = {
    id: number;
    name: string;
    description: string
  };

  export type MealPlanAvailable = {
    id: number;
    hotel : Hotel;
    mealPlan : MealPlan;
    priceModifier: number
  }
  
  export type AvailableRoomTypes = RoomType[];

  export type PromoDiscount = {
    id: number;
    code: string;
    discount: number | 0
  }

  export type ReservationDataType = {
    room: string; 
    mealPlan: number; 
    finalPrice: string;
    startDate: string | null; 
    endDate: string | null;   
  }

  export type ReservationData = {
    hotel: {
      id: Hotel['id'];
      name: Hotel['name'];
      location: Hotel['location'];
      } | null;
    roomDetails: {
      id: RoomType['id'];
      name: RoomType['type'];
    };
    mealPlan: {
      id: MealPlan['id'];
      name: MealPlan['name'];
    };
    finalPrice: string;
    startDate: string | null; 
    endDate: string | null;
    photos: string[];
    numberPeople : number;

  }

  export type ClientData = {
    id:number,
    firstName: string,
    lastName: string,
    dni: string,
    phone: string,
    address: string
    cardNumber: string
    
  }

  export type HotelInfo = {
    id: number,
    name:string,
    location:string,
    description:string,
    address: string,
    phone: string,
    email:string
    imageUrl:string,
    stars: number
  }

  export type DetailFromHotel = {
    id: number;
    name: string;
    description: string
    image_url: string
  }

  export type HotelDetailsToShow = {
    id: number ,
    detail: DetailFromHotel,
    quantity: number
  }

  export type Customer = {
    address: string
    cardNumber : string
    createdAt: string
    dni: string
    firstName: string
    id: number
    lastName: string
    phone: string
  }

  export type CustomerToUpdate = {
    firstName: string
    lastName: string
    address: string
    dni: string
    phone: string
    cardNumber : string
  }

  export type User = {
    email: string,
    username: string,
    
  }

  export type Reservation = {
    id:number,
    startDate: string,
    endDate: string,
    numberPeople: number,
    totalPrice: number,
    customer: Customer,
    hotel: Hotel,
    room: Room,
    mealPlan: MealPlan
  }

  export type EventosInfo = {
    id: number,
    hotel: Hotel,
    name : string,
    date: string,
    startTime: string,
    endTime: string,
    description: string,
    price: number
  }

 
 

  