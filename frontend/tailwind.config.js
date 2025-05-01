// Minimal Tailwind CSS config for classic dark/light mode
module.exports = {
  darkMode: 'class', // Enables dark mode via .dark class
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
