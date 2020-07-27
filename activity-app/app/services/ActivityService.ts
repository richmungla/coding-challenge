import axios from "axios";
import { BASE_URL } from "../config/constants";
import Activity from "../models/Activity";

export const fetchActivities = async (userId: string) => {
  try {
    const data = await axios.get(`${BASE_URL}/activity/${userId}`);
    return data;
  } catch (err) {
    console.log("====================================");
    console.log(`An error occurred fetching activities. ${err}`);
    console.log("====================================");
    return null;
  }
};

export const deleteActivity = async (activityId: string) => {
  try {
    const data = await axios.delete(`${BASE_URL}/activity/${activityId}`);
    return data;
  } catch (err) {
    console.log("====================================");
    console.log(`An error occurred deleting activities. ${err}`);
    console.log("====================================");
    return null;
  }
};

export const createActivity = async (activity: Activity, userId) => {
  try {
    const data = await axios.post(`${BASE_URL}/activity/${userId}`, {
      name: activity.name,
      description: activity.description,
      startDate:activity.startDate,
      endDate: activity.endDate,
      time: activity.time,
    });
    return data;
  } catch (err) {
    console.log("====================================");
    console.log(`An error occurred creating activities. ${err}`);
    console.log("====================================");
    return null;
  }
};
