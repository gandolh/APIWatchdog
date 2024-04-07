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

const getAppWithLatestLogs = async (appId : string, hours: number): Promise<iApp | -1> =>{
    try {
        console.log(appId, hours);
        const resp = await axios.post('http://localhost:3000/api/app/getAppWithLatestLogs', {appId : appId, hours : hours},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        // console.log(resp.data);
        return resp.data;
    } catch (err) {
        console.log(err);
        return -1;
    }
}


const CreateBugReport = async (appId : string, endpointName : string, state : string, message : string, email : string) => {
    try {
        const resp = await axios.post('http://localhost:3000/api/app/addReportToApp', {appId, endpointName, state, message, email},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        return resp.data;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const SetIntervalFrequency = async (interval : number) : Promise<number> => {
    try {
        await axios.post('http://localhost:3000/api/setInterval', {interval},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
        return 0;
    } catch (err) {
        console.log(err);
        return -1;
    }
}

const updateReport = async (appId : string, reportId : string) : Promise<number> => {
    try {
        await axios.post('http://localhost:3000/api/app/updateReport', {appId, reportId},  
        {headers: {
           'Content-Type': 'application/x-www-form-urlencoded'
       }});
       console.log("OK");
        return 0;
    } catch (err) {
        console.log(err);
        return -1;
    }   
}

export { getAllApps, createApp, GetAppById, addEndpointToApp,addAppToUser, GetUserApps, getAppWithLatestLogs,CreateBugReport,
    SetIntervalFrequency, updateReport
 };