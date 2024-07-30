import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginmovilPageRoutingModule } from './loginmovil-routing.module';

import { LoginmovilPage } from './loginmovil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginmovilPageRoutingModule
  ],
  declarations: [LoginmovilPage]
})
export class LoginmovilPageModule {}
