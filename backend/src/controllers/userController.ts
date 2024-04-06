import user from "../models/user";
import iUser from "../types/user";
import { comparePassword, hashPassword } from "../utils/bCrypt";

export const loginUser = async (email: string, password: string) => {
  const user = await getUserByEmail(email);

  if (!user) return 404;

  if (await comparePassword(password, user.password)) {
    return 200;
  } else {
    return 401;
  }
}

export const getUserByEmail = async (email: string) => {
  return await user.findOne({ email: email });
};

export const createUser = async (userData: iUser) => {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = new user({ ...userData, password: hashedPassword });
  await newUser.save();
  return 200;
};

export const addAppToUser = async (email: string, appId: string) => {
  const user = await getUserByEmail(email);

  if (!user) return 404;

  user.apps.push(appId);
  await user.save();
  return 200;
}

export const removeAppFromUser = async (email: string, appName: string) => {
  const user = await getUserByEmail(email);

  if (!user) return 404;

  user.apps = user.apps.filter(app => app !== appName);
  await user.save();
  return 200;
}

export const updatePassword = async (email: string, newPassword: string, oldPassword: string) => {
  const user = await getUserByEmail(email);

  if (!user) return 404;

  if (await comparePassword(oldPassword, user.password)) {
    user.password = await hashPassword(newPassword);
    await user.save();
    return 200;
  } else {
    return 401;
  }
}

export const getUserApps = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) return { status: 404, apps: []};

  return { status: 200, apps: user.apps};
}