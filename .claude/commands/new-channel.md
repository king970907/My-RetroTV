Add a new TV channel to the RetroTV portfolio.

Channel name: $ARGUMENTS

Steps:
1. Create `src/components/tv/channels/<Name>Channel.tsx`
   - Named export: `<Name>Channel`
   - Renders the channel's content layout only — no CRT overlays, no canvas, no scanlines
   - Receives no props (data is static, embedded directly or imported from `src/data/`)

2. Create `src/components/tv/channels/<Name>Channel.module.css`
   - Use `--font-retro` for headings, `--color-crt-white` for body text
   - The accent colour should come from the channel's `color` field via a CSS custom property
     passed from `ChannelContent` as `style={{ '--accent': channel.color }}`

3. Add an entry to `src/data/channels.ts`:
   ```ts
   {
     id: <next_number>,
     name: '<NAME IN CAPS>',
     color: '<hex — pick from crt-green / crt-amber / 00cfff / ff6b6b>',
     component: <Name>Channel />,
   }
   ```

Constraints:
- `CRTScreen` owns all CRT effects — channel components must not add their own visual overlays
- Static data only — no fetch, no async
