import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeWebPageRoutingModule } from './home-web-routing.module';

import { HomeWebPage } from './home-web.page';
import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeWebPageRoutingModule,
    SharedModule
  ],
  declarations: [HomeWebPage]
})
export class HomeWebPageModule {}
