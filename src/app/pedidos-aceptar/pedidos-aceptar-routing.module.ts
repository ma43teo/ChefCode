import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosAceptarPage } from './pedidos-aceptar.page';

const routes: Routes = [
  {
    path: '',
    component: PedidosAceptarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PedidosAceptarPageRoutingModule {}
