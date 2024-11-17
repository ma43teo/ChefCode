import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FracasoPage } from './fracaso.page';

const routes: Routes = [
  {
    path: '',
    component: FracasoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FracasoPageRoutingModule {}
