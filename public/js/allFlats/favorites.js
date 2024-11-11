// Funcion para añadir favoritos
export const AddFavorite = (event,id) => {

    // llamar al usuario loggeado actualmente
    const usserLogged = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!usserLogged) {
        alert('No estas registrado');
        return
    }

    // crear un objeto para guardar los pisos favoritos y a que usuario pertenecen
    const email = usserLogged.email;
    const favorite = {
        idFlat: id,
        emailUser: email
    }

    const favoriteFlats = JSON.parse(localStorage.getItem('favorite_Flats'))

    if (favoriteFlats == null) {
        const arrayFavorites = [favorite];
        localStorage.setItem('favorite_Flats',JSON.stringify(arrayFavorites));
    } else {
        const exist = favoriteFlats.findIndex((item)=>{
            return item.idFlat === id;
        });
        if (exist === -1) {
            favoriteFlats.push(favorite);
            event.target.classList.remove('fill-[#FFFFFF]');
            event.target.classList.add('fill-[#EFB810]');
        } else {
            favoriteFlats.splice(exist,1);
            event.target.classList.remove('fill-[#EFB810]');
            event.target.classList.add('fill-[#FFFFFF]');
        }

        localStorage.setItem('favorite_Flats',JSON.stringify(favoriteFlats));
    }
}

// Funcion para verificar los favoritos en cada user
export const checkFlatFavorite = (id) => {
    const usser_logged = JSON.parse(localStorage.getItem('currentUser'));
    const email = usser_logged.email;

    const flats_favorites = JSON.parse(localStorage.getItem('favorite_Flats'));

    if (flats_favorites !== null) {
        const exist = flats_favorites.findIndex((item)=>{
            return item.emailUser === email && item.idFlat === id
        });
        if (exist !== -1) {
            return true;
        }

    }
    return false;
}