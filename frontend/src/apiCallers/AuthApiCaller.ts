import axios from 'axios';
// const { setCurentUser } = useAuthContext();

const getLocalStorageUser = () : User | null => {
    const user = window.localStorage.getItem("authenticatedUser");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

const LoginCall = async  (email : string, password : string, handleUserLoggedIn : (user : User)=> void) : Promise<Number>  => { 
    // do post call with axios. in body send email and password. The url is http://localhost:8080/auth/login
    try {
        const resp = await axios.post('http://localhost:8080/auth/login', { email, password });
        // setCurentUser(resp.data);
        handleUserLoggedIn(resp.data as User);
        window.localStorage.setItem("authenticatedUser", JSON.stringify(resp.data));
        
        return 0;
    } catch (err : any) {
        if ( err.response.status === 400) {
            console.log("Ai introdus o parolă sau o adresă de email invalidă");
        } else if (err.response && err.response.status === 404) {
            console.log("Utilizatorul nu a fost găsit.");
        } else {
            console.log("Problemă neașteptată");
        }
        return -1;
    }
}

const RegisterCall = async  (user : User) : Promise<Number> => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/register
    try {
        const resp = await axios.post('http://localhost:8080/auth/register', user);
        console.log(resp);
        return 0;
    } catch (err) {
        console.log(err);
        console.log("You really f up something.");
        return -1;
    }
}

const GoogleLoginCall = async  (email : string , firstName : string, lastName: string) : Promise<User | null> => {
    // do post call with axios. in body send user. The url is http://localhost:8080/auth/google
    try {
        const response = await axios.post('http://localhost:8080/auth/google', {
            email, firstName, lastName
        });
        console.log(response.data);
        return response.data as User;
    } catch (error : any) {
        console.log(error.code);
        return null;
    }
    
}

export {
    getLocalStorageUser,
    LoginCall,
    RegisterCall,
    GoogleLoginCall
}