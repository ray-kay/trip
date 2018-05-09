import { Component, OnInit } from '@angular/core';
import {Trip} from '../shared/model/trip';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.less']
})
export class TripComponent implements OnInit {
  trip: Trip;

  constructor() { }

  ngOnInit() {
    this.trip = {
      title: 'My new trip',
      destinations: []
    };
  }

}
