import { Bike } from './Bike';

export interface PartInfo {
  category: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  weight: number | undefined;
  price: number | undefined;
  bikeSelect: string | undefined;
  bikeOdo: number | undefined;
  uninstalled: boolean | undefined;
}
