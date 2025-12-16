/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--text-primary)",
        gold: {
          DEFAULT: "var(--primary-gold)",
          glow: "var(--primary-gold-glow)",
        },
        amber: "var(--accent-amber)",
        orange: "var(--accent-orange)",
        success: "var(--success)",
        error: "var(--error)",
        glass: {
          DEFAULT: "var(--surface-glass)",
          hover: "var(--surface-glass-hover)",
        },
        border: {
          glass: "var(--border-glass)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
        },
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        sans: ["DM Sans", "sans-serif"],
        accent: ["Bebas Neue", "sans-serif"],
      },
      borderRadius: {
        lg: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        glow: "0 0 30px var(--primary-gold-glow)",
        "glow-lg": "0 0 40px var(--primary-gold-glow), 0 0 60px rgba(244, 166, 35, 0.2)",
      },
      backdropBlur: {
        xs: "4px",
        xl: "20px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px var(--primary-gold-glow)" },
          "50%": { boxShadow: "0 0 40px var(--primary-gold-glow), 0 0 60px rgba(244, 166, 35, 0.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "fade-in": "fade-in 0.4s ease-out forwards",
        "scale-in": "scale-in 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
      },
      backgroundImage: {
        "gradient-gold": "linear-gradient(135deg, var(--primary-gold) 0%, var(--accent-orange) 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-warm": "linear-gradient(to bottom right, #0a0a0a, #1a0f00, #0a0a0a)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export {};
