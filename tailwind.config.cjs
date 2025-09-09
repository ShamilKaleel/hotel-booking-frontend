/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["lexend", "sans-serif"],
      },
      colors: {
        primary: "#cbf901",
        secondry: "#1C1C1C",
        third: "#191919",
        fourth: "#CAFF33",
        fifth: "#B3B3B3",
        "coral-red": "#CBF901",
        "slate-gray": "#6D6D6D",
        "pale-blue": "#F5F6FF",
        "white-400": "rgba(255, 255, 255, 0.80)",
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
