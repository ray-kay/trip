import {Component, OnInit, ViewChild} from '@angular/core';
import { Destination, DestinationTravelMode } from '../../shared/model/destination';
import { Helpers } from '../../shared/helpers';
import {DirectionsRenderer, NguiMapComponent} from '@ngui/map/dist';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';
import GeocoderResult = google.maps.GeocoderResult;

@Component({
  selector: 'app-trip-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  trip: Trip;

  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  geocoder: google.maps.Geocoder;
  activeDestination: Destination; // selected destination pin
  activeDestinationIndex: number;
  center: google.maps.LatLng;
  infoWindowShown = false;
  marker: Destination; // = { title: null, position: null} // { lat: null, lng: null };
  destinationMarkers: any[] = [];
  mapReady = false

  private lastTravelMode: DestinationTravelMode = DestinationTravelMode.DRIVING;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    // subscribe to trip changes
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.destinationMarkers = [];
      this.trip = trip;
    });
    this.tripService.destinationSelected.subscribe( (index: number) => {
      if (index !== this.activeDestinationIndex) {
        this.clickDestinationMarker(this.destinationMarkers[index], index);
      }
    });
    this.tripService.destinationDeleted.subscribe( (index: number) => {
      const destinationMarkers: any[] = Object.assign([], this.destinationMarkers);
      destinationMarkers.splice(index, 1);
      this.destinationMarkers = destinationMarkers;
    });
    this.tripService.destinationOrderChanged.subscribe( (orderChanged: any) => {
      this.destinationMarkers = Helpers.moveArrayElement(Object.assign([], this.destinationMarkers),
        orderChanged.index, orderChanged.newIndex);
    });
  }

  onMapReady(map) {
    this.mapReady = true;
    this.geocoder = new google.maps.Geocoder();
  }

  destinationMarkerInit(marker, index: number) {
    this.destinationMarkers[index] = marker;
  }

  clickOnMap(event) {
    if (event instanceof MouseEvent) {
      return false;
    }
    // aways close info window for destination markers
    this.nguiMapComponent.closeInfoWindow('destinationInfoWindow');
    this.addSearchLocationMarker(event.latLng);
  }

  autoCompleteResult(place: google.maps.GeocoderResult) {
    this.center = place.geometry.location;
    this.addSearchLocationMarker(this.center, place.formatted_address);
  }

  toggleInfoWindow(marker) { // {target: marker} = event.target
    if (!this.infoWindowShown) {
      this.nguiMapComponent.openInfoWindow('markerInfoWindow', marker.target);

      // get location data
      const self = this;
      this.resolveLocation(marker.latLng.lat(), marker.latLng.lng()).then(function (results: GeocoderResult[]) {
        self.marker.fullAddress = results[0].formatted_address;
        self.marker.title = results[0].address_components[1].short_name;
      });
    } else {
      this.nguiMapComponent.closeInfoWindow('markerInfoWindow');
    }

    this.infoWindowShown = !this.infoWindowShown;
  }

  markerDragEnd(marker) {
    this.marker.lat = marker.latLng.lat();
    this.marker.lng = marker.latLng.lng();

    if (this.infoWindowShown) {
      const self = this;
      this.resolveLocation(this.marker.lat, this.marker.lng).then(function (results: GeocoderResult[]) {
        self.marker.fullAddress = results[0].formatted_address;
        self.marker.title = results[0].address_components[1].short_name;
      });
    }
  }

  addMarkerToDestination(marker: Destination) {
    const destination: Destination = {
      lat: marker.lat,
      lng: marker.lng,
      title: marker.title,
      fullAddress: marker.fullAddress,
      showDirection: true,
      travelMode: marker.travelMode || DestinationTravelMode.DRIVING
    };

    this.lastTravelMode = destination.travelMode;

    this.tripService.addDestination(destination);
    this.resetCurrentMarker();
  }

  clickDestinationMarker(marker, index: number) {
    this.resetCurrentMarker();
    this.activeDestination = this.trip.destinations[index];
    this.activeDestinationIndex = index;
    this.nguiMapComponent.openInfoWindow('destinationInfoWindow', marker);
    this.tripService.selectDestination(index);
  }

  destinationMarkerDragEnd(event, index: number) {
    this.resetCurrentMarker();
    this.infoWindowShown = false;
    const destination = this.trip.destinations[index];
    destination.lat = event.latLng.lat();
    destination.lng = event.latLng.lng();
    this.tripService.updateDestination(index, destination);

    // resolve location
    const self = this;
    this.resolveLocation(destination.lat, destination.lng).then(function (results: GeocoderResult[]) {
      destination.fullAddress = results[0].formatted_address;
      destination.title = results[0].address_components[1].short_name;
      self.tripService.updateDestination(index, destination);
    });
  }

  removeDestination(index: number) {
    this.tripService.deleteDestination(index);
  }

  changeDestinationOrder(index: number, newIndex: number) {
    this.tripService.changeDestinationOrder(index, newIndex);
  }

  private resetCurrentMarker() {
    this.infoWindowShown = false;
    this.marker = null;
  }

  private addSearchLocationMarker(latLng: google.maps.LatLng, title?: string) {
    this.marker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
      title: title,
      travelMode: this.lastTravelMode
    };

    if (this.infoWindowShown) {
      const self = this;
      this.resolveLocation(latLng.lat(), latLng.lng()).then(function (results: GeocoderResult[]) {
        // console.log(results[0]);
        self.marker.fullAddress = results[0].formatted_address;
        self.marker.title = results[0].address_components[1].short_name;
      });
    }
  }

  private resolveLocation(lat, lng): Promise<GeocoderResult[]> {
    return new Promise((resolve, reject) => {
      this.geocoder.geocode({'location': {lat: lat, lng: lng}}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK && results.length > 0) {
          resolve(results);
        } else {
          reject(status || 'No results found');
        }
      });
    });
  }
}
