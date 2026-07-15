import { useEffect, useState } from 'react'
import type { WallpaperId } from '../types'

export type Weather = { isNight: boolean; isRaining: boolean; isWinter: boolean }

/**
 * Live-ish dynamic desktop. Pulls current conditions for Alberta (Kayden's
 * location) from Open-Meteo (no API key, CORS-enabled) and derives:
 *   - night  -> desktop darkens (handled in Desktop)
 *   - rain   -> wallpaper swaps to a wet scene
 *   - winter -> snow wallpaper (Dec, or override)
 * Falls back gracefully if the fetch fails (offline / CSP), so the OS never
 * hard-depends on the network.
 */
export function useDynamicDesktop(seasonOverride: 'auto' | 'winter'): { weather: Weather | null; loading: boolean } {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const hour = new Date().getHours()
    const isDec = new Date().getMonth() === 11
    const base: Weather = {
      isNight: hour < 6 || hour >= 19,
      isRaining: false,
      isWinter: seasonOverride === 'winter' || isDec,
    }
    if (seasonOverride === 'winter') {
      setWeather(base)
      setLoading(false)
      return
    }
    fetch('https://api.open-meteo.com/v1/forecast?latitude=53.55&longitude=-113.49&current=weather_code,temperature_2m')
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return
        const code = d?.current?.weather_code ?? 0
        // WMO codes: rain/drizzle 51-67, 80-82, 95-99 thunder
        const isRaining = [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99].includes(code)
        setWeather({ ...base, isRaining })
      })
      .catch(() => {
        if (!cancelled) setWeather(base)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [seasonOverride])

  return { weather, loading }
}

/** Pick the wallpaper id from theme + live weather. */
export function resolveWallpaper(
  base: WallpaperId,
  weather: Weather | null,
  hour: number,
): WallpaperId {
  if (weather?.isWinter) return 'snow'
  if (weather?.isRaining) return 'alpine'
  if (weather?.isNight) return 'nightcity'
  if (hour >= 17 && hour < 20) return 'sunset'
  if (hour >= 8 && hour < 17) return 'studio'
  return base
}
