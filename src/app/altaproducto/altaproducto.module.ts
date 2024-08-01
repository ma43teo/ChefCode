import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaproductoPageRoutingModule } from './altaproducto-routing.module';

import { AltaproductoPage } from './altaproducto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaproductoPageRoutingModule
  ],
  declarations: [AltaproductoPage]
})
export class AltaproductoPageModule {}
