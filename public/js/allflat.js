import {checkUserLogged} from './general/checkUserLogged.js'
import {AddFavorite, checkFlatFavorite} from './allFlats/favorites.js'
import {coverImageRandom} from './allFlats/coverImage.js'
import {acordeon} from './allFlats/acordeonGridView.js'

export let validacionGridTable = true;
// variable para poder acceder a la lista de pisos en todas las funciones
let current_table = [];

// Filtro acordeon
document.querySelector('#fliters_acordion').addEventListener('click', acordeon)
    
// toggle grid or table
const toggleGridTable = () => {
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
}
document.querySelector('#table_grid-toggle').addEventListener('click', toggleGridTable)

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
    if (column == 'city' ) {
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
    } else {
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
            
            if (validacionGridTable) {
                fillTable(tableSorted);
                // console.log('table')
            } else {
                gridTable(tableSorted);
                // console.log('grid')  
            }  
        }
    }


}

// Ejecuta las funciones al momento que cargue la pagina
document.addEventListener('DOMContentLoaded',()=>{
    checkUserLogged();
    
    // evento para el formulario de filtros
    document.getElementById('filter_form').addEventListener('submit',filterTable);
    // evento para los botones de ordenamiento
    document.querySelectorAll('.city').forEach(element => {
        element.addEventListener('click', () => orderTable('city'));
    });
    
    document.querySelectorAll('.area_size').forEach(element => {
        element.addEventListener('click', () => orderTable('areaSize'));
    });
    
    document.querySelectorAll('.rent_price').forEach(element => {
        element.addEventListener('click', () => orderTable('rentPrice'));
    });

    fillTable();
})