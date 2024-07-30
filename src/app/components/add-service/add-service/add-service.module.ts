import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddServiceRoutingModule } from './add-service-routing.module';
import { MaterialModule } from '../../../shared/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AddServiceRoutingModule,
    MaterialModule
  ]
})
export class AddServiceModule { }
