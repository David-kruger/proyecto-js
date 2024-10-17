class CurrentUser {
    constructor(email,password){
        this.email = email;
        this.password = password;
    }
}

const loginForm = (event) => {
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;
    // crear un objeto de la clase user
    const currentUser = new CurrentUser (
        form.elements['email'].value,
        form.elements['password'].value,
    );
    // console.log(currentUser);

    // obtener los usuarios guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));

    // si la lista de usuarios en localhost no es nula busca un objeto que coincida con los datos de login
    if (users != null) {
        const result = users.find((item)=>{
            return item.email === currentUser.email && item.password === currentUser.password
        })
        if (result !== undefined ) {
            alert('bienvenido');
            localStorage.setItem('currentUser',JSON.stringify(result));
            window.location.href = 'home.html';
        } else {
            alert('incorrectas');
        }
        
    }

}   