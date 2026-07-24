import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json' with { type: 'json' }

export default defineManifest({
  manifest_version: 3,
  version: packageJson.version,
  name: 'Coin: Always be up to date',
  description: 'Monitoring the quotes of the main currencies in the world.',
  author: {
    email: 'mouraggui@gmail.com',
  },
  action: {
    default_popup: 'src/popup/index.html',
    default_icon: {
      '16': 'icons/icon-16.png',
      '32': 'icons/icon-32.png',
      '48': 'icons/icon-48.png',
      '128': 'icons/icon-128.png',
    },
  },
  icons: {
    '16': 'icons/icon-16.png',
    '32': 'icons/icon-32.png',
    '48': 'icons/icon-48.png',
    '128': 'icons/icon-128.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
    type: 'module',
  },
  permissions: ['storage'],
  host_permissions: ['https://economia.awesomeapi.com.br/*'],
})
