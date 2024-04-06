import apps from "../models/app";
import iApp from "../types/app";

export const createApp = async (appData: iApp) => {
  const newApp = new apps(appData);
  await newApp.save();
  return 200;
};

