import type { BuildConfig } from 'bun'
import dts from 'bun-plugin-dts'
import 'colors'

const config: BuildConfig =
{
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  target: 'node',
  sourcemap: 'inline',
  plugins: [dts()],
}

const details = Object.entries(config)
  .filter((key) => key[0] !== 'plugins')
  .map(([key, value]) => `${key}:`.magenta + value).join('\n')
console.log('\n[INFO]'.blue, `Details\n${details}\n`)

console.log('[INFO]'.blue, 'Starting build...')
await Bun.build(config)

console.log('[DONE]'.green, 'Build complete')
