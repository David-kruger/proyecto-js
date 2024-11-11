export const checkUserLogged = () => {
    const user_logged = JSON.parse(localStorage.getItem('currentUser'));
    if (user_logged == null) {
        window.location.href = 'index.html';
    }
};


