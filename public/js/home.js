const fillTable = () => 
    {
    const favoriteFlats = JSON.parse(localStorage.getItem('favorite_Flats'));
    const flats = JSON.parse(localStorage.getItem('flats'));
    
    const userLogged = JSON.parse(localStorage.getItem('currentUser'));

    const tbody = document.querySelector('#flats_table tbody');

    tbody.innerHTML = '';

    if (favoriteFlats && Array.isArray(favoriteFlats)) {
        
        const filtered = favoriteFlats.filter((item)=> {
            return item.emailUser === userLogged.email
        });
        
        const flatsTable = filtered.map((item)=>{
            const id = item.idFlat;
            return flats.find((flat)=>{
                return flat.id === id;
            });
        });

        if (flatsTable != null && Array.isArray(flatsTable)) {
            flatsTable.forEach(flat => {
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
                button.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 fill-[#EFB810]">'+
                                    '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />'+
                                    '</svg>'

                button.onclick = (event) => RemoveFavorite(event,flat.id);

                // button.innerText = 'Remove';
                tdAdd.appendChild(button);
                tr.appendChild(tdAdd)
                
                tr.className = "border-y border-gray-300 py-2";
                tbody.appendChild(tr)
            });                   
        }

    }
}

// Funcion para añadir favoritos
const RemoveFavorite = (event,id) => {
    // llamar al usuario loggeado actualmente
    const usserLogged = JSON.parse(localStorage.getItem('currentUser'));
    
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

}

document.addEventListener('DOMContentLoaded',() => {
    const user_logged= JSON.parse(localStorage.getItem('currentUser'));
    if (user_logged == null) {
        window.location.href = 'index.html'
    }
    fillTable();
})