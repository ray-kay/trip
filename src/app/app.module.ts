import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {AppRoutingModule} from './app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {TripModule} from './trip/trip.module';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AppRoutingModule,
    TripModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }