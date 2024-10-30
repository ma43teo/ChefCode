import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Para formularios basados en plantilla
import { ReactiveFormsModule } from '@angular/forms'; // Para formularios reactivos
import { HttpClientModule } from '@angular/common/http'; // Para realizar solicitudes HTTP
import { IonicModule } from '@ionic/angular'; // Para utilizar componentes de Ionic
import { CartModalComponent } from './cart-modal/cart-modal.component'; // Asegúrate de que la ruta sea correcta

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // Elige uno según tus necesidades: FormsModule o ReactiveFormsModule
    ReactiveFormsModule, // Si usas formularios reactivos
    HttpClientModule, // Si necesitas hacer solicitudes HTTP
    IonicModule, // Si usas componentes de Ionic
  ],
  declarations: [CartModalComponent],
  exports: [CartModalComponent], // Exporta para que otros módulos puedan usarlo
})
export class CartModule {}
