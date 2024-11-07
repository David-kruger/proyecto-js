// Import la clase Update
import {Update} from "./classes/classes.js";

// Objeto con las expresiones regulares para realizar las validaciones 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ]{2,}(?:\s[a-zA-ZÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/, 
}

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
        showConfirmButton: false,
        timer: 1500
      });
    form.reset();
    placeholderNames();
    cardName();
    }
}

const validateFirstName = (inputValue) => {
    if (inputValue != '' && !expressions.name.test(inputValue)) {
        document.querySelector(`#name_group p`).classList.remove('hidden');
        return false;
    }
    document.querySelector(`#name_group p`).classList.add('hidden');
    return true;
}

const validateLastName = (inputValue) => {
    if (inputValue != '' && !expressions.name.test(inputValue)) {
        document.querySelector(`#lastname_group p`).classList.remove('hidden');
        return false;
    }
    document.querySelector(`#lastname_group p`).classList.add('hidden');
    return true;
}

const validateBirthDate = (inputValue) => {
    if (inputValue !== "") {
        const birthDate = new Date(inputValue);
        const today = new Date();
        const majorityAge = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        
        if (birthDate > majorityAge) {
            document.querySelector('#birth_group p').classList.remove('hidden');
            return false;
        }
    }
    document.querySelector('#birth_group p').classList.add('hidden');
    return true;
}

const validatePassword = (password, confirmPassword) =>{
    document.querySelector(`#password_group p`).textContent = '';
    document.querySelector(`#password_group p`).classList.add('hidden');

    if(password != "") {
        if (!expressions.password.test(password)) {
            document.querySelector(`#password_group p`).textContent = 'Invalid Password';
            document.querySelector(`#password_group p`).classList.remove('hidden');
            return false;
        } else if (confirmPassword != '' && password != confirmPassword) {
            document.querySelector(`#password_group p`).textContent = 'Passwords don\'t match';
            document.querySelector(`#password_group p`).classList.remove('hidden');
            return false;
        }
    }
    return true;
}

const validateConfirmPassword = (password, confirmPassword) => {
   
    document.querySelector(`#confirm-pass_group p`).textContent = '';
    document.querySelector(`#confirm-pass_group p`).classList.add('hidden');
    
    if (confirmPassword !== "" && password !== confirmPassword) {
        document.querySelector(`#confirm-pass_group p`).textContent = 'Passwords don\'t match';
        document.querySelector(`#confirm-pass_group p`).classList.remove('hidden');
        return false;
        }
    return true;
}

const placeholderNames = () => {
    const form = document.querySelector('#profile_form');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser) {
        // Assuming currentUser has firstName and lastName properties
    form.elements['first_name'].placeholder = currentUser.firstName;
    form.elements['last_name'].placeholder = currentUser.lastName;
    form.elements['email'].placeholder = currentUser.email;
    form.elements['birth_date'].placeholder = currentUser.birthDate;
    }
            
}   

const cardName = () => {
    const user_logged = JSON.parse(localStorage.getItem('currentUser'));
    if (user_logged) {
        $('#info_card-name').text(user_logged.firstName+' '+user_logged.lastName);
        $('#info_card-email').text(user_logged.email)
    }
}

const profileImageRandom = async () => {
    try {
        const response = await fetch (`https://randomuser.me/api/`);
        const data = await response.json();
        
        const img = document.querySelector('#img-perfil img')
        img.src = data.results[0].picture.large;
    
    }
    catch (error) {
        console.error('Error mostrado:', error);
        const img = document.querySelector('#img-perfil img')
        img.src = "./img/profile.jpg";
    }
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

document.addEventListener('DOMContentLoaded',()=>{
    //api Imagen de portada y perfi;
    profileImageRandom();
    coverImageRandom();
    
    // Addeventlistener para el formulario, necesario si se trabaja con export e import y el script type=module
    document.getElementById('profile_form').addEventListener('submit', updateProfile);

    //  funciones para mostrar la informacion del usuario en los placeholder del input y en card
    placeholderNames();
    cardName();


});