import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import {HeroUIProvider} from "@heroui/react";
import { AppRoutes} from '@/routes/Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <AppRoutes/>
    </HeroUIProvider>
  </StrictMode>,
)
