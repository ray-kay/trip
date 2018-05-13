import { Component, OnInit } from '@angular/core';
import {TripService} from '../trip.service';
import {Destination} from '../../shared/model/destination';
import {Trip} from '../../shared/model/trip';

@Component({
  selector: 'app-trip-map-destination-panel',
  templateUrl: './map-destination-panel.component.html',
  styleUrls: ['./map-destination-panel.component.css']
})
export class MapDestinationPanelComponent implements OnInit {
  trip: Trip;
  destination: Destination;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
    this.tripService.destinationSelected.subscribe( (index: number) => {
      console.log('MapBottomSheetContentComponent: open sheet', index);
      this.destination = this.trip.destinations[index];
    });
  }

}
