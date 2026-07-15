# Drop your music here

The Media Player plays real audio files from this folder. Name them exactly
(or edit `src/data/lore.ts` `musicTracks`):

- `swimming-pools.mp3`     → Kendrick Lamar — Swimming Pools (Drank)
- `champion.mp3`           → Kanye West — Champion  (no file yet → synth preview)
- `hood-gone-love-it.mp3`  → Jay Rock ft. Kendrick Lamar — Hood Gone Love It
- `noble.mp3`              → F3miii — NOBLE

If a file is missing, the player falls back to a short synth preview so the
jukebox still makes sound. Any MP3 here is loaded automatically.

IMPORTANT: these audio files are git-ignored (public/music/*.mp3) and must
NEVER be committed — they are local-only. Keep them out of the repo.
