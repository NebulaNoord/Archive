import { useOS } from '../contexts/OSContext'

/** Small pixel icons for the system tray. */
function VolumeIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" shapeRendering="crispEdges" aria-label="Volume" role="img">
      <rect x="2" y="6" width="2" height="4" fill="#000" />
      <rect x="5" y="4" width="2" height="8" fill="#000" />
      <rect x="8" y="2" width="2" height="12" fill="#000" />
      <rect x="11" y="5" width="1" height="6" fill="#000" />
      <rect x="13" y="3" width="1" height="10" fill="#000" />
    </svg>
  )
}

function NetworkIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" shapeRendering="crispEdges" aria-label="Network" role="img">
      <rect x="3" y="9" width="10" height="2" fill="#000080" />
      <rect x="5" y="6" width="6" height="2" fill="#1084d0" />
      <rect x="7" y="3" width="2" height="2" fill="#1b6ec2" />
      <rect x="6" y="12" width="4" height="2" fill="#000" />
    </svg>
  )
}

function DevIcon() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" shapeRendering="crispEdges" aria-label="Developer mode" role="img">
      <rect x="2" y="2" width="12" height="12" fill="#0a0a12" />
      <rect x="4" y="4" width="2" height="2" fill="#39ff7a" />
      <rect x="7" y="7" width="2" height="2" fill="#7fd1ff" />
      <rect x="10" y="10" width="2" height="2" fill="#ffd000" />
    </svg>
  )
}

export function TrayIcons() {
  const { theme } = useOS()
  return (
    <div className="flex items-center gap-1 border-l-2 border-[#808080] pl-1">
      {theme.developerMode && <DevIcon />}
      <NetworkIcon />
      <VolumeIcon />
    </div>
  )
}
