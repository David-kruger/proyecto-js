/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
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
        'terciary_text': '#AEAEAE'
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