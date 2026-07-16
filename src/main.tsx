import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import EditorialApp from './editorial/EditorialApp.tsx'
import pressStartWoff2 from '@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2?url'

// Preload the display font so there's no monospace-fallback flash on first paint.
const fontLink = document.createElement('link')
fontLink.rel = 'preload'
fontLink.as = 'font'
fontLink.type = 'font/woff2'
fontLink.href = pressStartWoff2
fontLink.crossOrigin = 'anonymous'
document.head.appendChild(fontLink)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EditorialApp />
  </StrictMode>,
)
