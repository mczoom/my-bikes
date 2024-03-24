export interface BikePart {
  id: string;
  bikeSelect?: string;
  bikeName?: string;
  userID?: string;
  category: string;
  brand: string;
  model: string;
  year: string;
  weight: number | string;
  price: number | string;
  distance?: number;
  installed?: boolean;
  retired?: boolean;
  _id?: string;
}
