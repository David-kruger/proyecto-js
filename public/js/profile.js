class Update {
    constructor (firstName,lastName,birthDate,password,confirmPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

const updateProfile = (event) => {
    // prevenir que la pagina se recargue cuando se de submit
    event.preventDefault();

    //crear una varialbe que guarde la informacion del formulario 
    const form = event.target;
    const updatedInfo = new Update(
        form.elements['first_name'].value,
        form.elements['last_name'].value,
        form.elements['birth_date'].value,
        form.elements['password'].value,
        form.elements['confirm_password'].value,
    );

    //Crear un nuevo objeto solo con las propiedades que se llenaron
    const udpatedUser = {};
    for (const key in updatedInfo) {
        if(updatedInfo[key] != '') {
            udpatedUser[key] = updatedInfo [key]
        }
    }
    
    // obtener los usuarios y el usuario actual guardados en local storage users type array
    const users = JSON.parse(localStorage.getItem('users'));
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.log(users,currentUser)

    const index = users.findIndex((item) =>{
        return item.email === currentUser.email
    });
  
    currentUser = { ...currentUser, ...udpatedUser};
    localStorage.setItem('currentUser',JSON.stringify(currentUser));
    
    users[index] = { ...users[index],...udpatedUser};
    localStorage.setItem('users',JSON.stringify(users));

    console.log('currentuser updated',currentUser);
    console.log('users updated',users)



}