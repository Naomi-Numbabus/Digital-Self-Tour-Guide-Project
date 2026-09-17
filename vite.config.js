import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base only needs to be the repo subpath for the GitHub Pages build; the dev
// server keeps serving from root so `npm run dev` URLs don't change.
// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/Digital-Self-Tour-Guide-Project/' : '/',
}))
