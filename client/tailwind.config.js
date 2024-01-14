/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(180, 29%, 50%)",
        background: "hsl(180, 52%, 96%)",
        lightGreen: "hsl(180, 31%, 95%)",
        darkGreen: "hsl(180, 8%, 52%)",
        darkerGreen: "hsl(180, 14%, 20%)",
      },
    },
  },
  plugins: [],
};
