export interface Bike {
  _id: string;
  converted_distance: number;
  distance?: number;
  id: string;
  name: string;
  nickname?: string;
  primary?: boolean;
  resource_state?: number;
  retired: boolean;
  photo?: string;
  trainer: boolean;
  userID: string;
}
