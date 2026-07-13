import type { CSSProperties } from 'react'

type IconProps = {
  size?: number
  style?: CSSProperties
}

const base = (size: number): CSSProperties => ({
  width: size,
  height: size,
  imageRendering: 'pixelated',
  display: 'block',
})

/* Pixel-art Windows-style icons, drawn as SVG rects so they stay crisp at any scale. */

export function PersonIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="1" width="14" height="14" fill="#c0c0c0" stroke="#000" />
      <rect x="6" y="3" width="4" height="4" fill="#f1c27d" stroke="#000" />
      <rect x="4" y="8" width="8" height="6" fill="#1084d0" stroke="#000" />
    </svg>
  )
}

export function MyComputerIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="2" y="2" width="12" height="9" fill="#c0c0c0" stroke="#000" />
      <rect x="3" y="3" width="10" height="7" fill="#1084d0" stroke="#000" />
      <rect x="5" y="4" width="6" height="4" fill="#dfdfdf" />
      <rect x="4" y="12" width="8" height="2" fill="#808080" stroke="#000" />
      <rect x="6" y="13" width="4" height="1" fill="#808080" />
    </svg>
  )
}

export function InfoIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="1" width="14" height="14" fill="#c0c0c0" stroke="#000" />
      <rect x="3" y="3" width="10" height="10" fill="#0000a8" />
      <rect x="7" y="4" width="2" height="2" fill="#fff" />
      <rect x="7" y="7" width="2" height="5" fill="#fff" />
    </svg>
  )
}

export function FolderIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="3" width="6" height="2" fill="#ffd000" stroke="#000" />
      <rect x="1" y="4" width="14" height="10" fill="#ffd000" stroke="#000" />
      <rect x="2" y="6" width="12" height="7" fill="#ffe45e" />
    </svg>
  )
}

export function GameIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="4" width="14" height="9" fill="#c0c0c0" stroke="#000" />
      <rect x="2" y="6" width="4" height="4" fill="#0000a8" />
      <rect x="10" y="6" width="4" height="4" fill="#0000a8" />
      <rect x="3" y="7" width="2" height="2" fill="#fff" />
      <rect x="11" y="7" width="2" height="2" fill="#fff" />
    </svg>
  )
}

export function TerminalIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="2" width="14" height="12" fill="#000" stroke="#c0c0c0" />
      <rect x="2" y="4" width="6" height="1" fill="#00a800" />
      <rect x="2" y="6" width="9" height="1" fill="#00a800" />
      <rect x="2" y="8" width="4" height="1" fill="#00a800" />
    </svg>
  )
}

export function GearIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="6" y="1" width="4" height="14" fill="#808080" stroke="#000" />
      <rect x="1" y="6" width="14" height="4" fill="#808080" stroke="#000" />
      <rect x="5" y="5" width="6" height="6" fill="#c0c0c0" stroke="#000" />
      <rect x="7" y="7" width="2" height="2" fill="#000" />
    </svg>
  )
}

export function DiskIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="2" y="2" width="12" height="12" fill="#000080" stroke="#000" />
      <rect x="4" y="2" width="6" height="5" fill="#fff" stroke="#000" />
      <rect x="5" y="3" width="4" height="3" fill="#808080" />
      <rect x="4" y="9" width="8" height="1" fill="#fff" />
      <rect x="4" y="11" width="8" height="1" fill="#fff" />
    </svg>
  )
}

export function FileIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="2" y="2" width="12" height="14" fill="#fff" stroke="#000" />
      <rect x="2" y="2" width="12" height="3" fill="#808080" />
      <rect x="4" y="7" width="8" height="1" fill="#000" />
      <rect x="4" y="9" width="8" height="1" fill="#000" />
      <rect x="4" y="11" width="6" height="1" fill="#000" />
    </svg>
  )
}

export function MailIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="3" width="14" height="10" fill="#fff" stroke="#000" />
      <rect x="1" y="3" width="14" height="5" fill="#c0c0c0" stroke="#000" />
      <rect x="1" y="3" width="7" height="5" fill="#dfdfdf" />
      <rect x="2" y="4" width="12" height="9" fill="none" stroke="#0000a8" />
    </svg>
  )
}

export function GlobeIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="1" width="14" height="14" fill="#1084d0" stroke="#000" />
      <rect x="1" y="1" width="14" height="3" fill="#00a800" stroke="#000" />
      <rect x="1" y="12" width="14" height="3" fill="#00a800" stroke="#000" />
      <rect x="7" y="1" width="2" height="14" fill="#dfdfdf" />
      <rect x="1" y="7" width="14" height="2" fill="#dfdfdf" />
    </svg>
  )
}

export function PhotoIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="2" width="14" height="12" fill="#fff" stroke="#000" />
      <rect x="2" y="3" width="12" height="8" fill="#1084d0" />
      <circle cx="5" cy="6" r="1.5" fill="#ffe45e" />
      <path d="M2 11 L6 7 L9 10 L11 8 L14 11 Z" fill="#3f9c63" />
      <rect x="2" y="12" width="12" height="2" fill="#c0c0c0" />
    </svg>
  )
}

export function TimelineIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="7" y="1" width="2" height="14" fill="#000080" />
      {[
        [4, 3],
        [10, 6],
        [4, 9],
        [10, 12],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="2" fill="#ffd000" stroke="#000" />
      ))}
    </svg>
  )
}

export function WorkspaceIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="1" y="2" width="14" height="10" fill="#1e1e1e" stroke="#000" />
      <rect x="2" y="3" width="4" height="8" fill="#2d2d2d" />
      <rect x="3" y="4" width="2" height="1" fill="#569cd6" />
      <rect x="3" y="6" width="2" height="1" fill="#4ec9b0" />
      <rect x="8" y="4" width="6" height="1" fill="#9cdcfe" />
      <rect x="8" y="6" width="5" height="1" fill="#dcdcaa" />
      <rect x="8" y="8" width="6" height="1" fill="#c586c0" />
      <rect x="3" y="13" width="10" height="1" fill="#808080" />
    </svg>
  )
}

export function RecycleIcon({ size = 32, style }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" style={{ ...base(size), ...style }} aria-hidden>
      <rect x="2" y="4" width="12" height="10" fill="#c0c0c0" stroke="#000" />
      <rect x="2" y="4" width="12" height="2" fill="#808080" />
      <path d="M5 8 L7 7 L6 10 Z" fill="#00a800" />
      <path d="M9 8 L11 9 L10 7 Z" fill="#00a800" />
      <path d="M7 11 L9 11 L8 9 Z" fill="#00a800" />
    </svg>
  )
}
