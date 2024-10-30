import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilWebPageRoutingModule } from './perfil-web-routing.module';

import { PerfilWebPage } from './perfil-web.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilWebPageRoutingModule
  ],
  declarations: [PerfilWebPage]
})
export class PerfilWebPageModule {}
