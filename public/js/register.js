// importar la clse User
import {User} from "./classes/classes.js";

// Funcion para ingresar los datos de formulario
const submitForm = (event) => {
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();
    
    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;
    // crear un objeto de la clase user
    const newUser = new User(
        form.elements['first_name'].value,
        form.elements['last_name'].value,
        form.elements['birth_date'].value,
        form.elements['email'].value,
        form.elements['password'].value,
        form.elements['confirm_password'].value,
    );

    // obtener los usuarios guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));
    
    // sino hay ningun usuario agrega el local storage el primer usuario si ya contiene usarios lo agrega al final del array de users
    if (users === null) {
        const arrayUser = [newUser];
        localStorage.setItem('users', JSON.stringify(arrayUser));
    } else {
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
    }

    console.log('users:',users);
    // console.log(newUser);    
}

// Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
document.getElementById('form_register').addEventListener('submit', submitForm);