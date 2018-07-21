import { Pipe, PipeTransform } from '@angular/core';
import {DestinationTravelMode} from '../shared/model/destination';

@Pipe({
  name: 'travelModeToIcon'
})
export class TravelModeToIconPipe implements PipeTransform {

  transform(travelMode: DestinationTravelMode, args?: any): any {
    switch (travelMode) {
      case DestinationTravelMode.DRIVING: return 'directions_car';
      case DestinationTravelMode.TRANSIT: return 'directions_bus';
      case DestinationTravelMode.WALKING: return 'directions_walk';
      case DestinationTravelMode.BICYCLING: return 'directions_bike';
      case DestinationTravelMode.BOAT: return 'directions_boat';
      case DestinationTravelMode.FLYING: return 'flight';
    }
    return null;
  }

}
