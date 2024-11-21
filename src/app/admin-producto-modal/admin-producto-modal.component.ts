import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Firestore, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';

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
    // Obtén la referencia al producto con el ID y la categoría
    const productoRef = doc(this.firestore, `productos/${this.producto.categoria}/items/${this.producto.id}`);
    
    try {
      // Actualiza los datos del producto
      await updateDoc(productoRef, {
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        disponible: this.producto.disponible,
      });
      this.close();
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
    }
  }

  async deleteProduct() {
    const productoRef = doc(this.firestore, `productos/${this.producto.categoria}/items/${this.producto.id}`);
    
    try {
      // Elimina el producto
      await deleteDoc(productoRef);
      this.close();
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  }
}
