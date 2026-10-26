import { defineShikiSetup } from '@slidev/types'

// Higher-contrast code themes than Slidev's default (vitesse), which put
// punctuation and several token colours under 4.5:1 in both schemes.
export default defineShikiSetup(() => ({
  themes: {
    light: 'github-light-high-contrast',
    dark: 'github-dark-default',
  },
}))
