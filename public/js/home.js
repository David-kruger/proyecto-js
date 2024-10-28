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
                '<td>' + flat.city + '</td>' +
                '<td>' + flat.streetName + '</td>' +
                '<td>' + flat.streetNumber + '</td>' +
                '<td>' + flat.ac + '</td>' +
                '<td>' + flat.areaSize + '</td>' +
                '<td>' + flat.rentPrice + '</td>' +
                '<td>' + flat.dateAvailable + '</td>'+ 
                '<td>' + flat.yearBuilt + '</td>'; 
                
                const tdAdd = document.createElement('td');
                const button = document.createElement('button');
                button.onclick = (event) => RemoveFavorite(event,flat.id);
                button.innerText = 'Remove';
                tdAdd.appendChild(button);
                tr.appendChild(tdAdd)
                
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