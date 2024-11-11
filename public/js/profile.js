// Import la clase Update
import {Update} from "./classes/classes.js";
import {checkUserLogged} from './general/checkUserLogged.js'
import {validateFirstName, validateLastName, validateBirthDate, validatePassword, validateConfirmPassword} from './profile/validation.js'
import {placeholderNames, cardName} from './profile/infoWrite.js'
import {coverImageRandom, profileImageRandom} from './general/apiPortadaPerfil.js'

const updateProfile = (event) => {
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;

// Verificar si al menos uno de los inputs tiene valor
    const firstName = form.elements['first_name'].value;
    const lastName = form.elements['last_name'].value;
    const birthDate = form.elements['birth_date'].value;
    const password = form.elements['password'].value;
    const confirmPassword = form.elements['confirm_password'].value;

    if (!firstName && !lastName && !birthDate && !password && !confirmPassword) {
        // Detener la función si todos los campos están vacíos
        return;
    }
    
    // Validar inputs
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    const isBirthDateValid = validateBirthDate(birthDate);
    const isPasswordValid = validatePassword(password,confirmPassword); 
    const isConfirmPasswordValid = validateConfirmPassword(password,confirmPassword);

    // detener la funcion si alguno de los input sea erroneo
    if (!isFirstNameValid || !isLastNameValid || !isBirthDateValid || !isPasswordValid || !isConfirmPasswordValid) {
        // Detener la funcion si un campo es invalido
        return;
    }

    // Crear un objeto con los valores de los inputs
    const updatedInfo = new Update(
        form.elements['first_name'].value,
        form.elements['last_name'].value,
        form.elements['birth_date'].value,
        form.elements['password'].value,
        form.elements['confirm_password'].value,
    );

    // //Crear un nuevo objeto solo con las propiedades que se llenaron
    const udpatedUser = {};
    for (const key in updatedInfo) {
        if(updatedInfo[key] != '') {
            udpatedUser[key] = updatedInfo [key]
        }
    }

    // obtener los usuarios y el usuario actual guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // buscara el indice en las lista de usuarios que tenga el email
    const index = users.findIndex((item) =>{
        return item.email === currentUser.email
    });
    
    // Agregar los cambios en current User
    currentUser = { ...currentUser, ...udpatedUser};
    localStorage.setItem('currentUser',JSON.stringify(currentUser));

    // Agregar los cambios en la lista de usuarios
    users[index] = { ...users[index],...udpatedUser};
    localStorage.setItem('users',JSON.stringify(users));
    
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Updated",
        iconColor: '#46D678',
        background: '#F8F8F8',
        showConfirmButton: false,
        timer: 1500
      });
    }

    setTimeout(()=>{
        window.location.href = 'home.html';
    },2500);
}

document.addEventListener('DOMContentLoaded',()=>{
    // Verificar usuario loggeado
    checkUserLogged();
    
    //api Imagen de portada y perfi;
    profileImageRandom();
    // coverImageRandom();
    
    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    document.getElementById('profile_form').addEventListener('submit', updateProfile);

    //  funciones para mostrar la informacion del usuario en los placeholder del input y en card
    placeholderNames();
    cardName();


});