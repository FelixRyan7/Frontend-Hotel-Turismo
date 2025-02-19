import React from 'react';
import Modal from 'react-modal';
import { RoomTypeDTO } from '../../@types/Hotel'; // Asegúrate de ajustar la ruta según tu estructura de proyecto
import { featureIcons } from '../../helpers/featureIcons'; // Ajusta la ruta según donde tengas los íconos
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import RoomCarrusel from '../carrusels/RoomCarrusel';
import '../../styles/styles.css'

type RoomDetailsModalProps = {
  selectedRoom: RoomTypeDTO | null;
  onClose: () => void;
};

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ selectedRoom, onClose }) => {
  if (!selectedRoom) return null; // No renderizar nada si no hay una habitación seleccionada
  

  return (
    <Modal
      
      isOpen={!!selectedRoom}
      onRequestClose={onClose}
      contentLabel="Detalles de la habitación"
      className="bg-white p-6 rounded shadow-lg md:w-3/4 mx-auto max-h-[85vh] overflow-y-auto relative"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >

        {/* Carrusel de imágenes */}
        {selectedRoom.photos.length > 0 && (
            <div className="mb-4">
              <RoomCarrusel photos={selectedRoom.photos} isModal={true}/>
            </div>
          )}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{selectedRoom.type}</h2>
      <p className="text-gray-600 mb-4">{selectedRoom.description}</p>
      <p className="text-gray-600 mb-4">{selectedRoom.squareMeters} metros cuadrados</p>
      <p className="text-gray-600 mb-4">Capacidad: {selectedRoom.capacity} persona(s)</p>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Características</h3>
      <div className='lg:grid lg:grid-cols-2 lg:gap-3'>
      <ul className="text-gray-600 grid grid-cols-2">
        {selectedRoom.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 ml-4 list-disc">
            <div className="text-primary">{featureIcons[feature]}</div>
            <span>{feature}</span>
          </li>
        ))}
        
      </ul>
        </div>
      
      <div className='flex justify-end'>
      <button
        onClick={onClose}
        className="py-2 px-5 mt-6 rounded bg-red-500 text-white"
      >
        <HighlightOffOutlinedIcon /> Cerrar
      </button>
      </div>
      

    </Modal>
  );
};

export default RoomDetailsModal;
