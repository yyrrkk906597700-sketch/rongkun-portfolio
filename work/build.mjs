import { copyFileSync, existsSync, linkSync, mkdirSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { build } from 'vite'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const publicRoot = join(projectRoot, 'public')
const outputRoot = join(projectRoot, 'dist')

function linkDirectory(source, destination) {
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const from = join(source, entry.name)
    const to = join(destination, entry.name)
    if (entry.isDirectory()) {
      mkdirSync(to, { recursive: true })
      linkDirectory(from, to)
    } else if (!existsSync(to)) {
      mkdirSync(dirname(to), { recursive: true })
      try {
        linkSync(from, to)
      } catch {
        copyFileSync(from, to)
      }
    }
  }
}

await build({
  configFile: false,
  root: projectRoot,
  base: './',
  plugins: [
    react(),
    {
      name: 'link-public-assets',
      closeBundle() {
        linkDirectory(publicRoot, outputRoot)
      },
    },
  ],
  publicDir: false,
  build: { outDir: 'dist' },
})
