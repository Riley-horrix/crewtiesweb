const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pri: "#foe3d7",
        sec: "#e8e4d5",
        ter: "#8d8d8d",
        fcol: "#202020",
        accent: "#ffc700"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

