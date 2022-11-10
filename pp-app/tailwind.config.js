/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        darkGreen: '#0F6938',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
