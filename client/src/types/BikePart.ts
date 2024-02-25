export interface BikePart {
  id: string;
  userID?: string;
  category: string;
  brand: string;
  model: string;
  year: string;
  weight: number;
  price: number;
  distance?: number;
  retired?: boolean;
  _id?: string;
}
