// importar la clse User
import {User} from "./classes/classes.js";
import { validateUser, inputCamps } from './register/validateUser.js';
import {deleteCurrentUser} from './general/logOutRegisterLogin.js'

// Funcion para ingresar los datos de formulario
const submitForm = (event) => {
    console.log(inputCamps);
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();
    
    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;
    
    // obtener los usuarios guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));
    
    if (users != null) {
        const existEmail = users.findIndex((item)=> {
            return item.email === form.elements['email'].value
        });
        if (existEmail != -1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "this email is already registered!",
                iconColor: '#f5005a',
                confirmButtonColor: '#47AFFF',
                background: '#F8F8F8',
              });
            return;
        }
    }

    let newUser = {}
    if (inputCamps.name && inputCamps.lastName && inputCamps.birthDate && inputCamps.email && inputCamps.password && inputCamps.confirmPassword) {
        
    // crear un objeto de la clase user
        newUser = new User(
            form.elements['first_name'].value,
            form.elements['last_name'].value,
            form.elements['birth_date'].value,
            form.elements['email'].value,
            form.elements['password'].value,
            form.elements['confirm_password'].value,
        );
    }else {
        return;
    }

    // // sino hay ningun usuario agrega el local storage el primer usuario si ya contiene usarios lo agrega al final del array de users
    if (users === null) {
        const arrayUser = [newUser];
        localStorage.setItem('users', JSON.stringify(arrayUser));
        localStorage.setItem('currentUser',JSON.stringify(newUser));
    } else {
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
        localStorage.setItem('currentUser',JSON.stringify(newUser));
    }

    form.reset();
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Account Created",
        iconColor: '#46D678',
        background: '#F8F8F8',
        showConfirmButton: false,
        timer: 1500
      });

    setTimeout(()=>{
        window.location.href = 'home.html';
    },2500);
   
}

document.addEventListener('DOMContentLoaded',()=>{

    // Eliminar Usuario Loggeado
    deleteCurrentUser();

    // Obtener todos los inputs del formulario
    const inputs = document.querySelectorAll('#form_register input');

    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    document.getElementById('form_register').addEventListener('submit', submitForm);
    
    //eventListener para todos los inputs 
    inputs.forEach((input)=>{
        input.addEventListener('keyup', validateUser);
        input.addEventListener('blur', validateUser);
    });
})