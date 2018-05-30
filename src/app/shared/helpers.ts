import {Destination} from './model/destination';

export class Helpers {
  static moveArrayElement(arr: any[], old_index: number, new_index: number): any[] {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      let k = new_index - arr.length;
      while ((k--) + 1) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  static setGeoCoderResultToDestination(result: google.maps.GeocoderResult, destination: Destination): Destination {
    destination.fullAddress = result.formatted_address;
    const indexForTitle = result.types && ['premise', 'street_address'].indexOf(result.types[0]) > -1 ? 2 : 1;
    destination.title = result.address_components[indexForTitle].short_name;

    destination.geocoderResult = result;
    return destination;
  }

  static setPlaceResultToDestination(result: google.maps.places.PlaceResult, destination: Destination): Destination {
    destination.fullAddress = result.formatted_address;
    destination.title = result.name;
    destination.placeResult = result;
    return destination;
  }
}
