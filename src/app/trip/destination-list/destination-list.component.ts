import { Component, OnInit } from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';
import {MatListOption} from '@angular/material';

@Component({
  selector: 'app-trip-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.less']
})
export class DestinationListComponent implements OnInit {
  trip: Trip;
  activeDestinationIndex: number;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
    this.tripService.destinationSelected.subscribe( (index: number) => {
      if (this.activeDestinationIndex !== index) {
        console.log('select', index);
        this.activeDestinationIndex = index;
      }
    });
  }

  destinationSelected(option: MatListOption) {
    console.log(option);
    this.activeDestinationIndex = option.value;
    this.tripService.selectDestination(option.value);
  }

}
