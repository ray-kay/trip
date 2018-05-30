import { Component, OnInit } from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-trip-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  trip: Trip;
  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
  }

  autoCompleteResult(place: google.maps.places.PlaceResult) {
    this.tripService.addMapMarkerFromPlace(place);
  }
}
