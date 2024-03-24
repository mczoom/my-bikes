import { Bike } from './Bike';

export interface PartInfo {
  id?: string;
  category?: string;
  brand: string;
  model: string;
  weight: string | number;
  price: string | number;
  year?: string;
  bikeSelect: string;
  bikeOdo?: number;
  uninstalled?: boolean;
}
