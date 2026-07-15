import { useEffect, useRef, useState } from 'react'
import { musicTracks } from '../data/lore'
import { playClick } from '../lib/audio'
import { useOS } from '../contexts/OSContext'

function fmt(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Play a synth melody (Web Audio) — used when no real file is present. */
function playSynth(trackIndex: number, onEnd: () => void) {
  const track = musicTracks[trackIndex]
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
  const ac = new AC()
  const beat = 0.5
  let t = ac.currentTime + 0.05
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
  const id = window.setTimeout(() => { ac.close().catch(() => {}); onEnd() }, total + 100)
  return () => { window.clearTimeout(id); ac.close().catch(() => {}) }
}

export default function MediaPlayerApp() {
  const { audio } = useOS()
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1
  const [hasFile, setHasFile] = useState(true)
  const [realDur, setRealDur] = useState<number | null>(null)
  const audioEl = useRef<HTMLAudioElement | null>(null)
  const stopSynth = useRef<null | (() => void)>(null)
  const track = musicTracks[index]

  // (Re)load the current track's audio element when index or file availability changes.
  useEffect(() => {
    const el = new Audio(track.file ?? '')
    el.preload = 'auto'
    el.addEventListener('ended', () => { setPlaying(false); setProgress(1); setIndex((i) => (i + 1) % musicTracks.length); setPlaying(true) })
    el.addEventListener('timeupdate', () => setProgress(el.duration ? el.currentTime / el.duration : 0))
    el.addEventListener('loadedmetadata', () => setRealDur(el.duration || null))
    el.addEventListener('error', () => { setHasFile(false); setRealDur(null) })
    el.addEventListener('canplay', () => setHasFile(true))
    audioEl.current = el
    return () => { el.pause(); el.src = '' }
  }, [index, track.file])

  // Drive playback: real file if available, else synth.
  useEffect(() => {
    const el = audioEl.current
    if (!playing) {
      el?.pause()
      stopSynth.current?.()
      return
    }
    if (hasFile && el) {
      el.play().catch(() => setHasFile(false))
    } else {
      stopSynth.current = playSynth(index, () => { setPlaying(false); setProgress(1) })
    }
    return () => { el?.pause(); stopSynth.current?.() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, hasFile, index])

  const toggle = () => { playClick(audio.enabled); setPlaying((p) => !p) }
  const go = (dir: 1 | -1) => {
    setPlaying(false)
    setIndex((i) => (i + dir + musicTracks.length) % musicTracks.length)
    setProgress(0)
    setHasFile(true)
    setRealDur(null)
    setPlaying(true)
  }

  const now = progress * (realDur ?? track.duration)
  const total = realDur ?? track.duration

  return (
    <div className="flex h-full flex-col gap-3 bg-[#16162b] p-4 text-white">
      <div className="flex items-center gap-3">
        <span className="win-raised flex h-16 w-16 items-center justify-center bg-gradient-to-br from-[#38bdf8] to-[#ff5d8f] text-3xl">♪</span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold">{track.title}</p>
          <p className="text-xs text-[#9aa6ff]">{track.artist}</p>
        </div>
      </div>

      <div className="win-sunken h-2 w-full bg-black">
        <div className="h-full bg-[#38bdf8]" style={{ width: `${Math.min(100, progress * 100)}%` }} />
      </div>
      <p className="text-right text-[10px] text-[#9aa6ff]">{fmt(now)} / {fmt(total)}</p>

      <div className="flex items-center justify-center gap-4 text-2xl">
        <button className="win-btn px-3 py-1 text-base" onClick={() => { playClick(audio.enabled); go(-1) }}>⏮</button>
        <button className="win-btn px-4 py-1 text-base" onClick={toggle}>{playing ? '⏸' : '▶'}</button>
        <button className="win-btn px-3 py-1 text-base" onClick={() => { playClick(audio.enabled); go(1) }}>⏭</button>
      </div>

      <div className="win-sunken mt-1 min-h-0 flex-1 overflow-auto bg-black/40 p-2">
        <p className="px-1 text-[11px] font-bold text-[#9aa6ff]">PLAYLIST — WHAT I CODE TO</p>
        {musicTracks.map((t, i) => (
          <button
            key={t.id}
            onClick={() => { setPlaying(false); setIndex(i); setProgress(0); setHasFile(true); setRealDur(null); setPlaying(true); playClick(audio.enabled) }}
            className={`flex w-full items-center justify-between px-2 py-1 text-left text-sm ${i === index ? 'bg-[#38bdf8] text-black' : 'hover:bg-white/10'}`}
          >
            <span className="truncate">{t.title}</span>
            <span className="ml-2 shrink-0 text-[10px] opacity-70">{fmt(t.duration)}</span>
          </button>
        ))}
      </div>

      <p className="text-[10px] text-[#6b6b8a]">
        {hasFile
          ? `Now playing from /music/${track.id}.mp3 🎧`
          : `Drop "${track.id}.mp3" in public/music/ to hear the real track — playing a synth preview for now. 🎧`}
      </p>
    </div>
  )
}
