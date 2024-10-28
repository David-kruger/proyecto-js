$(document).ready(function () {
    const showUserName = () => {
        const user_logged = JSON.parse(localStorage.getItem('currentUser'));
        if (user_logged) {
            $('#user_name').text(user_logged.firstName+' '+user_logged.lastName);
        }
    }
    showUserName();
})