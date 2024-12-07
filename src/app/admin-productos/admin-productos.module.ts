import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminProductosPageRoutingModule } from './admin-productos-routing.module';

import { AdminProductosPage } from './admin-productos.page';

import { AdminProductoModalModule } from '../admin-producto-modal/admin-producto-modal.module'; // Ajusta la ruta según tu estructura de archivos

import { SharedModule } from '../shared/shared.module'; 


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminProductosPageRoutingModule,
    AdminProductoModalModule,// Importa el módulo del modal aquí
    SharedModule
  ],
  declarations: [AdminProductosPage]
})
export class AdminProductosPageModule {}
