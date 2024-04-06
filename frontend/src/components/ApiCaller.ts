import axios from 'axios';
import iApp from '../types/IApp';


const getAllApps = async  () : Promise<iApp[] | -1> => {
    try {
        const resp = await axios.get('http://localhost:3000/api/app/getAll');
        return resp.data;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const createApp = async (appName : string) : Promise<number>=> {
    try {
         await axios.post('http://localhost:3000/api/app/create', {appName},  
         {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        return 0;
    } catch (err) {
        console.log(err);
        return -1;
    }
}


export { getAllApps, createApp };