import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';


import {Trip} from '../shared/model/trip';
import {Destination} from '../shared/model/destination';
import {Helpers} from '../shared/helpers';


@Injectable({
  providedIn: 'root'
})
export class TripService {

  trip: Trip;
  private destinationChangeInProgress = false;

  @Output() tripLoaded: EventEmitter<Trip> = new EventEmitter();
  @Output() destinationSelected: EventEmitter<number> = new EventEmitter();
  @Output() destinationAdded: EventEmitter<Destination> = new EventEmitter();
  @Output() destinationDeleted: EventEmitter<number> = new EventEmitter();
  @Output() destinationOrderChanged: EventEmitter<any> = new EventEmitter();
  @Output() mapMarkerUpdated: EventEmitter<Destination> = new EventEmitter();
  @Output() placeAddedToMap: EventEmitter<google.maps.places.PlaceResult> = new EventEmitter();

  constructor(private http: HttpClient) {}

  loadTrip(): Observable<Trip> {
    return this.http.get('./assets/_dummy/test-trip.json')
      .pipe(
        map((res: any) => {
          this.trip = res;
          this.tripLoaded.emit(this.trip);
          return res;
        }),
        catchError(this.handleError)
      );
  }

  selectDestination(index: number) {
    this.destinationSelected.emit(index);
  }

  addMapMarkerFromPlace(place: google.maps.places.PlaceResult) {
    this.placeAddedToMap.emit(place);
  }

  updateMapMarker(destination: Destination) {
    this.mapMarkerUpdated.emit(destination);
  }

  addDestination(destination: Destination) {
    const destinations: Destination[] = Object.assign([], this.trip.destinations);
    destinations.push(destination);
    this.trip.destinations = destinations;
    this.destinationAdded.emit(destination);
  }

  deleteDestination(destinationIndex: number) {
    const destinations: Destination[] = Object.assign([], this.trip.destinations);
    destinations.splice(destinationIndex, 1);
    this.trip.destinations = destinations;
    this.destinationDeleted.emit(destinationIndex);
  }

  changeDestinationOrder(destinationIndex: number, newIndex: number) {
    if (!this.destinationChangeInProgress) {
      this.destinationChangeInProgress = true;
      this.trip.destinations = Helpers.moveArrayElement(Object.assign([], this.trip.destinations), destinationIndex, newIndex);

      setTimeout(() => {
        this.destinationChangeInProgress = false;
      }, 300);
      this.destinationOrderChanged.emit({index: destinationIndex, newIndex: newIndex});
    }
  }

  updateDestination(destinationIndex: number, updatedDestination: Destination): Destination {
    const destinations: Destination[] = Object.assign([], this.trip.destinations);
    const destination: Destination = Object.assign({}, updatedDestination);
    destinations[destinationIndex] = destination;
    this.trip.destinations = destinations;

    return destination;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
