import { Pipe, PipeTransform } from '@angular/core';

import { Destination} from '../../shared/model/destination';

@Pipe({
  name: 'destinationsDirection',
  // pure: true // we could also set pure: false to make it impure but then angular will check this input with every circle
})
export class DestinationsDirectionPipe implements PipeTransform {

  transform(destinations: Destination[], args?: any): any[] {
    return destinations.filter(function (destination: Destination, index: number, array: Destination[]): boolean {
      if (destination.showDirection && index > 0) {
        destination.directionsRequest = {
          origin: { lat: array[index - 1].lat, lng: array[index - 1].lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: destination.travelMode
        };
        return true;
      }
      destination.directionsRequest = null;
      return false;
    });
  }

}
