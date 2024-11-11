import {checkUserLogged} from './general/checkUserLogged.js'

let validacionGridTable = true;
// variable para poder acceder a la lista de pisos en todas las funciones
let current_table = [];

// Filtro acordeon
const acordeon = document.querySelector('#fliters_acordion');
acordeon.addEventListener('click', ()=> {
    const item = document.querySelector('.acordion');
    item.classList.toggle('open');
    item.classList.toggle('close');
})

// toggle grid or table
const toggle = document.querySelector('#table_grid-toggle');
toggle.addEventListener('click', () => {
        const gridTemplate = document.querySelector('#grid_template');
    const tableTemplate = document.querySelector('#table_template');

    if (validacionGridTable) {
        validacionGridTable = false;
        gridTable();
        gridTemplate.classList.toggle('hidden');
        tableTemplate.classList.toggle('hidden');
        // console.log(validacionGridTable) 
    } else {
        validacionGridTable = true;
        fillTable();
        tableTemplate.classList.toggle('hidden');
        gridTemplate.classList.toggle('hidden');
        // console.log(validacionGridTable)
    } 
})

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
            '<td class="py-2 px-3 text-center">' + flat.streetNumber + '</td>' +
            '<td class="py-2 px-3 text-center">' + flat.ac + '</td>' +
            '<td class="py-2 px-3 text-center">' + flat.areaSize + '</td>' +
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
            
            tr.className = "border-y border-gray-300 rounded-2xl py-2";
            tbody.appendChild(tr)
        });
    } else {
        const tr = document.createElement('tr');
        tr.innerHTML =`<td class="text-center py-2" colspan="9"> No hay Pisos </td>`;
        tbody.appendChild(tr);
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
                if (city.toLowerCase() !== flat.city.toLowerCase()) {
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

        if (validacionGridTable) {
            fillTable(filteredFlats);
            // console.log('table')
        } else {
            gridTable(filteredFlats);
            // console.log('grid')  
        }  
    }

}

// Funcion para ordenar
const orderTable = (column) => {
    
    if (current_table && Array.isArray(current_table)) {
        
        const tableSorted = current_table.sort((a,b)=>{
          if (a[column].toLowerCase() > b[column].toLowerCase()) {
            return 1;
          } 
          if (a[column].toLowerCase() < b[column].toLowerCase()) {
            return -1;
          }
          return 0; 
        });
        
        if (validacionGridTable) {
            fillTable(tableSorted);
            // console.log('table')
        } else {
            gridTable(tableSorted);
            // console.log('grid')  
        }  
    
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

// Funcion para verificar los favoritos en cada user
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

const coverImageRandom = async () => {
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

// funcion para llenar el grid
const gridTable = async (flats = null) => {
    
    const gridBody = document.querySelector('#grid_components');
    
    // Vaciar la tabla para que no se sobreescriban los pisos cuando se filtre
    gridBody.innerHTML = '';

    // obtener la lista de elementos de flats almacenados en local storage
    // Si flats es null trae todos los pisos de local storage, si no es null recibio una lista de pisos filtrados
    if (flats == null) {
        flats = JSON.parse(localStorage.getItem('flats'));
    }

    current_table = flats;

    if (flats != null && Array.isArray(flats)) {
        for (const flat of flats) {
            // Llama a coverImageRandom y espera la URL de la imagen
            // const imageUrl = await coverImageRandom();

            const divCard = document.createElement('div');
            divCard.classList.add('flex', 'flex-col', 'max-w-80', 'relative');


            // <img src="${imageUrl}" class="rounded-xl object-cover">

            divCard.innerHTML = `
                <picture class="aspect-[4/3]">
                    <img src="" class="rounded-xl object-cover">
                </picture>
                <div class="flex gap-1">
                    <h2 class="font-Lora text-base text-primary_text">${flat.city},</h2>
                    <h2 class="font-Lora text-base text-primary_text">${flat.streetName}</h2>
                </div>
                <div class="flex flex-col">
                    <h3 class="font-Opensans text-secondary_text text-sm">${flat.areaSize} m2</h3>
                    <h3 class="font-Opensans text-secondary_text text-sm">Available ${flat.dateAvailable}</h3>
                </div>
                <div class="flex justify-between">
                    <span>${flat.ac === 'yes' ? '<i class="fa-solid fa-temperature-low fa-lg" style="color: #F28B82;"></i>' : ''}</span>
                    <span class="font-Lora text-base text-primary_text">$${flat.rentPrice}</span>
                </div>`;

            const divAbsolute = document.createElement('div');
            divAbsolute.className = 'absolute top-2 right-2';

            const button = document.createElement('button');
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1" stroke="white" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>`;

            button.onclick = (event) => AddFavorite(event, flat.id);
            button.classList.add(checkFlatFavorite(flat.id) ? 'fill-[#EFB810]' : 'fill-[#FFFFFF]');

            divAbsolute.appendChild(button);
            divCard.appendChild(divAbsolute);

            gridBody.appendChild(divCard);
        }
    } else {
        const div = document.createElement('div');
        div.className= 'mx-auto'
        div.textContent= 'No hay pisos'
        gridBody.appendChild(div);
    }
}

// Ejecuta las funciones al momento que cargue la pagina
document.addEventListener('DOMContentLoaded',()=>{
    checkUserLogged();
    fillTable();
})