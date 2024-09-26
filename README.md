# proyecto-js
Proyecto interfaz de usuario para alquiler de pisos utilizando HTML, CSS Y JS

En esta rama los estilos se estatn trabajando mediante tailwind.
Para instalar tailwind primero en la terminal de Vscode de nuestro proyecto escribimos
  - npm init (Inicializar npm y crear el archivo de configuracion).
    Escribimos el nombre del proyecto, una descripcion y escribimos el nombre del archivo principal
  - Siguiendo la documentacion de tailwind (https://tailwindcss.com/docs/installation/using-postcss)
    En terminal ejecutamos npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
  - Creamos un archivo con el siguiente nombre postcss.config.js
    En este archivo agregamos lo siguiente:
    module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
      }
    }
  - Se crean los directorios public y src dentro de public (./style/tailwind.css) dentro de src (./css/main.css)
  - En el archivo de configuracion tailwind.config.js
    modificamos la direccion del archivo
    content: ["./public/**/*.{html,js}"],
  - En nuestro archivo main.css
    Agregamoslas directivas de tailwind 
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
  - En el archvivo package.json agregamos dentro de script, el comando para que cuando se realice un cambio en los estilos en nuestro archivo los ejecute inmediatamente
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "npx tailwindcss -i ./src/css/main.css -o ./public/style/tailwind.css --watch",
        "buid": "npx tailwindcss -i ./src/css/main.css -o ./public/style/tailwind-minify.css --minify"
      },
  - En nuestro teminal ejecutamos npm run dev
  - Agregar los plugins para formularios y para fuentes, utilizar los comandos 
    npm install -D @tailwindcss/typography
    npm install -D @tailwindcss/forms
    Y agregar en el archivo de configuracion tailwind.config.js
      plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
  - Agregar los estilos de colores y fuentes
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
