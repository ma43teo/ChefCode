import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPageModule } from './menu/menu.module'; 
import { SharedModule } from './shared/shared.module'; 
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';

import { PlatilloDetalleModalComponent } from './platillo-detalle-modal/platillo-detalle-modal.component';



@NgModule({
  declarations: [
    AppComponent, 
    ReservaModalComponent, PlatilloDetalleModalComponent,
  ],
  
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MenuPageModule, SharedModule, FormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
