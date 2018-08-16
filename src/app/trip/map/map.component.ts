import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Destination, DestinationTravelMode } from '../../shared/model/destination';
import { Helpers } from '../../shared/helpers';
import {DirectionsRenderer, NguiMapComponent} from '@ngui/map/dist';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';
import GeocoderResult = google.maps.GeocoderResult;

@Component({
  selector: 'app-trip-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class MapComponent implements OnInit {

  trip: Trip;

  @ViewChild(NguiMapComponent) nguiMapComponent: NguiMapComponent;
  @ViewChild(DirectionsRenderer) directionsRendererDirective: DirectionsRenderer;
  geocoder: google.maps.Geocoder;
  activeDestinationIndex: number;
  center: google.maps.LatLng;
  marker: Destination;
  destinationMarkers: any[] = [];
  mapReady = false;
  map: google.maps.Map;

  private lastTravelMode: DestinationTravelMode = DestinationTravelMode.DRIVING;

  constructor(private tripService: TripService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    // subscribe to trip changes
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.destinationMarkers = [];
      this.trip = trip;
    });
    this.tripService.destinationSelected.subscribe( (index: number) => {
      if (index !== this.activeDestinationIndex) {
        this.clickDestinationMarker(this.destinationMarkers[index], index);
        const latLng = new google.maps.LatLng(this.trip.destinations[index].lat, this.trip.destinations[index].lng);
        this.map.panTo(latLng);
      }
    });
    this.tripService.destinationAdded.subscribe( (destination: Destination) => {
      this.resetCurrentMarker();
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
    this.tripService.placeAddedToMap.subscribe( (place: google.maps.places.PlaceResult) => {
      const latLng = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
      this.addSearchLocationMarker(latLng, place);
      this.map.panTo(latLng);
      this.ref.detectChanges(); // as the view doesnt get updated autom. (no user interaction) we need to trigger the change manually
    });
  }

  onMapReady(map) {
    this.map = map;
    this.mapReady = true;
    this.geocoder = new google.maps.Geocoder();
    this.tripService.mapReady.emit();
  }

  destinationMarkerInit(marker, index: number) {
    this.destinationMarkers[index] = marker;

    if (this.trip.destinations.length > 0 && index === (this.trip.destinations.length - 1)) {
      const self = this;
      window.setTimeout(function () { // TODO not perfect
        self.map.fitBounds(self.getBounds());
      }, 4000);
    }
  }

  clickOnMap(event) {
    if (event instanceof MouseEvent) {
      return false;
    }
    this.addSearchLocationMarker(event.latLng);
  }

  markerDragEnd(marker) {
    this.marker.lat = marker.latLng.lat();
    this.marker.lng = marker.latLng.lng();

    const self = this;
    this.resolveLocation(this.marker.lat, this.marker.lng).then(function (results: GeocoderResult[]) {
      Helpers.setGeoCoderResultToDestination(results[0], self.marker);
    });
  }

  clickDestinationMarker(marker, index: number) {
    this.resetCurrentMarker();
    this.activeDestinationIndex = index;
    this.tripService.selectDestination(index);
  }

  destinationMarkerDragEnd(event, index: number) {
    this.resetCurrentMarker();
    const destination = this.trip.destinations[index];
    destination.lat = event.latLng.lat();
    destination.lng = event.latLng.lng();
    this.tripService.updateDestination(index, destination);

    // resolve location
    const self = this;
    this.resolveLocation(destination.lat, destination.lng).then(function (results: GeocoderResult[]) {
      Helpers.setGeoCoderResultToDestination(results[0], destination);
      self.tripService.updateDestination(index, destination);
    });
  }

  onDirectionError(status: google.maps.DirectionsStatus, destination: Destination) {
    let index = null;
    for (let i = 0; i < this.trip.destinations.length; i++) {
      if (this.trip.destinations[i] === destination) {
        index = i;
        break;
      }
    }
    destination.travelMode = DestinationTravelMode.NONE;
    if (index !== null) {
      this.tripService.updateDestination(index, destination);
    }
  }

  onDirectionsResult(result: google.maps.DirectionsResult, destination: Destination) {
    console.log('direction response', result.routes[0], destination);
  }

  private resetCurrentMarker() {
    this.marker = null;
  }

  private addSearchLocationMarker(latLng: google.maps.LatLng, placeResult?: google.maps.places.PlaceResult) {
    this.marker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
      title: 'Stop ' + (this.trip.destinations.length + 1),
      travelMode: this.lastTravelMode
    };

    if (placeResult) {
      Helpers.setPlaceResultToDestination(placeResult, this.marker);
    }
    this.tripService.updateMapMarker(this.marker);

    if (!placeResult) {
      const self = this;
      this.resolveLocation(latLng.lat(), latLng.lng()).then(function (results: GeocoderResult[]) {
        Helpers.setGeoCoderResultToDestination(results[0], self.marker);
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

  private getBounds() {
    const bounds = new google.maps.LatLngBounds();

    this.trip.destinations.forEach(function(destination: Destination, index) {
      bounds.extend(new google.maps.LatLng(destination.lat, destination.lng));
    });

    return bounds;
  }
}
