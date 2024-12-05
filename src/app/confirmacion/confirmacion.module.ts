import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfirmacionPageRoutingModule } from './confirmacion-routing.module';

import { ConfirmacionPage } from './confirmacion.page';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfirmacionPageRoutingModule,
    HttpClientModule, 
  ],
  declarations: [ConfirmacionPage]
})
export class ConfirmacionPageModule {}
