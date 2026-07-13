import type { CSSProperties, ReactElement } from 'react'

type PixelArtProps = {
  size?: number
  style?: CSSProperties
}

const base = (size: number, extra?: CSSProperties): CSSProperties => ({
  width: size,
  height: size * 0.75,
  imageRendering: 'pixelated',
  display: 'block',
  ...extra,
})

type SceneFn = (style: CSSProperties) => ReactElement

export function PixelAvatar({ size = 96, style }: PixelArtProps) {
  const px = (x: number, y: number, w: number, h: number, fill: string) => (
    <rect key={`${x}-${y}-${fill}`} x={x} y={y} width={w} height={h} fill={fill} />
  )
  return (
    <svg viewBox="0 0 32 24" style={base(size, style)} aria-label="Pixel avatar of Kayden" role="img">
      <rect x="0" y="0" width="32" height="24" fill="#101830" />
      <rect x="0" y="0" width="32" height="24" fill="none" stroke="#000" strokeWidth="1" />
      {px(7, 5, 18, 13, '#0c0c0c')}
      {px(8, 6, 16, 11, '#1b6ec2')}
      {px(9, 7, 14, 9, '#0a2d52')}
      {px(10, 8, 3, 1, '#7fd1ff')}
      {px(14, 10, 4, 1, '#7fd1ff')}
      {px(11, 12, 6, 1, '#39ff7a')}
      {px(14, 18, 4, 2, '#3a3a3a')}
      {px(12, 20, 8, 1, '#5a5a5a')}
      {px(13, 2, 6, 5, '#f1c27d')}
      {px(13, 4, 6, 1, '#000000')}
      {px(12, 1, 8, 2, '#3a2a1a')}
      {px(12, 3, 1, 2, '#3a2a1a')}
      {px(19, 3, 1, 2, '#3a2a1a')}
      {px(14, 3, 1, 1, '#102030')}
      {px(17, 3, 1, 1, '#102030')}
    </svg>
  )
}

const scene0: SceneFn = (style) => (
  <svg key="s0" viewBox="0 0 64 48" style={style} role="img" aria-label="Project preview">
    <rect width="64" height="48" fill="#0a0a12" />
    <rect x="2" y="2" width="60" height="44" fill="#16161f" stroke="#000" />
    <rect x="4" y="4" width="26" height="10" fill="#1b6ec2" />
    <rect x="4" y="16" width="12" height="28" fill="#2a2a38" />
    <rect x="18" y="16" width="42" height="6" fill="#39ff7a" />
    <rect x="18" y="24" width="30" height="4" fill="#3a3a4a" />
    <rect x="18" y="30" width="38" height="4" fill="#3a3a4a" />
    <rect x="18" y="36" width="20" height="6" fill="#ffd000" />
  </svg>
)

const scene1: SceneFn = (style) => (
  <svg key="s1" viewBox="0 0 64 48" style={style} role="img" aria-label="Project preview">
    <rect width="64" height="48" fill="#0c1410" />
    <rect x="2" y="2" width="60" height="44" fill="#10231a" stroke="#000" />
    {[28, 22, 30, 18, 32, 14, 26].map((h, i) => (
      <rect key={i} x={6 + i * 8} y={42 - h} width="6" height={h} fill={i % 2 ? '#39ff7a' : '#1b9e5a'} />
    ))}
    <rect x="4" y="4" width="40" height="6" fill="#39ff7a" />
  </svg>
)

const scene2: SceneFn = (style) => (
  <svg key="s2" viewBox="0 0 64 48" style={style} role="img" aria-label="Project preview">
    <rect width="64" height="48" fill="#008080" />
    <rect x="6" y="6" width="52" height="36" fill="#c0c0c0" stroke="#000" />
    <rect x="6" y="6" width="52" height="6" fill="#000080" />
    <rect x="10" y="8" width="14" height="2" fill="#fff" />
    <rect x="10" y="16" width="44" height="3" fill="#808080" />
    <rect x="10" y="22" width="36" height="3" fill="#808080" />
    <rect x="10" y="28" width="44" height="8" fill="#fff" stroke="#808080" />
  </svg>
)

const scene3: SceneFn = (style) => (
  <svg key="s3" viewBox="0 0 64 48" style={style} role="img" aria-label="Project preview">
    <rect width="64" height="48" fill="#0a0a12" />
    <rect x="2" y="2" width="60" height="44" fill="#111119" stroke="#000" />
    <rect x="5" y="6" width="18" height="2" fill="#ff7fd1" />
    <rect x="9" y="10" width="24" height="2" fill="#7fd1ff" />
    <rect x="9" y="14" width="14" height="2" fill="#39ff7a" />
    <rect x="5" y="18" width="22" height="2" fill="#ffd000" />
    <rect x="9" y="22" width="30" height="2" fill="#7fd1ff" />
  </svg>
)

const scene4: SceneFn = (style) => (
  <svg key="s4" viewBox="0 0 64 48" style={style} role="img" aria-label="Project preview">
    <rect width="64" height="48" fill="#101822" />
    <rect x="2" y="2" width="60" height="44" fill="#1c2733" stroke="#000" />
    <rect x="6" y="34" width="6" height="6" fill="#39ff7a" />
    <rect x="16" y="28" width="6" height="6" fill="#ffd000" />
    <rect x="26" y="22" width="6" height="6" fill="#ff7f7f" />
    <rect x="40" y="10" width="6" height="6" fill="#7fd1ff" />
    <rect x="50" y="6" width="3" height="3" fill="#fff" />
    <rect x="50" y="11" width="3" height="3" fill="#fff" />
    <rect x="54" y="8" width="3" height="3" fill="#fff" />
  </svg>
)

const scenes: SceneFn[] = [scene0, scene1, scene2, scene3, scene4]

export function PixelProjectShot({ variant = 0, size = 160, style }: PixelArtProps & { variant?: number }) {
  const merged = base(size, style)
  const Scene = scenes[variant % scenes.length]
  return Scene(merged)
}

export function PixelCartridge({ label = '??', size = 96, style }: PixelArtProps & { label?: string }) {
  return (
    <svg viewBox="0 0 32 24" style={base(size, style)} role="img" aria-label={`Cartridge ${label}`}>
      <rect x="0" y="0" width="32" height="24" fill="#101822" />
      <rect x="6" y="3" width="20" height="18" fill="#2b2b3a" stroke="#000" />
      <rect x="8" y="5" width="16" height="8" fill="#0c0c14" />
      <rect x="9" y="6" width="14" height="1" fill="#39ff7a" />
      <rect x="9" y="8" width="10" height="1" fill="#7fd1ff" />
      <rect x="9" y="10" width="12" height="1" fill="#ffd000" />
      <rect x="10" y="15" width="12" height="4" fill="#ffd000" />
      <rect x="12" y="16" width="8" height="2" fill="#000" />
    </svg>
  )
}
