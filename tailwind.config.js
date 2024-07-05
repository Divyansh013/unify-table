// tailwind.config.js

module.exports = {
  content: [
    './index.html',
    './components/header/header.hbs',
    './components/navbar/navbar.hbs',
    './components/sidebar/sidebar.hbs',
    './components/table/table.hbs',
  ],
  theme: {
    extend: {
      width: {
        'calc-4.6rem': 'calc(100% - 4.6rem)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], 
      },
      colors: {
        primary: '#101828',
        secondary: '#344054',
      },
      borderRadius: {
        '14px': '14px',
      },
      borderWidth:{
        '0.1': '0.1px',
      }
    },
  },
  plugins: [],
}
