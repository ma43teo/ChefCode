import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAnterioresPageRoutingModule } from './pedidos-anteriores-routing.module';

import { PedidosAnterioresPage } from './pedidos-anteriores.page';

import { SharedModule } from '../shared/shared.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAnterioresPageRoutingModule,
    SharedModule
  ],
  declarations: [PedidosAnterioresPage],
  
})
export class PedidosAnterioresPageModule {}
