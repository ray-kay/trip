export class Destination {
  lat: number;
  lng: number;
  title?: string;
  fullAddress?: string;
  directionsRequest?: google.maps.DirectionsRequest;
  travelMode?: DestinationTravelMode;
  directionOptions?: google.maps.DirectionsRendererOptions;
  geocoderResult?: google.maps.GeocoderResult;
  placeResult?: PlaceResult;
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

export class PlaceResult {
  place_id: string;
  url?: string;
  rating?: number;
}
