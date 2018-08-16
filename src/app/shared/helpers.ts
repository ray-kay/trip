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
    if (result.types) {
      switch (true) {
        case ['premise', 'street_address'].indexOf(result.types[0]) > -1 : // if street level take city
          destination.title = result.address_components[2].short_name;
          break;
        case ['administrative_area_level_1'].indexOf(result.types[0]) === -1 && result.address_components.length > 1 :
          // if not administrative_area_level_1 use index 1;
          destination.title = result.address_components[1].short_name;
          break;
      }
    }

    destination.geocoderResult = result;
    return destination;
  }

  static setPlaceResultToDestination(result: google.maps.places.PlaceResult, destination: Destination): Destination {
    destination.fullAddress = result.formatted_address;
    destination.title = result.name;
    destination.placeResult = {
      place_id: result.place_id,
      url: result.url,
      rating: result.rating || null
    };
    return destination;
  }
}
