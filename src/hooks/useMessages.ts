import { useState } from 'react';
import { Message } from '../@types/globales';



export const useMessages = () => {
  // Inicializa el estado 'messages' como un array vacío
  const [messages, setMessages] = useState<Message[]>([]);

  // Función para agregar un nuevo mensaje al estado 'messages'
  const addMessage = (text: string, style: Message['style']) => {
    // Genera un ID único utilizando la marca de tiempo actual (en milisegundos)
    const id = Date.now();
    
    // Crea un nuevo mensaje con el texto, estilo y un ID único
    const newMessage: Message = { id, text, style };
    
    // Actualiza el estado 'messages', agregando el nuevo mensaje al final del array
    setMessages((prev) => [...prev, newMessage]);

    // Después de 4 segundos, marca el mensaje para que desaparezca (fading)
    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, fading: true } : msg)) // Marca el mensaje como 'fading' (se está desvaneciendo)
      );

      // Después de un segundo (cuando el mensaje ya se está desvaneciendo), elimina el mensaje del estado
      setTimeout(() => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id)); // Elimina el mensaje del estado
      }, 1000); // Elimina el mensaje después de 1 segundo
    }, 4000); // Aplica el desvanecimiento 4 segundos después de agregar el mensaje
  };

  // Función para limpiar todos los mensajes del estado
  const clearMessages = () => setMessages([]); // Establece el estado 'messages' como un array vacío

  // Devuelve el estado 'messages', junto con las funciones 'addMessage' y 'clearMessages' para su uso fuera del hook
  return { messages, addMessage, clearMessages };
};