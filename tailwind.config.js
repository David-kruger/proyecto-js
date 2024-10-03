/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        'newyork': "url('../img/newyork.jpg')",
        'register': "url('../img/register.jpg')",
      },
      backgroundColor:({ theme }) => ({
        ...theme('colors'),
        'bg_color_primary': '#F8F8F8',
        'bg_color_secondary': '#E7E7E7',
        'bg_color_terciary': '#C8C8C8',
        'primary_color': '#F28B82',
        'success_color': '#46D678',
        'info_color': '#47AFFF',
        'warning_color': "#FFB356",
        'danger_color': '#FF609A',
      }),
      textColor: ({theme}) => ({
        ...theme('colors'),
        'primary_text': '#1F1F1F',
        'secondary_text': '#5F5F5F',
        'terciary_text': '#AEAEAE',
        'primary_text_white': '#F8F8F8',
        'secondary_text_white': '#E7E7E7',
        'terciary_text_white': '#C8C8C8',
      }),
      fontFamily: {
        Montserrat:['"Montserrat"'],
        Lora:['Lora'],
        Opensans: ['"Open Sans"']
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}