import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ServiceListRoutingModule } from './service-list-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ServiceListRoutingModule,
    MaterialModule
  ]
})
export class ServiceListModule { }
