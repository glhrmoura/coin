import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const packagePath = fileURLToPath(new URL('../package.json', import.meta.url))
const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))

const [major, minor, patch] = pkg.version.split('.').map(Number)
const nextVersion = `${major}.${minor}.${patch + 1}`

pkg.version = nextVersion
writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`)

process.stdout.write(`${nextVersion}\n`)
