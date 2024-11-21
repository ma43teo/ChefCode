import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PedidosAceptarPageRoutingModule } from './pedidos-aceptar-routing.module';

import { PedidosAceptarPage } from './pedidos-aceptar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PedidosAceptarPageRoutingModule
  ],
  declarations: [PedidosAceptarPage]
})
export class PedidosAceptarPageModule {}

