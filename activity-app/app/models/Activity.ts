import User from "./User";

export default interface Activity {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  time: Date;
}
