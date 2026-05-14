module.exports = {
  darkMode: "class", // 👈 IMPORTANT
  content: [
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};