let ctx: AudioContext | null = null

// NOTE: there is deliberately NO ambient auto-loop. Sounds only fire on real
// user actions (button clicks, window open/close, boot) so the OS never makes
// unexplained noises in the background.

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null
    ctx = new Ctor()
  }
  return ctx
}

function blip(freq: number, duration: number, type: OscillatorType = 'square', gain = 0.04, delay = 0) {
  const ac = getCtx()
  if (!ac) return
  if (ac.state === 'suspended') void ac.resume()
  const t0 = ac.currentTime + delay
  const osc = ac.createOscillator()
  const env = ac.createGain()
  osc.type = type
  osc.frequency.value = freq
  env.gain.setValueAtTime(0.0001, t0)
  env.gain.exponentialRampToValueAtTime(gain, t0 + 0.01)
  env.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(env).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.02)
}

/** All sounds are gated by the user's sound toggle. */
export function playClick(enabled: boolean) {
  if (!enabled) return
  blip(440, 0.05, 'square', 0.025)
}

export function playOpen(enabled: boolean) {
  if (!enabled) return
  blip(523.25, 0.09, 'square', 0.04)
  blip(659.25, 0.1, 'square', 0.04, 0.07)
}

export function playClose(enabled: boolean) {
  if (!enabled) return
  blip(392, 0.08, 'square', 0.035)
  blip(261.63, 0.1, 'square', 0.035, 0.06)
}

export function playMinimize(enabled: boolean) {
  if (!enabled) return
  blip(659.25, 0.07, 'sine', 0.03)
  blip(392, 0.08, 'sine', 0.03, 0.05)
}

export function playError(enabled: boolean) {
  if (!enabled) return
  blip(160, 0.18, 'sawtooth', 0.05)
}

export function playSuccess(enabled: boolean) {
  if (!enabled) return
  blip(523.25, 0.08, 'square', 0.04)
  blip(659.25, 0.08, 'square', 0.04, 0.08)
  blip(783.99, 0.14, 'square', 0.04, 0.16)
}

export function playBoot(enabled: boolean) {
  if (!enabled) return
  blip(523.25, 0.12, 'square', 0.05)
  blip(659.25, 0.12, 'square', 0.05, 0.13)
  blip(783.99, 0.22, 'square', 0.05, 0.26)
}

export function playType(enabled: boolean) {
  if (!enabled) return
  blip(1200 + Math.random() * 400, 0.02, 'square', 0.012)
}
