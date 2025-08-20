import AsyncStorage from "@react-native-async-storage/async-storage";
import { asyncUser } from "../types";

const STORAGE_KEY = "user";

export const getUser = async (): Promise<asyncUser> => {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);

    if (!stored) throw "";

    const parsed = JSON.parse(stored) as asyncUser;

    return parsed;
  } catch (error) {
    return {};
  }
};

export const updateUser = async (newData: Partial<asyncUser>) => {
  const current = await getUser();

  const updated: asyncUser = {
    ...current,
    ...newData,
  };

  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearUser = async () => {
  const currentUser = await getUser();
  const updated: asyncUser = {
    deviceKey: currentUser.deviceKey,
    expoPushToken: currentUser.expoPushToken,
    userToken: "",
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};
