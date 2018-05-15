import { Pipe, PipeTransform } from '@angular/core';

import { Destination, DestinationTravelMode} from '../../shared/model/destination';

@Pipe({
  name: 'destinationsDirection',
  // pure: true // we could also set pure: false to make it impure but then angular will check this input with every circle
})
export class DestinationsDirectionPipe implements PipeTransform {

  transform(destinations: Destination[], googleLoaded?: boolean): any[] {
    return googleLoaded ? destinations.filter(function (destination: Destination, index: number, array: Destination[]): boolean {
      if (index > 0) {
        let travelMode: google.maps.TravelMode = null;
        switch (destination.travelMode) {
          case DestinationTravelMode.DRIVING: travelMode = google.maps.TravelMode.DRIVING; break;
          case DestinationTravelMode.TRANSIT: travelMode = google.maps.TravelMode.TRANSIT; break;
          case DestinationTravelMode.WALKING: travelMode = google.maps.TravelMode.WALKING; break;
          case DestinationTravelMode.BICYCLING: travelMode = google.maps.TravelMode.BICYCLING; break;
        }

        if (travelMode) {
          destination.directionsRequest = {
            origin: {lat: array[index - 1].lat, lng: array[index - 1].lng},
            destination: {lat: destination.lat, lng: destination.lng},
            travelMode: travelMode
          };
          return true;
        }
      }
      destination.directionsRequest = null;
      return false;
    }) : [];
  }

}
