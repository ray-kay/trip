import {Component, Input, OnInit} from '@angular/core';
import {DestinationTravelMode} from '../../shared/model/destination';

@Component({
  selector: 'app-trip-button-travel-mode',
  templateUrl: './button-travel-mode.component.html',
  styleUrls: ['./button-travel-mode.component.css']
})
export class ButtonTravelModeComponent implements OnInit {

  @Input() travelModeValue: DestinationTravelMode = DestinationTravelMode.NONE;

  constructor() { }

  ngOnInit() {
  }

  update(event) {
    console.log('update', event);
  }

}
