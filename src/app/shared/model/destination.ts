export class Destination {
  lat: number;
  lng: number;
  title?: string;
  fullAddress?: string;
  showDirection?: boolean;
  directionsRequest?: google.maps.DirectionsRequest;
  travelMode?: DestinationTravelMode;
  directionOptions?: google.maps.DirectionsRendererOptions;
}

export enum DestinationTravelMode {
  BICYCLING = 'BICYCLING',
  DRIVING = 'DRIVING',
  TRANSIT = 'TRANSIT',
  WALKING = 'WALKING',
  BOAT = 'BOAT',
  FLYING = 'FLYING',
  NONE = 'NONE'
}
