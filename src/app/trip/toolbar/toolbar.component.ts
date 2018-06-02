import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {MatSidenav} from '@angular/material';
import {TripService} from '../trip.service';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';

@Component({
  selector: 'app-trip-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  trip: Trip;
  searchValue: string;
  mapReady = false;
  @Input() sideNav: MatSidenav;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);

  constructor(private tripService: TripService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
    this.tripService.mapReady.subscribe( () => {
      this.mapReady = true;
    });
  }

  autoCompleteResult(place: google.maps.places.PlaceResult) {
    this.tripService.addMapMarkerFromPlace(place);
    this.searchValue = null;
  }
}
