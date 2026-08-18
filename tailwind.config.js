/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0b1e33",
        dusk: "#123a5e",
        sun: "#f5a623",
        coral: "#e8452c",
        sand: "#f4ead9",
        magenta: "#e0218a",
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        vinyl: "0 10px 40px -10px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
