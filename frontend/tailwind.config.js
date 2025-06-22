import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors
      colors: {
        primary: "#bdb2ff",
      },
      // Font family
      fontFamily: {
        title: ["Pacifico"],
        content: ["Monomaniac One"],
      },
      // Border Radius
      borderRadius: { card: "20px" },
    },
  },
  plugins: [daisyui],
};
