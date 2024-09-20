/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#023E8A",
        secondary: "#eef6ff",
        myGray: "#F1F4F9",
        danger: "#ff0000",
      },
    },
  },
  plugins: [],
};
