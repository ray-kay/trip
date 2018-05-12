import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {environment} from '../../environments/environment';

import {TripComponent} from './trip.component';
import {DestinationsDirectionPipe} from './map/destinations-direction.pipe';

import {NguiMapModule} from '@ngui/map/dist';
import {SideNavComponent} from './side-nav/side-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';
import {MapComponent} from './map/map.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import { DestinationListComponent } from './destination-list/destination-list.component';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?libraries=places&key=' + environment.googleMapsApiKey}),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [TripComponent, DestinationsDirectionPipe, SideNavComponent, MapComponent, ToolbarComponent, DestinationListComponent]
})
export class TripModule {
}
