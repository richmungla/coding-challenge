import AsyncStorage from "@react-native-community/async-storage";

export const setStorageData = async (key: string, value: any) => {
  let status: boolean = false;
  try {
    await AsyncStorage.setItem(key, value);
    status = true;
  } catch (err) {
    console.error(
      `An error occured saving to storage. Item with key: ${key}, value: ${value}. Error: ${err}`
    );
    status = false;
  }

  return status;
};

export const getStorageData = async (key: string) => {
  let value: any = null;
  try {
    var res = await AsyncStorage.getItem(key);
    res = value;
  } catch (err) {
    console.log(
      `An error occurred getting item from storage. Item with key: ${key}. Error: ${err}`
    );
  }
  return value;
};
