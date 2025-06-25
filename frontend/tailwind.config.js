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
        warning: "#ef4444",
        icon: "#9CA3AF",
        hovered_icon: "#4B5563",
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
      boxShadow: {
        sidebar:
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [daisyui],
};
