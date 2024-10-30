import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostresPageRoutingModule } from './postres-routing.module';

import { PostresPage } from './postres.page';

import { SharedModule } from '../shared/shared.module'; 

import { CartModule } from '../cart.module'; 



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostresPageRoutingModule,
    SharedModule,
    CartModule // Importa el CartModule aquí

  ],
  declarations: [PostresPage]
})
export class PostresPageModule {}
