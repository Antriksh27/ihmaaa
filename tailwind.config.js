/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ja: {
          header: '#0C426F',
          headerBorder: '#09355A',
          navBorder: '#1F537E',
          navActive: '#1B5280',
          navActiveBorder: '#E09B0F',
          dropdown: '#1B5280',
          dropdownBorder: '#2A6392',
          primary: '#205F93',
          primaryHover: '#184978',
          accent: '#E09B0F',
          accentHover: '#C78608',
          spotlight: '#0A3966',
          spotlightText: '#6991B7',
          spotlightTitle: '#D9DEE4',
          footer: '#083158',
          footerBorder: '#184978',
          footerText: '#3A658E',
          bodyBg: '#FFFFFF',
          sectionBg: '#F8FAFC',
          cardBorder: '#E2E8F0',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Arial', 'Helvetica', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
