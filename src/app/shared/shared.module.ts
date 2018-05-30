import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [],
  exports: [
    CommonModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  declarations: []
})
export class SharedModule { }
