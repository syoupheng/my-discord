/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#36393f",
        secondary: "#2f3137",
        tertiary: "#1f2123",
        "h-secondary": "#b7babd",
        "secondary-alt": "#282a2e",
        "secondary-light": "#dddedf",
        "grey-hov": "#4d535b",
        white: "#ffffff",
        red: "#ef4444",
        danger: "#f38688",
        blue: "#5966f3",
        "blue-hov": "#4153af",
        link: "#00aff5",
        "grey-border": "hsl(217 8% 33% / 0.48)",
        "mod-hov": "hsl(217 8% 33% / 0.4)",
        "grey-selected": "hsl(217 8% 33% / 0.6)",
        positive: "#45c46d",
      },
      fontSize: {
        "btw-sm-xs": ["13px", "18px"],
        "btw-base-sm": ["15px", "22px"],
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-15%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        "alt-spin": {
          "0%": { transform: "rotate(90deg)" },
          "100%": { transform: "rotate(-90deg)" },
        },
      },
      animation: {
        drop: "drop 0.4s ease-out 1",
        "alt-spin": "alt-spin 0.4s ease-in-out -0.2s infinite alternate",
      },
    },
  },
  plugins: [],
};
