/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        valli: {
          ink: "#171714",
          bone: "#F4F0E7",
          clay: "#A75536",
          wine: "#6D2E29",
          sand: "#D8C7AA",
          stone: "#878177",
          white: "#FFFDF8",
        },
      },
      fontFamily: {
        display: ["var(--font-instrument)", "serif"],
        body: ["var(--font-manrope)", "sans-serif"],
        sans: ["var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "8px",
        md: "10px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};
