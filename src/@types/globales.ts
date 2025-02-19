// type para los mensajes
export type Message = {
  id: number;
  text: string;
  style: 'success' | 'error' | 'info' | 'warning' | 'success-light' | 'error-light' | 'info-light' | 'warning-light';
  fading?: boolean;
};



