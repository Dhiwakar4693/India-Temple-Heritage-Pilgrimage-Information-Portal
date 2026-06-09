import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: { DEFAULT: '#7B1829', dark: '#5B1020', light: '#F9EEF0' },
        saffron: { DEFAULT: '#E8711A', dark: '#B85510', light: '#FDF2E9' },
        gold: { DEFAULT: '#C9941A', light: '#FEF9EE' },
        temple: { cream: '#FBF8F3', teal: '#0D6E6E', 'teal-light': '#E6F4F4' },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
