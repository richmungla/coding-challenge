import Activity from "../models/Activity";
import {
  fetchActivities,
  createActivity,
  deleteActivity,
} from "../services/ActivityService";

export const UPDATE_ACTIVITIES = "UPDATE_ACTIVITIES";

export function updateActivities(activities: Array<Activity>) {
  return {
    type: UPDATE_ACTIVITIES,
    activities,
  };
}

export function createAndUpdate(activity: Activity, userId: string) {
  return (dispatch) => {
    createActivity(activity, userId).then(() => {
      dispatch(getActivities(userId));
    });
  };
}

export function getActivities(userId: string) {
  return (dispatch) => {
    fetchActivities(userId).then((res) => {
      console.log(res);
      dispatch(updateActivities(res.data.data.activities));
    });
  };
}

export function deleteAndUpdate(activityId: string, userId: string) {
  return (dispatch) => {
    deleteActivity(activityId).then(() => {
      dispatch(getActivities(userId));
    });
  };
}
