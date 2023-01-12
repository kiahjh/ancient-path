/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: `500px`,
      sm: `640px`,
      md: `768px`,
      "md-lg": `900px`,
      lg: `1024px`,
      'lg+': `1152px`,
      xl: `1280px`,
      '2xl': `1600px`,
    },
    extend: {
      fontFamily: {
        inter: [`Inter`],
        'reem-kufi': [`Reem Kufi`],
        lato: [`lato`],
      },
      spacing: {
        112: `28rem`,
        128: `32rem`,
        152: `38rem`,
        176: `44rem`,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
