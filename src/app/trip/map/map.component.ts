import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { Destination } from '../../shared/model/destination';
import { Helpers } from '../../shared/helpers';
import {DirectionsRenderer, NguiMapComponent} from '@ngui/map/dist';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-trip-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {

  trip: Trip;

  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  // geocoder: google.maps.Geocoder;
  activeDestination: Destination; // selected destination pin
  activeDestinationIndex: number;
  center: google.maps.LatLng;
  infoWindowShown = false;
  marker: any; // = { title: null, position: null} // { lat: null, lng: null };

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
  }

  onMapReady(map) {
    // this.geocoder = new google.maps.Geocoder();
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
      showDirection: true,
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.tripService.addDestination(destination);
    this.resetCurrentMarker();
  }

  clickDestinationMarker({target: marker}, destinationIndex: number) {
    this.activeDestination = this.trip.destinations[destinationIndex];
    this.activeDestinationIndex = destinationIndex;
    this.nguiMapComponent.openInfoWindow('destinationInfoWindow', marker);
  }

  destinationMarkerDragEnd(event, destinationIndex: number) {
    this.tripService.updateDestinationPosition(destinationIndex, event.latLng.lat(), event.latLng.lng());
  }

  removeDestination(destinationIndex: number) {
    this.tripService.deleteDestination(destinationIndex);
  }

  changeDestinationOrder(destinationIndex: number, newIndex: number) {
    this.tripService.changeDestinationOrder(destinationIndex, newIndex);
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
