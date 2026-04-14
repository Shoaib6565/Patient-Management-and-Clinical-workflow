/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],

  // 
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1565c0",
          secondary: "#1976d2",
          accent: "#1e88e5",
          neutral: "#374151",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
