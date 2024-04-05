import Users from "../models/Users.ts";
import User from "../types/User.ts";

const getUserByEmail = async (email: string) => {
	const userModel = await Users.findOne({ email });

    if (!userModel) {
        return null;
    }

    const user = {
        userID: userModel.userID,
        username: userModel.username,
        email: userModel.email,
        password: userModel.password,
    } as User;

	return user;
};

export { getUserByEmail };
