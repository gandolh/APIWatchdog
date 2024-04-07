import mongoose from 'mongoose';

const appSchema = new mongoose.Schema({
    appName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: "Stable"
    },
    endpoints: {
        type: [Object],
        default: [],
    },
    reports: {
        type: [Object],
        default: [],
    }
})

const appDb = mongoose.connection.useDb("API-Watchdog");

const Apps = appDb.model("apps", appSchema);

export default Apps;