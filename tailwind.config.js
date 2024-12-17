/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-background": "url('/src/assets/images/patch-7-1-crossroads-logo.jpg')"
      }
    },
  },
  plugins: [],
}

