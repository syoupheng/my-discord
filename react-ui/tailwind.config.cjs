/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        primary: "#36393f",
        secondary: "#b7babd",
        "secondary-light": "#dddedf",
        dark: "#1f2123",
        white: "#ffffff",
        red: "#ef4444",
        danger: "#f38688",
        blue: "#5966f3",
        "blue-hov": "#4153af",
        link: "#00aff5",
      },
      keyframes: {
        drop: {
          "0%": { transform: "translateY(-15%)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
      },
      animation: {
        drop: "drop 0.4s ease-out 1",
      },
    },
  },
  plugins: [],
};
