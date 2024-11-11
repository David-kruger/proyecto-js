import{fillTable} from '../home.js'

// Funcion para remover favoritos
export const removeFavorite = (event,id) => {
    // llamar al usuario loggeado actualmente
    const usserLogged = JSON.parse(localStorage.getItem('currentUser'));
    
    Swal.fire({
        title: "Are you sure?",
        text: "Do you want to remove this flat",
        icon: "warning",
        iconColor: '#FFB356',
        background: '#F8F8F8',
        showCancelButton: true,
        confirmButtonColor: "#47AFFF",
        cancelButtonColor: "#f5005a",
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {
        
            if (!usserLogged) {
                alert('No estas registrado');
                return
            }

            const favoriteFlats = JSON.parse(localStorage.getItem('favorite_Flats'))

            const exist = favoriteFlats.findIndex((item)=>{
                return item.idFlat === id;
            });

            if (exist === -1) {
                alert('Piso no encontrado')
            } else {
                favoriteFlats.splice(exist,1);
                localStorage.setItem('favorite_Flats',JSON.stringify(favoriteFlats));
                fillTable();
            }

          Swal.fire({
            title: "Removed!",
            text: "Your flat has been removed.",
            icon: "success",
            iconColor: '#46D678',
            background: '#F8F8F8',
            confirmButtonColor: '#47AFFF'
          });
        }
      });

}