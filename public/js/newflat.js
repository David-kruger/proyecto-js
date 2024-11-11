// Importar clases de Flat
import {Flat} from "./classes/classes.js";
import {checkUserLogged} from './general/checkUserLogged.js'
import { validateCity, validateNumber , validateYearBuilt , validateDate } from './newFlat/validations.js'
import {coverImageRandom} from './general/apiPortadaPerfil.js'

const newFlatForm = (event) =>{
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;

    const city = form.elements['city'].value; 
    const streetName = form.elements['street_name'].value;
    const streetNumber = form.elements['street_number'].value;
    const areaSize = form.elements['area_size'].value;
    const hasAc = form.elements['has_ac'].checked;
    const acYesno = hasAc ? 'yes' : 'no';
    const yearBuilt = form.elements['year_built'].value;
    const rentPrice = form.elements['rent_price'].value;
    const dateAvailable = form.elements['date_available'].value;

    if (!city && !streetName && !streetNumber && !areaSize && !yearBuilt && !rentPrice && dateAvailable) {
        // detener la funcion si los campos estan vacios
        return;
    }

    // validar inputs 
    const isCityValid = validateCity(city);
    const isStreetNumberValid = validateNumber(streetNumber,'streetNumber');
    const isAreaSizeValid = validateNumber(areaSize,'area')
    const isRentPriceValid = validateNumber(rentPrice,'rentPrice')
    const isYearBuilt = validateYearBuilt(yearBuilt)
    const isDateValid = validateDate(dateAvailable)

    console.log(city,streetName,streetNumber,areaSize,hasAc,yearBuilt,rentPrice,dateAvailable)

    // detener la funcion si alguno de los input sea erroneo
    if (!isCityValid || !isStreetNumberValid || !isAreaSizeValid || !isRentPriceValid || !isYearBuilt || !isDateValid) {
        // Detener la funcion si un campo es invalido
        return;
    }

    // obtener la hora exacta al momento que se crea un flat y con ese valor asignarle un id unico
    const date = new Date();
    
    // crear un objeto de la clase newFlat
    const newFlat = new Flat (
        date.getTime(),
        city,
        streetName,
        streetNumber,
        areaSize,
        acYesno,
        yearBuilt,
        rentPrice,
        dateAvailable,
    );

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

    Swal.fire({
        position: "center",
        icon: "success",
        title: "Flat Created",
        iconColor: '#46D678',
        background: '#F8F8F8',
        showConfirmButton: false,
        timer: 1500
      });
    form.reset();

}

document.addEventListener('DOMContentLoaded', ()=> {
    // Verificar usuario loggeado
    checkUserLogged();

    // imagen de portada
    // coverImageRandom();
    
    document.getElementById('form_newflat').addEventListener('submit', newFlatForm);

})