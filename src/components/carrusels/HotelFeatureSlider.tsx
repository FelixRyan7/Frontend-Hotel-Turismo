import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HotelDetailsToShow } from "../../@types/Hotel";
import Flag from 'react-world-flags';

// Definir el tipo para las props del componente
interface HotelFeaturesSliderProps {
  features: HotelDetailsToShow[]; // Recibe un array de features
}

const HotelFeaturesSlider: React.FC<HotelFeaturesSliderProps> = ({ features }) => {
  return (
    <>
    <style>
        {`
          .swiper-button-prev, .swiper-button-next {
            color: var(--background-color) !important; /* Cambia el color a naranja */
            font-size: 1.5rem !important;
          }
          .swiper-button-prev:hover, .swiper-button-next:hover {
            opacity: 0.7;
          }
            /* Personalización de los puntitos */
          .swiper-pagination-bullet {
            background-color: var(--secondary-color) !important; /* Color del punto */
            opacity: 1 !important;
            width: 12px;
            height: 12px;
          }

          .swiper-pagination-bullet-active {
            background-color: var(--primary-color) !important; /* Color del punto activo */
            width: 14px;
            height: 14px;
          }

          .swiper-pagination {
           margin-top:20px /* Ajuste vertical si lo necesitas */
          }
        `}
      </style>
    <div className="w-full max-w-5xl mx-auto ">
      
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1} // Muestra 3 elementos por slide en pantallas grandes
        breakpoints={{
          640: { slidesPerView: 1 }, // En móviles, 1 feature por slide
          768: { slidesPerView: 1 }, // En tablets, 2 features por slide
          1024: { slidesPerView: 1 }, // En desktops, 3 features por slide
        }}
        navigation
        pagination={{ clickable: true }}
        className="pb-8"
      >
        {features.map((item) => (
          <SwiperSlide key={item.detail.id}>
            <div className="relative fotos_servicios md:min-h-[28rem] mb-10 shadow-md rounded-lg p-4 flex flex-col items-center text-center" style={{ backgroundImage: `url(${item.detail.image_url}.jpg)` }}>
              <div className="bg-black bg-opacity-50 absolute top-0 bottom-0 left-0 max-w-[21] w-1/3 p-3">
              <h3 className="text-xs md:text-3xl text-background font-semibold ">{item.detail.name}</h3>
              <p className="text-background mt-2 text-xs md:text-base">{item.detail.description}</p>
              {item.quantity > 1 && (
                <h2 className="text-background">Contamos con una cantidad de {item.quantity} {item.detail.name}</h2>
              )}
              {(item.detail.name.toLowerCase().includes("piscina") || item.detail.name.toLowerCase().includes("gimnasio") || item.detail.name.toLowerCase().includes("spa") || item.detail.name.toLowerCase().includes("pool bar")) && (
                <h2 className="text-background mt-2">Horario: <span className="font-semibold">10:00 / 19:00</span></h2>
              )}
              {(item.detail.name.toLowerCase().includes("bares")) && (
                <h2 className="text-background mt-2">Horario: <span className="font-semibold">10:00 / 00:00</span></h2>
              )}
              {(item.detail.name.toLowerCase().includes("cancha") || item.detail.name.toLowerCase().includes("pista") || item.detail.name.toLowerCase().includes("golf")) && (
                <h2 className="text-background mt-2">Horario: <span className="font-semibold">10:00 / 18:00</span></h2>
              )}
              {(item.detail.name.toLowerCase().includes("restaurantes")) && (
                <>
                <h2 className="text-background mt-2 hidden md:block">Contamos con hasta tres tematicas diferentes:</h2>
                <div className="flex gap-3 justify-center align-baseline items-baseline">
                <h2 className="text-background text-center text-xs md:text-lg md:font-semibold md:uppercase mb-2 mt-2 ">Lunes: Cena Española </h2> <Flag code="ES" style={{ width: 25, height: 18 }} />
                </div>
                <div className="flex gap-3 justify-center text-xs align-baseline items-baseline">
                <h2 className="text-background  md:font-semibold md:text-lg md:uppercase mb-2">Miercoles: Cena Mexicana</h2> <Flag code="MX" style={{ width: 25, height: 18 }} />
                </div>
                <div className="flex gap-3 justify-center text-xs md:text-lg align-baseline items-baseline">
                <h2 className="text-background md:font-semibold md:uppercase">Viernes: Cena Japonesa</h2> <Flag code="JP" style={{ width: 25, height: 18 }} />
                </div>
                <h2 className="text-background mt-2 text-xs md:text-lg">Horario: <span className="font-semibold">19:00 / 22:00</span></h2>
                </>
              )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    </>);
};

export default HotelFeaturesSlider;
