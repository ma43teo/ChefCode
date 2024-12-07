import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservacionesPageRoutingModule } from './reservaciones-routing.module';

import { ReservacionesPage } from './reservaciones.page';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservacionesPageRoutingModule,
    SharedModule
  ],
  declarations: [ReservacionesPage]
})
export class ReservacionesPageModule {}
