import React, { useState } from 'react';
import '../../styles/styles.css';

interface CarouselProps {
  photos: string[];
  isModal?: boolean; 
}

const RoomCarrusel: React.FC<CarouselProps> = ({ photos, isModal = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false); // Estado para gestionar el modo pantalla completa

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div>
      {/* Carrusel normal */}
      <div className={`carousel-container relative group`}>
        <div onClick={toggleFullscreen} className="cursor-pointer">
          <img
            src={`/imagenes/room_types/${photos[currentIndex]}.jpg`}
            alt={`Photo ${currentIndex + 1}`}
            className={`w-full ${isModal ? 'h-auto max-h-[70vh]' : ' h-64'} object-cover rounded-t-md`}
          />
        </div>
        <button
          type='button'
          onClick={prevImage}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-5xl p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity"
        >
          &#10094;
        </button>
        <button
        type='button'
          onClick={nextImage}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-5xl p-2 rounded-full md:opacity-0 group-hover:opacity-100 transition-opacity"
        >
          &#10095;
        </button>
      </div>

      {/* Modal en pantalla completa */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50">
          <div className="relative w-full h-full flex justify-center items-center">
            <img
              src={`/imagenes/room_types/${photos[currentIndex]}.jpg`}
              alt={`Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              type='button'
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-5xl p-3 rounded-full"
            >
              &#10094;
            </button>
            <button
              type='button'
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-5xl p-3 rounded-full"
            >
              &#10095;
            </button>
            <button
              type='button'
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCarrusel;

