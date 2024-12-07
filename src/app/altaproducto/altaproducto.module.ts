import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaproductoPageRoutingModule } from './altaproducto-routing.module';

import { AltaproductoPage } from './altaproducto.page';

import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaproductoPageRoutingModule,
    SharedModule
  ],
  declarations: [AltaproductoPage]
})
export class AltaproductoPageModule {}
