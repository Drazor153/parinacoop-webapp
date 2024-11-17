import { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef8ee',
          100: '#fdf0d7',
          200: '#f9ddaf',
          300: '#f5c37c',
          400: '#f0a047',
          500: '#ec8523',
          600: '#dd6b19',
          700: '#b85216',
          800: '#92411a',
          900: '#763718',
          950: '#401a0a',
        },
        secondary: '#D9534F',
        'nav-color': '#F4F3F3',
        body: '#52677b'
      },
    },
  },
  plugins: [],
};

export default config;
