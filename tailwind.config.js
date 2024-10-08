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
      screens: {
        "xs": "400px",
        "sm": "560px",
        "md": "733px"
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: "nextui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {
        dividerWeight: "1px", // h-divider the default height applied to the divider component
        disabledOpacity: 0.5, // this value is applied as opacity-[value] when the component is disabled
        fontSize: {
          tiny: "0.75rem", // text-tiny
          small: "0.875rem", // text-small
          medium: "1rem", // text-medium
          large: "1.125rem", // text-large
        },
        lineHeight: {
          tiny: "1rem", // text-tiny
          small: "1.25rem", // text-small
          medium: "1.5rem", // text-medium
          large: "1.75rem", // text-large
        },
        radius: {
          small: "8px", // rounded-small
          medium: "12px", // rounded-medium
          large: "14px", // rounded-large
        },
        borderWidth: {
          small: "1px", // border-small
          medium: "2px", // border-medium (default)
          large: "3px", // border-large
        },
        hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
        boxShadow: {
          // shadow-small
          small:
            "0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
          // shadow-medium
          medium:
            "0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
          // shadow-large
          large:
            "0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)",
        },
      }, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: {
              300: "#FFFFFF",
              DEFAULT: "#F7F5F2"
            },
            primary: {
              300: "#f5dd87",
              DEFAULT: "#FEC705",
              foreground: "#292929"
            },
            secondary: {
              DEFAULT: "#2d67cc",
              foreground: "#F7F5F2"
            },
            danger: {
              DEFAULT: "#db3b3b",
              foreground: "#F7F5F2",
            }
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#4C4C4C",
            primary: {
              300: "#f5dd87",
              DEFAULT: "#FEC705",
              foreground: "#292929"
            },
            secondary: {
              300: "#3398E7",
              DEFAULT: "#2d67cc",
              foreground: "#F7F5F2"
            },
            danger: {
              DEFAULT: "#db3b3b",
              foreground: "#F7F5F2",
            }
          }, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}

