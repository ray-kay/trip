import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {MatSidenav} from '@angular/material';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-trip-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  trip: Trip;
  @Input() sideNav: MatSidenav;
  constructor(private tripService: TripService) {}

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
  }
}
