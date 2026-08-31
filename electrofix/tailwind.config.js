/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
      extend: {
          colors: {
              primary: {
                  DEFAULT: '#2563eb', // blue-600
                  hover: '#1d4ed8',   // blue-700
              },
              secondary: {
                  DEFAULT: '#0f172a', // slate-900
              },
              background: '#f8fafc',  // slate-50
          },
          borderRadius: {
              "DEFAULT": "0.25rem",
              "lg": "0.5rem",
              "xl": "0.75rem",
              "2xl": "1rem",
              "full": "9999px"
          },
          fontFamily: {
              "body-md": ["Inter", "sans-serif"],
              "sans": ["Inter", "sans-serif"]
          }
      },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
