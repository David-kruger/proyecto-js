export const coverImageRandom = async () => {
    try {
        const acces_key = 'pxk0mLv70mVVaKrCjw-AlWvM8JZHYG53wxwnOSPZ2r8'
        
        const response = await fetch (`https://api.unsplash.com/photos/random?client_id=${acces_key}&orientation=landscape&count=1&query=city`);
        const data = await response.json();
        
        const img = document.querySelector('#img-portland img')
        img.src = data[0].urls.regular;
    }
    catch (error) {
        console.error('Error mostrado:', error);
        const img = document.querySelector('#img-portland img')
        img.src = '';
    }
}

export const profileImageRandom = async () => {
    try {
        const response = await fetch (`https://randomuser.me/api/`);
        const data = await response.json();
        
        const img = document.querySelector('#img-perfil img')
        img.src = data.results[0].picture.large;
    
    }
    catch (error) {
        console.error('Error mostrado:', error);
        const img = document.querySelector('#img-perfil img')
        img.src = "./img/profile.jpg";
    }
}