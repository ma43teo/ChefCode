import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilmovilPage } from './perfilmovil.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilmovilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilmovilPageRoutingModule {}
