import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';
import { ParkingProvider } from './context/ParkingContext.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ParkingProvider>
                <App />
            </ParkingProvider>
        </BrowserRouter>
    </StrictMode>
);