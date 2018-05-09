import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {environment} from '../../environments/environment';

import { TripComponent } from './trip.component';
import { DestinationsDirectionPipe } from './map/destinations-direction.pipe';

import { NguiMapModule} from '@ngui/map/dist';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?libraries=places&key=' + environment.googleMapsApiKey}),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  declarations: [TripComponent, DestinationsDirectionPipe, NavComponent, MapComponent]
})
export class TripModule { }
