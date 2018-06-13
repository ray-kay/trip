import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';
import {MatSidenav} from '@angular/material';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-trip-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sideNav: MatSidenav;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  trip: Trip;
  showSaveOutput = false;
  constructor(private tripService: TripService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
  }

  /*autoCompleteResult(place: google.maps.places.PlaceResult) {
    this.tripService.addMapMarkerFromPlace(place);
  }*/

  saveTrip() {
    console.log(this.trip);
    this.showSaveOutput = true;
  }
}
