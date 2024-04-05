import { hashSync } from "bcrypt";
import Users from "../models/Users.ts";
import User from "../types/User.ts";

const getUserByEmail = async (email: string) => {
	const userModel = await Users.findOne({ email });

	if (!userModel) {
		return;
	}

	const user = {
		username: userModel.username,
		email: userModel.email,
		password: userModel.password,
		apps: userModel.apps,
	} as User;

	return user;
};

const createUser = async (user: User) => {
	const hashedPassword = hashSync(user.password);

	const userModel = new Users({
		username: user.username,
		email: user.email,
		password: hashedPassword,
		apps: user.apps,
	});

	await userModel.save();
};

const addUserApp = async (email: string, appName: string) => {
	const userModel = await Users.findOne({ email });

	if (!userModel) {
		return;
	}

	userModel.apps.push(appName);

	await userModel.save();
};

const removeUserApp = async (email: string, appName: string) => {
	const userModel = await Users.findOne({ email });

	if (!userModel) {
		return;
	}

	userModel.apps = userModel.apps.filter((app: string) => app !== appName);

	await userModel.save();
};

const updatePassword = async (email: string, password: string) => {
    const userModel = await Users.findOne({ email });

    if (!userModel) {
        return;
    }

    const hashedPassword = hashSync(password);

    userModel.password = hashedPassword;

    await userModel.save();
};

export { getUserByEmail, createUser, addUserApp, removeUserApp, updatePassword };
