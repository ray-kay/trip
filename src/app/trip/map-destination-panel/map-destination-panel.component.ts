import {Component, OnInit} from '@angular/core';
import {TripService} from '../trip.service';
import {Destination} from '../../shared/model/destination';
import {Trip} from '../../shared/model/trip';

@Component({
  selector: 'app-trip-map-destination-panel',
  templateUrl: './map-destination-panel.component.html',
  styleUrls: ['./map-destination-panel.component.scss']
})
export class MapDestinationPanelComponent implements OnInit {
  trip: Trip;
  newDestination = false;
  destinationIndex: number;
  destination: Destination;
  expanded = true;

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.tripLoaded.subscribe( (trip: Trip) => {
      this.trip = trip;
    });
    this.tripService.destinationSelected.subscribe( (index: number) => {
      this.newDestination = false;
      this.destination = this.trip.destinations[index];
      this.destinationIndex = index;
    });
    this.tripService.mapMarkerUpdated.subscribe( (destination: Destination) => {
      this.newDestination = true;
      this.destination = destination;
    });
  }

  saveDestination() {
    if (this.newDestination) {
      this.tripService.addDestination(this.destination);
      this.destination = null; // to close the panel
    } else {
      console.log('update', this.destination);
      this.tripService.updateDestination(this.destinationIndex, this.destination);
    }
  }

  removeDestination() {
    this.tripService.deleteDestination(this.destinationIndex);
    this.destination = null; // to close the panel
  }

  changeDestinationOrder(newIndex: number) {
    this.tripService.changeDestinationOrder(this.destinationIndex, newIndex);
    this.destinationIndex = newIndex;
  }

}
