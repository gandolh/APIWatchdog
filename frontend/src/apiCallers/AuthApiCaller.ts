import axios from 'axios';
import { useAuthContext } from '../components/auth/AuthContext';

const getLocalStorageUser = () : User | null => {
    const user = window.localStorage.getItem("authenticatedUser");
    if (user) {
        return JSON.parse(user);
    }
    return null;
}

const LoginCall = async  (email : string, password : string, handleUserLoggedIn : (user : User)=> void, setCurentUser : any) : Promise<Number>  => { 
    

    // do post call with axios. in body send email and password. The url is http://localhost:3000/auth/login
    try {
        const resp = await axios.post('http://localhost:3000/api/user/login', { email, password },
        {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}
        );
         setCurentUser(resp.data);
        handleUserLoggedIn(resp.data as User);
        window.localStorage.setItem("authenticatedUser", JSON.stringify(resp.data));
        
        return 0;
    } catch (err : any) {
        console.log(err);
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
    // do post call with axios. in body send user. The url is http://localhost:3000/auth/register
    try {
        const resp = await axios.post('http://localhost:3000/api/user/register', user, {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        console.log(resp);
        return 0;
    } catch (err) {
        console.log(err);
        console.log("You really f up something.");
        return -1;
    }

}


export {
    getLocalStorageUser,
    LoginCall,
    RegisterCall
}