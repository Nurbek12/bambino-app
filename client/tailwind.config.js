/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  safelist: ["bg-blue-600", "bg-green-600", "bg-red-600", "bg-black"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          100: 'rgb(255 245 245 / 1)',
          200: 'rgb(255 227 227 / 1)',
          300: 'rgb(255 201 201 / 1)',
          400: 'rgb(255 168 168 / 1)',
          500: 'rgb(237 32 36 / 1)',
          600: 'rgb(208 27 29 / 1)',
          700: 'rgb(179 22 24 / 1)',
          800: 'rgb(153 16 20 / 1)',
          900: 'rgb(128 10 16 / 1)',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        'urbanlist': ['"Urbanist"', 'sans-serif'],
        'modernist': ['"5k-modernist"', 'sans-serif'],
        'modernist-mono': ['"5k-modernist-mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}

