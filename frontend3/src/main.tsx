import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/index.css'
import Register from './modules/auth/register'
import {HeroUIProvider} from "@heroui/react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
    <Register />

    </HeroUIProvider>
  </StrictMode>,
)
