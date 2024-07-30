import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BebidasPageRoutingModule } from './bebidas-routing.module';

import { BebidasPage } from './bebidas.page';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BebidasPageRoutingModule,
    SharedModule
  ],
  declarations: [BebidasPage]
})
export class BebidasPageModule {}
