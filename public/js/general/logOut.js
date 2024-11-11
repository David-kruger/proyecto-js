$(document).ready(function () {
    const logOut = () => {
        const userLogged = JSON.parse(localStorage.getItem('currentUser'));
        if (userLogged != null) {
            localStorage.removeItem('currentUser');
            $(location).attr('href', 'index.html');
        }
    };
    $('.logout_button').on('click', logOut);

})