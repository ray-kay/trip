import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import {Trip} from '../../shared/model/trip';

@Component({
  selector: 'app-trip-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  @Input() trip: Trip;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private breakpointObserver: BreakpointObserver) {}
}
