import {Destination} from './destination';
import {TripConfig} from './tripConfig';

export class Trip {
  title?: string;
  config?: TripConfig;
  destinations?: Destination[];
}
