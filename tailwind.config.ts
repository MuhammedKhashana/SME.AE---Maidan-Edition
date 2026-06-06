import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink:     '#0a0807',
        ink2:    '#100c0a',
        red:     '#e62d22',
        reddeep: '#7d140d',
        green:   '#3ea83a',
        steel:   '#b9bdc4',
      },
      fontFamily: {
        display: ['var(--font-anton)', 'var(--font-reem)', 'sans-serif'],
        archivo: ['var(--font-archivo)', 'var(--font-tajawal)', 'sans-serif'],
        body:    ['var(--font-sora)', 'var(--font-tajawal)', 'sans-serif'],
      },
      fontWeight: {
        '800': '800',
        '900': '900',
      },
    },
  },
  plugins: [],
}
export default config
