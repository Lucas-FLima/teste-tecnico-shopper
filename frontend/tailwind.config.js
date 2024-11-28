/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFFFFF",
        green_shooper: "#07A776",
        header: "#1E2044",
        dark_blue: "#060937",
      }
    },
  },
  plugins: [],
}

