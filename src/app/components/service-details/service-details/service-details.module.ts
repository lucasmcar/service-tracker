import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceDetailsRoutingModule } from './service-details-routing.module';
import { MaterialModule } from '../../../shared/material/material.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ServiceDetailsRoutingModule,
    MaterialModule
  ]
})
export class ServiceDetailsModule { }
