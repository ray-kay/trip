export class Destination {
  lat: number;
  lng: number;
  title?: string;
  fullAddress?: string;
  showDirection?: boolean;
  directionsRequest?: google.maps.DirectionsRequest;
  travelMode?: google.maps.TravelMode;
  directionOptions?: google.maps.DirectionsRendererOptions;
}
