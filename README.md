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
