const expressions = {
	city: /^[A-Za-zÀ-ÿ]{2,}(?:\s[A-Za-zÀ-ÿ]+)*$/, // Letras y espacios, pueden llevar acentos.
}

export const validateCity = (inputValueCity) =>{
    if (inputValueCity != '' && !expressions.city.test(inputValueCity)) {
        document.querySelector('#city_group p').classList.remove('hidden')
        return false;
    }
    document.querySelector('#city_group p').classList.add('hidden')
    return true;
}

export const validateNumber = (inputValue, camp) => {
    const number = parseFloat(inputValue);
    if (inputValue!='' && number<0) {
        document.querySelector(`#${camp}_group p`).classList.remove('hidden')
        return false;
    }
    document.querySelector(`#${camp}_group p`).classList.add('hidden')
    return true;
}

export const validateYearBuilt = (inputYear) => {
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

export const validateDate = (inputDate) => {
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