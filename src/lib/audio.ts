let ctx: AudioContext | null = null
let ambientTimer: number | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  return ctx
}

function blip(freq: number, duration: number, type: OscillatorType = 'square', gain = 0.04) {
  const ac = getCtx()
  if (!ac) return
  if (ac.state === 'suspended') void ac.resume()
  const osc = ac.createOscillator()
  const env = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  env.gain.setValueAtTime(0.0001, ac.currentTime)
  env.gain.exponentialRampToValueAtTime(gain, ac.currentTime + 0.01)
  env.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration)
  osc.connect(env).connect(ac.destination)
  osc.start()
  osc.stop(ac.currentTime + duration + 0.02)
}

/** Use only after a user gesture (autoplay policy). */
export function playBoot() {
  blip(523.25, 0.12, 'square', 0.05)
  window.setTimeout(() => blip(659.25, 0.12, 'square', 0.05), 130)
  window.setTimeout(() => blip(783.99, 0.2, 'square', 0.05), 260)
}

export function playUiBlip(enabled: boolean) {
  if (!enabled) return
  blip(440, 0.05, 'square', 0.03)
}

export function startAmbient() {
  if (ambientTimer != null) return
  const chord = [196, 261.63, 329.63]
  const tick = () => {
    const ac = getCtx()
    if (!ac || ac.state !== 'running') return
    chord.forEach((f, i) => blip(f, 1.1, 'sine', 0.012 + i * 0.002))
  }
  tick()
  ambientTimer = window.setInterval(tick, 2600)
}

export function stopAmbient() {
  if (ambientTimer != null) {
    window.clearInterval(ambientTimer)
    ambientTimer = null
  }
}
