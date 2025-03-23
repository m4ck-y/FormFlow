import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './routes/AppRoutes'
import {HeroUIProvider} from "@heroui/react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./main.css";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider className='HEROUIPROVIDER'>
      <AppRoutes />
    </HeroUIProvider>
  </StrictMode>,
)
