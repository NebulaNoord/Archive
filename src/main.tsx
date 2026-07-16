import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditorialApp from './editorial/EditorialApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorialApp />
  </StrictMode>,
)
