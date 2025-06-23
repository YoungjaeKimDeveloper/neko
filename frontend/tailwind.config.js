import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Colors
      colors: {
        primary: "#bdb2ff",
        hintText: "#d1d5db",
      },
      // Font family
      fontFamily: {
        title: ["Pacifico"],
        content: ["Monomaniac One"],
        banner: ["Handlee"],
      },
      // Border Radius
      borderRadius: { card: "20px" },
      margin: {
        navBottom: "1rem",
      },
    },
  },
  plugins: [daisyui],
};
