import type { AchievementId } from '../types'

export const ACHIEVEMENTS: AchievementId[] = [
  'first-boot',
  'found-pythonix',
  'used-terminal',
  'changed-wallpaper',
  'opened-everything',
]

export const ACHIEVEMENT_LABELS: Record<AchievementId, string> = {
  'first-boot': '🏆 First Boot',
  'found-pythonix': '🏆 Found Pythonix',
  'used-terminal': '🏆 Used Terminal',
  'changed-wallpaper': '🏆 Changed Wallpaper',
  'opened-everything': '🏆 Opened Every App',
}
