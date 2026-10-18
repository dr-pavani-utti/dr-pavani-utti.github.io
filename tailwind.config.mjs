/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        // Navy of the surgical scrubs, sky of the theatre cap, medal gold.
        ink: { DEFAULT: '#0b1f3a', soft: '#23395b' },
        cream: '#f7f5f0',
        sky: { cap: '#8ecdf2' },
        gold: { DEFAULT: '#c8a24a', soft: '#f4e7c3' },
      },
    },
  },
  plugins: [],
};
