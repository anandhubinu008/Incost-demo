module.exports = {
  darkMode: "class", // ✅ REQUIRED
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { extend: {} },
  plugins: [require("tailwindcss-animate")],
}
