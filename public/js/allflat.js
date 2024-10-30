// Filtro acordeon
const acordeon = document.querySelector('.acordion div');
acordeon.addEventListener('click', ()=> {
    const item = document.querySelector('.acordion');
    item.classList.toggle('open');
    item.classList.toggle('close');
})

// variable para poder acceder a la lista de pisos en todas las funciones
let current_table = [];

// funcion para llenar la tabla
const fillTable = (flats = null) => {
    
    // obtener el body de la tabla
    const tbody = document.querySelector('#flats_table tbody');

    // Vaciar la tabla para que no se sobreescriban los pisos cuando se filtre
    tbody.innerHTML = '';

    // obtener la lista de elementos de flats almacenados en local storage
    // Si flats es null trae todos los pisos de local storage, si no es null recibio una lista de pisos filtrados
    if (flats == null) {
        flats = JSON.parse(localStorage.getItem('flats'));
    }
    
    current_table = flats;
    
    //escribir en la tabla los elementos guardados en local storage
    if (flats != null && Array.isArray(flats)) {
        flats.forEach(flat => {
            const tr = document.createElement('tr');
            tr.innerHTML = 
            '<td class="py-2 px-3 text-left">' + flat.city +'</td>' +
            '<td class="py-2 px-3 text-left ">' + flat.streetName + '</td>' +
            '<td class="py-2 px-3 text-right">' + flat.streetNumber + '</td>' +
            '<td class="py-2 px-3 text-left">' + flat.ac + '</td>' +
            '<td class="py-2 px-3 text-right">' + flat.areaSize + '</td>' +
            '<td class="py-2 px-3 text-right">' + flat.rentPrice + '</td>' +
            '<td class="py-2 px-3 text-center">' + flat.dateAvailable + '</td>'+ 
            '<td class="py-2 px-3 text-center whitespace-nowrap">' + flat.yearBuilt + '</td>'; 
            
            const tdAdd = document.createElement('td');
            tdAdd.className = "py-2 px-3 text-center";

            const button = document.createElement('button');
            button.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">'+
                                '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />'+
                                '</svg>'
            button.onclick = (event) => AddFavorite(event,flat.id);
            button.classList.add(checkFlatFavorite(flat.id)?'fill-[#EFB810]':'fill-[#FFFFFF]'); 

            tdAdd.appendChild(button);
            tr.appendChild(tdAdd)
            
            tr.className = "border-y border-gray-300 py-2";
            tbody.appendChild(tr)
        });
    }
}

// Funcion para realizar los filtros 
const filterTable = (event) => {
    event.preventDefault();

    // llamar al formulario de filtro
    const form = event.target;

    // Obtener los valores de los inputs para el filtrado
    const city = form.elements['city'].value;
    let minPrice = form.elements['min-price'].value;
    const maxPrice = form.elements['max-price'].value; 
    let minArea = form.elements['min-area'].value; 
    const maxArea = form.elements['max-area'].value; 
    
    // Obtener el array de pisos guardados en localstorage
    const flats = JSON.parse(localStorage.getItem('flats'));

    // Filtros
    if (flats != null && Array.isArray(flats)) {
        const filteredFlats = flats.filter((flat)=>{
            
            // Filtro para ciudad si la ciudad no coincide con el input retorna un false
            if (city) {
                if (city !== flat.city) {
                    return false;
                }
            }

            // filtro por precio, si input minprice es vacio le asigna cero 
            if (!minPrice) {
                minPrice = 0;
            }

            // Filtro por precio si maxprice es vacio solo se toma la validacion del minimo
            if (maxPrice) {
                if (parseFloat(minPrice) > flat.rentPrice || parseFloat(maxPrice) <flat.rentPrice) {
                    return false;
                }
            } else {
                if (parseFloat(minPrice) > flat.rentPrice) {
                    return false;
                }
            }

            // Filtro por Area
            if (!minArea) {
                minArea = 0;
            }
            
            if (maxArea) {
                if (parseFloat(minArea) > flat.areaSize || parseFloat(maxArea) <flat.areaSize) {
                    return false;
                }
            } else {
                if (parseFloat(minArea) > flat.areaSize) {
                    return false;
                }
            }
            
            return true;
        });

        fillTable(filteredFlats);
    }

}

// Funcion para ordenar
const orderTable = (column) => {
    
    if (current_table && Array.isArray(current_table)) {
        
        const tableSorted = current_table.sort((a,b)=>{
          if (a[column] > b[column]) {
            return 1;
          } 
          if (a[column] < b[column]) {
            return -1;
          }
          return 0; 
        });
        fillTable(tableSorted);
    }
}

// Funcion para añadir favoritos
const AddFavorite = (event,id) => {

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

const checkFlatFavorite = (id) => {
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

// Ejecuta las funciones al momento que cargue la pagina
document.addEventListener('DOMContentLoaded',()=>{
    fillTable();
})
