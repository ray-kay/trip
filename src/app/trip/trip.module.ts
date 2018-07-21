import {NgModule} from '@angular/core';
import {environment} from '../../environments/environment';

import {TripComponent} from './trip.component';
import {DestinationsDirectionPipe} from './map/destinations-direction.pipe';

import {NguiMapModule} from '@ngui/map/dist';
import {SideNavComponent} from './side-nav/side-nav.component';
import {LayoutModule} from '@angular/cdk/layout';
import {DragDropModule} from '@angular/cdk-experimental/drag-drop';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonToggleModule,
  MatExpansionModule
} from '@angular/material';
import {MapComponent} from './map/map.component';
import {ToolbarComponent} from './toolbar/toolbar.component';
import { DestinationListComponent } from './destination-list/destination-list.component';
import { ButtonTravelModeComponent } from './button-travel-mode/button-travel-mode.component';
import { MapDestinationPanelComponent } from './map-destination-panel/map-destination-panel.component';

import { SharedModule } from '../shared/shared.module';
import { DestinationsAltDirectionPipe } from './map/destinations-alt-direction.pipe';
import { TravelModeToIconPipe } from './travel-mode-to-icon.pipe';

@NgModule({
  imports: [
    SharedModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?libraries=places&key=' + environment.googleMapsApiKey}),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonToggleModule,
    MatExpansionModule,
    DragDropModule
  ],
  entryComponents: [],
  declarations: [TripComponent, DestinationsDirectionPipe, SideNavComponent, MapComponent, ToolbarComponent, DestinationListComponent,
    ButtonTravelModeComponent,
    MapDestinationPanelComponent,
    DestinationsAltDirectionPipe,
    TravelModeToIconPipe],
  bootstrap: [],
})
export class TripModule {
}
