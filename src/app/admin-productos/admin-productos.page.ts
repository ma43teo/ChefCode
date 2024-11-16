import { Component, OnInit } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { AdminProductoModalComponent } from '../admin-producto-modal/admin-producto-modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.page.html',
  styleUrls: ['./admin-productos.page.scss'],
})
export class AdminProductosPage implements OnInit {
  productosPorCategoria: { [categoria: string]: any[] } = {}; // Objeto para almacenar productos por categoría
  categorias: string[] = ['platosprincipales', 'bebidas', 'postres']; // Arreglo de categorías específicas

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  async obtenerProductos() {
    // Iteramos sobre cada categoría específica
    for (const categoria of this.categorias) {
      const itemsRef = collection(this.firestore, `productos/${categoria}/items`);
      const itemsSnapshot = await getDocs(itemsRef);

      // Asignamos los productos a la categoría correspondiente
      this.productosPorCategoria[categoria] = itemsSnapshot.docs.map(doc => ({
        id: doc.id, // Aquí se obtiene el itemId
        ...doc.data()
      }));

      console.log(`Productos en la categoría "${categoria}":`, this.productosPorCategoria[categoria]);
    }

    console.log('Categorías obtenidas:', this.categorias);
  }

  async openModal(producto: any) {
    const modal = await this.modalController.create({
      component: AdminProductoModalComponent,
      componentProps: { producto } // Pasa el producto al modal
    });
    return await modal.present();
  }
}
