// importar la clse User
import {User} from "./classes/classes.js";

// const formulario = document.getElementById('form_register');
const inputs = document.querySelectorAll('#form_register input');

// Objeto con las expresiones regulares para realizar las validaciones 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ]{2,}(?:\s[a-zA-ZÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

// objeto con las banderas true o false de los inputs, usado para la creacion del objetos User
const inputCamps = {
    name: false,
    lastName: false,
    birthDate: false,
    email: false,
    password: false,
    confirmPassword: false,
}

// funcion para validar los inputs del formulario
const validateUser = (event) =>{
    console.log(event.target.name);
    switch (event.target.name){
        case 'first_name':
            validateCamp (expressions.name, event.target, 'name');
        break;
        
        case 'last_name':
            validateCamp (expressions.name, event.target, 'lastName');
        break;

        case 'birth_date':
            const birthdate = new Date(event.target.value);
            const today = new Date();
            const majorityAge = new Date (today.getFullYear()-18,today.getMonth(),today.getDay());

            if (birthdate > majorityAge) {
                document.querySelector('#birthDate_group p').classList.remove('hidden');
                inputCamps['birthDate']= false;
            } else {
                document.querySelector('#birthDate_group p').classList.add('hidden');
                inputCamps['birthDate']= true;
            }
            
        break;

        case 'email':
            validateCamp (expressions.email, event.target, 'email');
        break;

        case 'password':
            validateCamp (expressions.password, event.target, 'password');
        break;

        case 'confirm_password':
            
            if (event.target.value === document.querySelector('#password_group input').value) {
                document.querySelector('#confirm-pass_group p').classList.add('hidden');
                inputCamps['confirmPassword']= true;
            }else {
                document.querySelector('#confirm-pass_group p').classList.remove('hidden');
                inputCamps['confirmPassword']= false;
            }

        break;
    }
}

// Function to validate name, lastname, email and password
const validateCamp = (expression,input,camp) => {
    if (expression.test(input.value)) {
        document.querySelector(`#${camp}_group p`).classList.add('hidden');
        document.querySelector(`#${camp}_group input`).classList.remove('border-solid', 'border-2', 'border-red-700')
        inputCamps[camp]= true;
    }else {
        document.querySelector(`#${camp}_group p`).classList.remove('hidden');
        document.querySelector(`#${camp}_group input`).classList.add('border-solid', 'border-2', 'border-red-700')
        inputCamps[camp]= false;
    }
    // console.log('inputCamps',inputCamps)
}

// Funcion para ingresar los datos de formulario
const submitForm = (event) => {
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

    console.log('dssdds')

    // // sino hay ningun usuario agrega el local storage el primer usuario si ya contiene usarios lo agrega al final del array de users
    if (users === null) {
        const arrayUser = [newUser];
        localStorage.setItem('users', JSON.stringify(arrayUser));
    } else {
        users.push(newUser);
        localStorage.setItem('users',JSON.stringify(users));
    }
    
    form.reset();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Account Created",
        showConfirmButton: false,
        timer: 1500
      });

    setTimeout(()=>{
        
        window.location.href = 'index.html';
    },2500);
   
}

document.addEventListener('DOMContentLoaded',()=>{

    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    document.getElementById('form_register').addEventListener('submit', submitForm);
    
    //eventListener para todos los inputs 
    inputs.forEach((input)=>{
        input.addEventListener('keyup', validateUser);
        input.addEventListener('blur', validateUser);
    });
})