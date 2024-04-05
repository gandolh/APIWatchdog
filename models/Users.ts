import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

const userDb = mongoose.connection.useDb("API-Watchdog");

const Users = userDb.model("User", userSchema);

export default Users;
