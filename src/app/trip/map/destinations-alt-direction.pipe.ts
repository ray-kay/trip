import { Pipe, PipeTransform } from '@angular/core';

import { Destination, DestinationTravelMode} from '../../shared/model/destination';

@Pipe({
  name: 'destinationsAltDirection'
})
export class DestinationsAltDirectionPipe implements PipeTransform {

  transform(destinations: Destination[], googleLoaded?: boolean): any[] {
    // we clone them here otherwise it would manipulate the items by adding new attributes like icons, opacity
    const tempDestinations = destinations.slice(0);
    return googleLoaded ? tempDestinations.filter(function (destination: any, index: number, array: Destination[]): boolean {
      if (index > 0) {
        destination.icons = [];
        destination.opacity = 0.8;
        switch (destination.travelMode) {
          case DestinationTravelMode.BOAT:
            destination.color = '#35393d';
            break;
          case DestinationTravelMode.FLYING:
            destination.color = '#740015';
            destination.opacity = 0;

            // draw a dashed line
            destination.icons = [{
              icon: {
                path: 'M 0,-2 0,0.5',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                scale: 4
              },
              offset: '0',
              repeat: '30px'
            }];
            break;
          /* case DestinationTravelMode.NONE:
            color = '#FF0000';
            break; */
          default:
            return false;
        }

        destination.path = [
          {lat: array[index - 1].lat, lng: array[index - 1].lng},
          {lat: destination.lat, lng: destination.lng}
        ];
        return true;
      }
      return false;
    }) : [];
  }

}
