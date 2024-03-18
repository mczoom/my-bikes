import { Bike } from './Bike';

export interface PartInfo {
  category?: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  weight: number | string;
  price: number | string;
  bikeSelect: string;
  bikeOdo: number | undefined;
  uninstalled?: boolean | undefined;
}
