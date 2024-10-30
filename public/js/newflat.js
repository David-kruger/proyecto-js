// Importar clases de Flat
import {Flat} from "./classes/classes.js";

const newFlatForm = (event) =>{
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;

    // obtener la hora exacta al momento que se crea un flat y con ese valor asignarle un id unico
    const date = new Date();
    
    // crear un objeto de la clase newFlat
    const newFlat = new Flat (
        date.getTime(),
        form.elements['city'].value,
        form.elements['street_name'].value,
        form.elements['street_number'].value,
        form.elements['area_size'].value,
        form.elements['has_ac'].value,
        form.elements['year_built'].value,
        form.elements['rent_price'].value,
        form.elements['date_available'].value,
    );
    // console.log(newFlat);

    // obtener los pisos guardados en local storage flats type array
    const flats = JSON.parse(localStorage.getItem('flats'));

    if (flats === null) {
        const arrayFlat = [newFlat];
        localStorage.setItem('flats', JSON.stringify(arrayFlat));
    } else {
        flats.push(newFlat);
        localStorage.setItem('flats',JSON.stringify(flats));
        // window.location.href = 'newFlat.html';
    }
    console.log('flats:' , flats);
}

// Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
document.getElementById('form_newflat').addEventListener('submit', newFlatForm);