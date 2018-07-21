import { Component, OnInit } from '@angular/core';
import {Trip} from '../../shared/model/trip';
import {TripService} from '../trip.service';
import {MatListOption} from '@angular/material';
import {CdkDragDrop} from '@angular/cdk-experimental/drag-drop/typings/drag-events';
import {CdkDrop} from '@angular/cdk-experimental/drag-drop';

@Component({
  selector: 'app-trip-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss']
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

  destinationDropped(dropEvent: CdkDragDrop<CdkDrop>) {
    this.tripService.changeDestinationOrder(dropEvent.previousIndex, dropEvent.currentIndex);
  }

}
