/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./viewer/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "blue": "#4D6688",
      },
      fontFamily:{
        font: ["Irish Grover", "system-ui"],
      }
    },
  },
  plugins: [],
}

