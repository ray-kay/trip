import { Component, OnInit, ViewChild } from '@angular/core';

import { NguiMapComponent, DirectionsRenderer } from '@ngui/map/dist';

import { Trip } from '../shared/model/trip';
import { Destination } from '../shared/model/destination';
import { Helpers } from '../shared/helpers';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit {
  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  geocoder: google.maps.Geocoder;
  trip: Trip;
  tripTitle: string;
  destinations: Destination[];
  activeDestination: Destination; // selected destination pin
  activeDestinationIndex: number;
  center: google.maps.LatLng;
  infoWindowShown = false;
  marker: any; // = { title: null, position: null} // { lat: null, lng: null };
  destinationChangeInProgress = false;

  constructor() { }

  ngOnInit() {
    this.tripTitle = 'My new trip';
    this.destinations = [];
  }

  onMapReady(map) {
    this.geocoder = new google.maps.Geocoder();

    // add directions here as only then we have google available - TODO test data
    this.addDestination(-33.89440625978433, 151.21222767700192);
    this.addDestination(-33.87, 151.25);
  }

  clickOnMap(event) {
    if (event instanceof MouseEvent) {
      return false;
    }
    // aways close info window for destination markers
    this.nguiMapComponent.closeInfoWindow('destinationInfoWindow');
    this.addSearchLocationMarker(event.latLng, 'new marker');
  }

  autoCompleteResult(place: google.maps.GeocoderResult) {
    this.center = place.geometry.location;
    this.addSearchLocationMarker(this.center, place.formatted_address);
  }

  toggleInfoWindow({target: marker}) { // {target: marker} = event.target
    if (!this.infoWindowShown) {
      this.nguiMapComponent.openInfoWindow('markerInfoWindow', marker);
    } else {
      this.nguiMapComponent.closeInfoWindow('markerInfoWindow');
    }

    this.infoWindowShown = !this.infoWindowShown;
  }

  addDestination(lat: number, lng: number, title?: string) {
    const destination: Destination = {
      lat: lat,
      lng: lng,
      title: title || '',
      fullAddress: '',
      showDirection: true
    };

    this.resetCurrentMarker();
    const destinations: Destination[] = Object.assign([], this.destinations);
    destinations.push(destination);
    this.destinations = destinations;
  }

  clickDestinationMarker({target: marker}, destinationIndex: number) {
    this.activeDestination = this.destinations[destinationIndex];
    this.activeDestinationIndex = destinationIndex;
    this.nguiMapComponent.openInfoWindow('destinationInfoWindow', marker);
  }

  destinationMarkerDragEnd(event, destinationIndex: number) {
    const destinations: Destination[] = Object.assign([], this.destinations);
    const destination: Destination = Object.assign({}, destinations[destinationIndex]);
    destination.lat = event.latLng.lat();
    destination.lng = event.latLng.lng();
    destinations[destinationIndex] = destination;

    this.destinations = destinations;
  }

  removeDestination(destinationIndex: number) {
    const destinations: Destination[] = Object.assign([], this.destinations);
    destinations.splice(destinationIndex, 1);
    this.destinations = destinations;
  }

  changeDestinationPosition(destinationIndex: number, newIndex: number) {
    if (!this.destinationChangeInProgress) {
      this.destinationChangeInProgress = true;
      const destinations: Destination[] = Object.assign([], this.destinations);
      Helpers.moveArrayElement(destinations, destinationIndex, newIndex);
      this.destinations = destinations;

      setTimeout(() => {
        this.destinationChangeInProgress = false;
      }, 300);
    }
  }

  private resetCurrentMarker() {
    this.infoWindowShown = false;
    this.marker = null;
  }

  private addSearchLocationMarker(latLng: google.maps.LatLng, title?: string) {
    this.marker = {
      position: latLng,
      title: title || ''
    };
  }
}
