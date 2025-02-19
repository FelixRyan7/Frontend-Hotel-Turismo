
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router'

import Modal from 'react-modal';

Modal.setAppElement('#root');

createRoot(document.getElementById('root')!).render(
  
    <AppRouter />
  
)
