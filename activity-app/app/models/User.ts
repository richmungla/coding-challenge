import Activity from "./Activity";

export default interface User {
  _id?: string;
  name: string;
  activities: Array<Activity>;
}
