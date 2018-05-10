import {Component, Input, OnInit} from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {MatSidenav} from '@angular/material';
import {TripService} from '../trip.service';

@Component({
  selector: 'app-trip-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  trip: Trip;
  @Input() sideNav: MatSidenav;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private tripService: TripService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
  }
}
