import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importa tu componente modal
import { AdminProductoModalComponent } from './admin-producto-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [AdminProductoModalComponent],

})
export class AdminProductoModalModule {}
