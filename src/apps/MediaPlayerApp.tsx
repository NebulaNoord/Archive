import { useEffect, useRef, useState } from 'react'
import { musicTracks } from '../data/lore'
import { playClick } from '../lib/audio'
import { useOS } from '../contexts/OSContext'

/** Schedules a melody with Web Audio so tracks actually play (no audio files). */
function playMelody(trackIndex: number, onEnd: () => void) {
  const track = musicTracks[trackIndex]
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ac = new AC()
  const bpm = 4 // beats per second (driven by durations ~1 beat each)
  let t = ac.currentTime + 0.05
  const beat = 60 / (bpm * 2) // ~0.5s per listed beat
  const timers: number[] = []
  track.notes.forEach(([freq, beats]) => {
    const dur = beat * beats
    const osc = ac.createOscillator()
    const env = ac.createGain()
    osc.type = track.wave ?? 'triangle'
    osc.frequency.value = freq
    env.gain.setValueAtTime(0.0001, t)
    env.gain.exponentialRampToValueAtTime(0.06, t + 0.02)
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur)
    osc.connect(env).connect(ac.destination)
    osc.start(t)
    osc.stop(t + dur + 0.02)
    t += dur
  })
  const total = (t - ac.currentTime) * 1000
  const id = window.setTimeout(() => { ac.close(); onEnd() }, total + 100)
  timers.push(id)
  return () => { window.clearTimeout(id); try { ac.close() } catch { /* noop */ } }
}

export default function MediaPlayerApp() {
  const { audio } = useOS()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const stopRef = useRef<null | (() => void)>(null)
  const track = musicTracks[index]

  useEffect(() => {
    if (!playing) return
    setProgress(0)
    const started = Date.now()
    const iv = window.setInterval(() => {
      const p = Math.min(100, ((Date.now() - started) / (track.duration * 1000)) * 100)
      setProgress(p)
    }, 200)
    stopRef.current = playMelody(index, () => { setPlaying(false); setProgress(100) })
    return () => { window.clearInterval(iv); stopRef.current?.() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, index])

  const toggle = () => {
    playClick(audio.enabled)
    setPlaying((p) => !p)
  }
  const next = () => { stopRef.current?.(); setIndex((i) => (i + 1) % musicTracks.length); setPlaying(true) }
  const prev = () => { stopRef.current?.(); setIndex((i) => (i - 1 + musicTracks.length) % musicTracks.length); setPlaying(true) }

  return (
    <div className="flex h-full flex-col gap-3 bg-[#1b1b2e] p-4 text-white">
      <div className="flex items-center gap-3">
        <span className="win-raised flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#38bdf8] to-[#ff5d8f] text-3xl">♪</span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{track.title}</p>
          <p className="text-xs text-[#9aa6ff]">{track.artist} · chiptune</p>
        </div>
      </div>

      <div className="win-sunken h-2 w-full bg-black">
        <div className="h-full bg-[#38bdf8]" style={{ width: `${progress}%` }} />
      </div>
      <p className="text-right text-[10px] text-[#9aa6ff]">{Math.round((progress / 100) * track.duration)}s / {track.duration}s</p>

      <div className="flex items-center justify-center gap-4 text-2xl">
        <button className="win-btn px-3 py-1 text-base" onClick={() => { playClick(audio.enabled); prev() }}>⏮</button>
        <button className="win-btn px-4 py-1 text-base" onClick={toggle}>{playing ? '⏸' : '▶'}</button>
        <button className="win-btn px-3 py-1 text-base" onClick={() => { playClick(audio.enabled); next() }}>⏭</button>
      </div>

      <div className="win-sunken mt-2 min-h-0 flex-1 overflow-auto bg-black/40 p-2">
        <p className="px-1 text-[11px] font-bold text-[#9aa6ff]">PLAYLIST</p>
        {musicTracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { stopRef.current?.(); setIndex(i); setPlaying(true); playClick(audio.enabled) }}
            className={`flex w-full items-center justify-between px-2 py-1 text-left text-sm ${i === index ? 'bg-[#38bdf8] text-black' : 'hover:bg-white/10'}`}
          >
            <span>{t.title}</span>
            <span className="text-[10px] opacity-70">{t.duration}s</span>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-[#6b6b8a]">Synthesized in-browser — no files, no licensing. What I code to. 🎧</p>
    </div>
  )
}
