# PixelOS — A Windows 95-style Pixel Portfolio OS

## Design Direction

PixelOS should feel like a believable Windows 95/98 machine from the late 1990s that happens to contain a developer's portfolio. The visual language is classic Windows UI: teal desktop, gray surfaces, navy gradient title bars, hard 2px bevels, pixel icons, dense layouts, and CRT scanlines.

Avoid: glassmorphism, gradients-as-decoration, neon cyberpunk, Apple minimalism, rounded cards, floating glass panels, and modern landing-page layouts.

## 1. Architecture

Two layers:

- **OS shell**: boot sequence, desktop, taskbar, Start menu, app registry, theme state, notifications, and window manager.
- **Apps**: About Me, Projects, Experience, Resume, Contact, Games, Terminal, Settings, File Explorer, and Browser are independent lazy-loaded modules. Future apps such as Crew, Task RPG, App Store, widgets, and more games can be added through the registry without rewriting the shell.

Large projects and games are launcher targets, not embedded features. Maze Runner and Pythonix are represented by metadata and play buttons only.

## 2. Folder structure

```txt
src/
  apps/             Lazy application modules and app registry
  components/       OS shell components: boot, desktop, taskbar, start menu, windows
  contexts/         OS-level app communication and shared state
  data/             Lightweight portfolio metadata
  hooks/            Clock, FPS, and OS utility hooks
  icons.tsx         Pixel-art SVG icon set
  types.ts          Shared app/window/theme contracts
```

## 3. App communication with the OS

Apps communicate through `OSContext`. The shell exposes: `openApp`, `closeWindow`, `minimizeWindow`, `maximizeWindow`, `focusWindow`, `updateWindow`, `theme`, and `setTheme`. Apps do not own the desktop or window manager.

## 4. Performance strategy

- Apps are registered with `React.lazy`, so modules are downloaded only when opened.
- Portfolio/project/game data is lightweight metadata.
- Tailwind CSS keeps styling local and avoids bulky UI dependencies.
- Developer stats run only when developer mode is enabled.
- Isolated app modules prevent future features from inflating the boot path.
