import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular'; // Importar Ionic Storage

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuPageModule } from './menu/menu.module'; 
import { SharedModule } from './shared/shared.module'; 
import { ReservaModalComponent } from './reserva-modal/reserva-modal.component';

import { PlatilloDetalleModalComponent } from './platillo-detalle-modal/platillo-detalle-modal.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { getFunctions, provideFunctions } from '@angular/fire/functions';







@NgModule({
  declarations: [
    AppComponent, 
    ReservaModalComponent, PlatilloDetalleModalComponent
  ],
  
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, MenuPageModule, SharedModule, FormsModule, ReactiveFormsModule,  IonicStorageModule.forRoot(),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp(environment.firebase)),
     provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()), provideMessaging(() => getMessaging()), provideStorage(() => getStorage()), provideFunctions(() => getFunctions())],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
