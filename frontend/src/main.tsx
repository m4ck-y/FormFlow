import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ViewForm from './modules/forms/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewForm />
  </StrictMode>,
)
