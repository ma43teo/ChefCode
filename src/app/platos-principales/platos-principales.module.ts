import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatosPrincipalesPageRoutingModule } from './platos-principales-routing.module';

import { PlatosPrincipalesPage } from './platos-principales.page';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatosPrincipalesPageRoutingModule,
    SharedModule
  ],
  declarations: [PlatosPrincipalesPage]
})
export class PlatosPrincipalesPageModule {}
