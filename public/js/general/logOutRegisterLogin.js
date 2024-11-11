export const deleteCurrentUser = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser!= null) {
        localStorage.removeItem('currentUser');
    }
}