export const coverImageRandom = async () => {
    try {
        const acces_key = 'pxk0mLv70mVVaKrCjw-AlWvM8JZHYG53wxwnOSPZ2r8';
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${acces_key}&orientation=squarish&count=1&query=apartment,home`);
        const data = await response.json();
        return data[0].urls.regular; // Retorna la URL de la imagen

    } catch (error) {
        console.error('Error mostrado:', error);
        return './img/profile.jpg'; // URL de una imagen de reserva en caso de error
    }
};