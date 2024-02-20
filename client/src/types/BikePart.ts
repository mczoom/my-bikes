export interface BikePart {
  id: string;
  category: string;
  brand: string;
  model: string;
  year: string;
  weight: number | string;
  price?: number | string;
  distance?: number;
}
