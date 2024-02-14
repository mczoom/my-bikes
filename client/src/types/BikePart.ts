export interface BikePart {
  brand: string;
  model: string;
  year: string;
  weight: number | string;
  price: number | string;
  distance?: number;
  _id?: string;
}
