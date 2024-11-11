// Import la clase currentUser
import {CurrentUser} from "./classes/classes.js";
import {deleteCurrentUser} from './general/logOutRegisterLogin.js'

const loginForm = (event) => {
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;

    // crear un objeto de la clase user
    const currentUser = new CurrentUser (
        form.elements['email'].value,
        form.elements['password'].value,
    );

    // obtener los usuarios guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));

    // si la lista de usuarios en localhost no es nula busca un objeto que coincida con los datos de login
    if (users != null) {
        const result = users.find((item)=>{
            return item.email === currentUser.email && item.password === currentUser.password
        })
        if (result !== undefined ) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "LogIn Successful",
                iconColor: '#46D678',
                background: '#F8F8F8',
                showConfirmButton: false,
                timer: 1500
              });
            localStorage.setItem('currentUser',JSON.stringify(result));
            
            setTimeout(()=>{
                form.reset();
                window.location.href = 'home.html';
            },2500);
        } else {
            form.reset();
            document.querySelector('#email_group p').classList.remove('hidden')
            document.querySelector('#password_group p').classList.remove('hidden')
            Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User or password Incorrect!",
            iconColor: '#f5005a',
            background: '#F8F8F8',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            })
            
        }
        
    }
}  

document.addEventListener('DOMContentLoaded',()=>{

    // Eliminar Usuario Loggeado
    deleteCurrentUser();
    
    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    document.getElementById('form_login').addEventListener('submit', loginForm);

})