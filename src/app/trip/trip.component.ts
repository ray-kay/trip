import { Component, OnInit } from '@angular/core';
import {Trip} from '../shared/model/trip';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {TripService} from './trip.service';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit {

  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private tripService: TripService, private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.tripService.loadTrip()
      .subscribe((trip: Trip) => console.log('Trip loaded', trip));
  }

}
