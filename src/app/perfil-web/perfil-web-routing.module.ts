import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilWebPage } from './perfil-web.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilWebPageRoutingModule {}
