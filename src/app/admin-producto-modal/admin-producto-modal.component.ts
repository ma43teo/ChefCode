import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-admin-producto-modal',
  templateUrl: './admin-producto-modal.component.html',
  styleUrls: ['./admin-producto-modal.component.scss'],
})
export class AdminProductoModalComponent {
  @Input() producto: any; // Producto que se va a editar o eliminar

  constructor(
    private modalController: ModalController,
    private firestore: Firestore
  ) {}

  close() {
    this.modalController.dismiss();
  }

  async saveChanges() {
    const productoRef = doc(this.firestore, `productos/${this.producto.id}`);
    await updateDoc(productoRef, {
      nombre: this.producto.nombre,
      descripcion: this.producto.descripcion,
      precio: this.producto.precio,
      disponible: this.producto.disponible,
    });
    this.close();
  }

  async deleteProduct() {
    const productoRef = doc(this.firestore, `productos/${this.producto.id}`);
    await deleteDoc(productoRef);
    this.close();
  }
}
