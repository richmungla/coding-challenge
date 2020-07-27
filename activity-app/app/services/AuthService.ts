import axios from "axios";

import { BASE_URL } from "../config/constants";

export const regsiter = async (name: string) => {
  try {
    const data = await axios.post(`${BASE_URL}/user`, {
      name,
    });
    return data;
  } catch (err) {
    console.log("====================================");
    console.log(`An error occurred registering user. ${err}`);
    console.log("====================================");
    return null;
  }
};

export const getUser = async (name: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/user/${name}`);
    return data;
  } catch (err) {
    console.log("====================================");
    console.log(`An error occurred registering user. ${err}`);
    console.log("====================================");
    return null;
  }
};
