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
        "btn-danger": "#d83b3e",
        "btn-danger-hov": "#9f2d2f",
        "channels-default": "#96989c",
        "primary-dark-400": "#72767e",
        "primary-dark-500": "rgba(79, 84, 92, 0.4)",
        "primary-dark-550": "rgb(79, 84, 92)",
        "primary-dark-560": "#3f434a",
        "brand-260": "#cbcffb",
        "mention-bg": "hsl(235 86% 65% / 0.3)",
        "message-hov": "rgba(4, 4, 5, 0.07)",
        "background-modifier-accent": "rgba(79, 84, 92, 0.48)",
        "yellow-mentioned": "rgba(250, 166, 26, 0.1)",
        "yellow-mentioned-hov": "rgba(250, 166, 26, 0.07)",
        "status-yellow-500": "hsl(38 96% 54%)",
        "message-highlight": "rgba(146, 154, 247, 0.08)",
        "message-highlight-hov": "rgba(146, 154, 247, 0.06)",
        "status-green": "#3ba55d",
        "red-divider": "#f24043",
      },
      fontSize: {
        "btw-sm-xs": ["13px", "18px"],
        "btw-base-sm": ["15px", "22px"],
        xxs: ["11px", "17px"],
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        "my-pulse": {
          "0%, 100%": { opacity: 0.2 },
          "50%": { opacity: 0.5 },
        },
        clicked: {
          "0%, 100%": { "padding-top": "0" },
          "50%": { "padding-top": "2px" },
        },
      },
      animation: {
        drop: "drop 0.3s ease-out",
        "alt-spin": "alt-spin 0.4s ease-in-out -0.2s infinite alternate",
        "tooltip-up": "tooltip-up 0.15s ease-in-out",
        "tooltip-down": "tooltip-down 0.15s ease-in-out",
        "tooltip-right": "tooltip-right 0.15s ease-in-out",
        "tooltip-left": "tooltip-left 0.15s ease-in-out",
        "spin-45": "spin-45 0.1s linear",
        "fade-in": "fade-in 0.1s ease-out",
        "fade-in-slow": "fade-in 0.3s ease-in-out",
        "slide-in": "slide-in 0.5s ease-in-out",
        "my-pulse": "my-pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        clicked: "clicked 0.1s ease-in-out",
      },
      backgroundImage: {
        emojiFaces: "url(/emoji-faces.png)",
      },
      fontFamily: {
        code: ["Consolas", "Lucide Console", "Monaco", "Courier", "monospace"],
      },
    },
  },
  plugins: [],
};
