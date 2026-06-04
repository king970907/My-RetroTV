Add a new portfolio project to the CD case carousel.

Project name: $ARGUMENTS

Steps:
1. Add an entry to `src/data/projects.ts`:
   ```ts
   {
     id: '<kebab-case-id>',
     title: '$ARGUMENTS',
     description: '<one sentence>',
     tech: ['<Tech1>', '<Tech2>'],
     url: '<project URL or "#" if not yet live>',
     thumbnail: '/thumbnails/<kebab-case-id>.webp',
   }
   ```

2. Place the thumbnail image at `public/thumbnails/<kebab-case-id>.webp`
   - Format: WebP
   - Max size: 400 × 400 px
   - If no image is available yet, set `thumbnail: undefined` in the data entry

Constraints:
- `id` must be unique across all entries in `projects.ts`
- `thumbnail` path must start with `/thumbnails/` (Vite serves `public/` at root)
- Do not add API calls or async logic — all project data is static
