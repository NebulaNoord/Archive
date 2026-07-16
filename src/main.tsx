import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import EditorialApp from './editorial/EditorialApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorialApp />
  </StrictMode>,
)
