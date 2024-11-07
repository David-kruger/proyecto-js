// Clases para usuarios
// Clase usuario, para crear usuarios
class User{
    constructor (firstName, lastName,birthDate,email,password,confirmPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword; 
    }
}

// ClasecurrenUser hereda de user
class CurrentUser extends User {
    constructor(email,password){
        super(null, null, null, email, password, null);
    }
}

// Clase Update hereda de User
class Update extends User {
     constructor(firstName, lastName, birthDate, password, confirmPassword) {
     super(firstName, lastName, birthDate,null, password, confirmPassword);
     delete this.email;
    }
}

// Clase para pisos
class Flat {
    constructor (id,city,streetName,streetNumber,areaSize,ac,yearBuilt,rentPrice,dateAvailable) {
        this.id = id;
        this.city = city;
        this.streetName = streetName;
        this.streetNumber = streetNumber;
        this.areaSize = parseFloat(areaSize);
        this.ac = ac;
        this.yearBuilt = yearBuilt;
        this.rentPrice = parseFloat(rentPrice);
        this.dateAvailable = dateAvailable;
    }
}

export { User, CurrentUser, Update, Flat };