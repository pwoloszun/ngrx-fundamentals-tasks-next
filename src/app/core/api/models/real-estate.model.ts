import { LatLng } from '@shared/leaflet-map/viewmodels/lat-lng.interface';

export interface RealEstate extends LatLng {
  id: number;
  lat: number;
  lng: number;
  price: number;
  street: string;
  type: string;
  builtAt: string;
}
