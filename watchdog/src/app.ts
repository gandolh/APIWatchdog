import dotenv from 'dotenv';
import db from './config/dbConnection';
import updateAtInterval from './utils/updateLogs';
import Apps from './models/app';

dotenv.config();


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.info('Connected to MongoDB!');
});

Apps.create({
    appName: 'Test App 1',
    status: 'STABLE',
    endpoints: [
        {
            endpointName: 'Get Posts 1',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 200
                },
                {
                    time: new Date(),
                    response: 302
                }
            ]
        },
        {
            endpointName: 'Get Posts 2',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 200
                },
                {
                    time: new Date(),
                    response: 302
                },
                {
                    time: new Date(),
                    response: 400
                },
                {
                    time: new Date(),
                    response: 200
                }
            ]
        }
    ],
    reports: [
        {
            endpointName: "Get Posts 1",
            status: "UNSTABLE",
            message: "Response code 400",
            fixed: true
        }
    ]
})

Apps.create({
    appName: 'Test App 2',
    status: 'STABLE',
    endpoints: [
        {
            endpointName: 'Get Posts 1',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 400
                },
                {
                    time: new Date(),
                    response: 302
                }
            ]
        },
        {
            endpointName: 'Get Posts 2',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 200
                },
                {
                    time: new Date(),
                    response: 302
                },
                {
                    time: new Date(),
                    response: 400
                },
                {
                    time: new Date(),
                    response: 200
                }
            ]
        }
    ],
    reports: []
})

Apps.create({
    appName: 'Test App 3',
    status: 'STABLE',
    endpoints: [
        {
            endpointName: 'Get Posts 1',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 200
                },
                {
                    time: new Date(),
                    response: 302
                }
            ]
        },
        {
            endpointName: 'Get Posts 2',
            url: 'https://jsonplaceholder.typicode.com/posts',
            method: 'GET',
            status: 'STABLE',
            logs: [
                {
                    time: new Date(),
                    response: 200
                },
                {
                    time: new Date(),
                    response: 302
                },
                {
                    time: new Date(),
                    response: 200
                }
            ]
        }
    ],
    reports: [
        {
            endpointName: "Get Posts 1",
            status: "UNSTABLE",
            message: "Response code 400",
            fixed: true
        },
        {
            endpointName: "Get Posts 2",
            status: "UNSTABLE",
            message: "Response code 400",
            fixed: false
        }
    ]
})

updateAtInterval(5);