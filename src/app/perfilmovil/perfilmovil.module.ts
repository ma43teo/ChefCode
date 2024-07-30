import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilmovilPageRoutingModule } from './perfilmovil-routing.module';

import { PerfilmovilPage } from './perfilmovil.page';

import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilmovilPageRoutingModule,
    SharedModule
  ],
  declarations: [PerfilmovilPage]
})
export class PerfilmovilPageModule {}
