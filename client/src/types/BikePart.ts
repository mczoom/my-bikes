export interface BikePart {
  id?: string;
  brand: string;
  model: string;
  year: string;
  weight: number | string;
  price: number | string;
  distance?: number;
}
