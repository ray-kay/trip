import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomepageComponent} from './homepage/homepage.component';
import {TripComponent} from './trip/trip.component';
// import {SignupComponent} from './user/signup/signup.component';


const routes: Routes = [
  {path: 'trip', component: TripComponent},
  // {path: 'signup', component: SignupComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
