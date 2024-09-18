import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeWebPage } from './home-web.page';

const routes: Routes = [
  {
    path: '',
    component: HomeWebPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeWebPageRoutingModule {}
