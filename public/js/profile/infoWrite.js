export const placeholderNames = () => {
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

export const cardName = () => {
    const user_logged = JSON.parse(localStorage.getItem('currentUser'));
    if (user_logged) {
        $('#info_card-name').text(user_logged.firstName+' '+user_logged.lastName);
        $('#info_card-email').text(user_logged.email)
    }
}