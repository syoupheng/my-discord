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
        muted: "#a2a5a9",
        "input-border": "hsl(0 0% 0% / 0.3)",
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
        "tooltip-up": {
          "0%": {
            transform: "scale(1) translateX(-50%) translateY(-100%)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1.07) translateX(-50%) translateY(-100%)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(1) translateX(-50%) translateY(-100%)",
            opacity: 1,
          },
        },
        "tooltip-down": {
          "0%": {
            transform: "scale(1) translateX(-50%)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1.07) translateX(-50%)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(1) translateX(-50%)",
            opacity: 1,
          },
        },
        "tooltip-left": {
          "0%": {
            transform: "scale(1) translateY(-50%) translateX(-100%)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1.07) translateY(-50%) translateX(-100%)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(1) translateY(-50%) translateX(-100%)",
            opacity: 1,
          },
        },
        "tooltip-right": {
          "0%": {
            transform: "scale(1) translateY(-50%)",
            opacity: 0,
          },
          "50%": {
            transform: "scale(1.07) translateY(-50%)",
            opacity: 0.5,
          },
          "100%": {
            transform: "scale(1) translateY(-50%)",
            opacity: 1,
          },
        },
        "spin-45": {
          "0%": { transform: "rotate(45deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        drop: "drop 0.4s ease-out 1",
        "alt-spin": "alt-spin 0.4s ease-in-out -0.2s infinite alternate",
        "tooltip-up": "tooltip-up 0.2s ease-in-out",
        "tooltip-down": "tooltip-down 0.2s ease-in-out",
        "tooltip-right": "tooltip-right 0.2s ease-in-out",
        "tooltip-left": "tooltip-left 0.2s ease-in-out",
        "spin-45": "spin-45 0.1s linear",
      },
    },
  },
  plugins: [],
};
