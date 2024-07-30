import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatosPrincipalesPage } from './platos-principales.page';

const routes: Routes = [
  {
    path: '',
    component: PlatosPrincipalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatosPrincipalesPageRoutingModule {}
