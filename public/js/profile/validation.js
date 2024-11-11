// Objeto con las expresiones regulares para realizar las validaciones 
const expressions = {
	name: /^[a-zA-ZÀ-ÿ]{2,}(?:\s[a-zA-ZÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{6,}$/, 
}

export const validateFirstName = (inputValue) => {
    if (inputValue != '' && !expressions.name.test(inputValue)) {
        document.querySelector(`#name_group p`).classList.remove('hidden');
        return false;
    }
    document.querySelector(`#name_group p`).classList.add('hidden');
    return true;
}

export const validateLastName = (inputValue) => {
    if (inputValue != '' && !expressions.name.test(inputValue)) {
        document.querySelector(`#lastname_group p`).classList.remove('hidden');
        return false;
    }
    document.querySelector(`#lastname_group p`).classList.add('hidden');
    return true;
}

export const validateBirthDate = (inputValue) => {
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

export const validatePassword = (password, confirmPassword) =>{
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

export const validateConfirmPassword = (password, confirmPassword) => {
   
    document.querySelector(`#confirm-pass_group p`).textContent = '';
    document.querySelector(`#confirm-pass_group p`).classList.add('hidden');
    
    if (confirmPassword !== "" && password !== confirmPassword) {
        document.querySelector(`#confirm-pass_group p`).textContent = 'Passwords don\'t match';
        document.querySelector(`#confirm-pass_group p`).classList.remove('hidden');
        return false;
        }
    return true;
}