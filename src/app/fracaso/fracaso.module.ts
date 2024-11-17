import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FracasoPageRoutingModule } from './fracaso-routing.module';

import { FracasoPage } from './fracaso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FracasoPageRoutingModule
  ],
  declarations: [FracasoPage]
})
export class FracasoPageModule {}
