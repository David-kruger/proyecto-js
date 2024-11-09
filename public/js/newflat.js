// Importar clases de Flat
import {Flat} from "./classes/classes.js";

const expressions = {
	city: /^[A-Za-zÀ-ÿ]{2,}(?:\s[A-Za-zÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
    // password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/, 
}

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
        showConfirmButton: false,
        timer: 1500
      });
    form.reset();

}

const validateCity = (inputValueCity) =>{
    if (inputValueCity != '' && !expressions.city.test(inputValueCity)) {
        document.querySelector('#city_group p').classList.remove('hidden')
        return false;
    }
    document.querySelector('#city_group p').classList.add('hidden')
    return true;
}

const validateNumber = (inputValue, camp) => {
    const number = parseFloat(inputValue);
    if (inputValue!='' && number<0) {
        document.querySelector(`#${camp}_group p`).classList.remove('hidden')
        return false;
    }
    document.querySelector(`#${camp}_group p`).classList.add('hidden')
    return true;
}

const validateYearBuilt = (inputYear) => {
    if (inputYear != '') {
        const yearBuilt = new Date (inputYear);
        const today = new Date();

        if (yearBuilt > today) {
            document.querySelector('#yearBuilt_group p').classList.remove('hidden');
            return false;
        }
    }
    document.querySelector('#yearBuilt_group p').classList.add('hidden');
    
    return true;
}

const validateDate = (inputDate) => {
    if (inputDate != '') {
        const DateAvailable = new Date (inputDate);
        const today = new Date();

        if (DateAvailable < today) {
            document.querySelector('#date_group p').classList.remove('hidden');
            return false;
        }
    }
    document.querySelector('#date_group p').classList.add('hidden');
    
    return true;
}

const coverImageRandom = async () => {
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

document.addEventListener('DOMContentLoaded', ()=> {
    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    coverImageRandom();
    document.getElementById('form_newflat').addEventListener('submit', newFlatForm);

})