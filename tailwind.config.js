/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./viewer/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "blue": "#4D6688",
        "maroon": "#BB0000",
        "gray": "#130000",
        "grayclarinho": "#6D6D6D",
        "blueclaro": "#7A8CA6",
        "cinza": "#3F3F3F"
      },
      fontFamily:{
        font: ["Irish Grover", "system-ui"],
        fontP: ["Poppins", "system-ui"],
      }
    },
  },
  plugins: [],
}

