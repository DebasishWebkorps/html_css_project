/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        interonly: ["Inter"],
        inter: ["Inter", "sans-serif"],
        robotothin: ["Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}