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

const createApp = async (appName : string) : Promise<string | -1>=> {
    try {
        const resp = await axios.post('http://localhost:3000/api/app/create', {appName},  
         {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        return resp.data.appId;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const addAppToUser = async (appId : string, email: string ) : Promise<number>=> {
    try {
        console.log(appId, email);
       const resp =  await axios.post('http://localhost:3000/api/user/addApp', {appId, email},  
         {headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }});
        console.log(resp.data)
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
       await axios.post('http://localhost:3000/api/app/addEndpointToApp', {appId, endpointName},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        return 0;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const GetUserApps = async (email : string ): Promise<string[] | -1> =>{
    try {
        const resp = await axios.post('http://localhost:3000/api/user/getApps', {email},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        return resp.data;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

export { getAllApps, createApp, GetAppById, addEndpointToApp,addAppToUser, GetUserApps };