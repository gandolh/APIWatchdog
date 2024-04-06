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


const GetAppById = async (appId : string ): Promise<iApp | -1> =>{
    try {
        const resp = await axios.post('http://localhost:3000/api/app/getAppById', {appId},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});



        return resp.data;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const addEndpointToApp = async ( appId : string, endpointName : string ) => {
    try {
        const resp = await axios.post('http://localhost:3000/api/app/addEndpointToApp', {appId, endpointName},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        return 0;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

export { getAllApps, createApp, GetAppById, addEndpointToApp };