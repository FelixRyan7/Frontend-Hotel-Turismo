/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent1: 'var(--accent-color-1)', // Amarillo naranja
        accent2: 'var(--accent-color-2)', // Naranja
        accent3: 'var(--accent-color-3)', // Amarillo dorado
        primary: 'var(--primary-color)', // Verde Aqua
        primaryDark: 'var(--primary-color-dark)', // Verde Aqua
        secondary: 'var(--secondary-color)', // Verde claro
        background: 'var(--background-color)',
        dark: 'var(--dark-charcoal)', // Blanco suave
      },
    },
  },
  plugins: [],
}

