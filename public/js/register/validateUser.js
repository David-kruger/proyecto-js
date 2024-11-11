// Objeto con las expresiones regulares para realizar las validaciones 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ]{2,}(?:\s[a-zA-ZÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/, 
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
}

// objeto con las banderas true o false de los inputs, usado para la creacion del objetos User
export const inputCamps = {
    name: false,
    lastName: false,
    birthDate: false,
    email: false,
    password: false,
    confirmPassword: false,
}

// funcion para validar los inputs del formulario
export const validateUser = (event) =>{
    // console.log(event.target.name);
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
        document.querySelector(`#${camp}_group input`).classList.remove('border-solid', 'border-2', 'border-[#f5005a]')
        inputCamps[camp]= true;
    }else {
        document.querySelector(`#${camp}_group p`).classList.remove('hidden');
        document.querySelector(`#${camp}_group input`).classList.add('border-solid', 'border-2', 'border-[#f5005a]')
        inputCamps[camp]= false;
    }
}