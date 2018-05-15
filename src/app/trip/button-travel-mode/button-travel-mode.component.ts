import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {DestinationTravelMode} from '../../shared/model/destination';

@Component({
  selector: 'app-trip-button-travel-mode',
  templateUrl: './button-travel-mode.component.html',
  styleUrls: ['./button-travel-mode.component.css']
})
export class ButtonTravelModeComponent implements OnInit {

  @Input() travelModeValue: DestinationTravelMode = DestinationTravelMode.NONE;
  @Output('change') changeEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
