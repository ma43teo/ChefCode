import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component'; // Ajusta la ruta según la ubicación del modal
import { Observable, of } from 'rxjs'; // Importamos "of" para inicializar el observable

interface Bebida {
  imagenUrl: string;
  nombre: string;
  descripcion: string;
  precio: number; // Asegúrate de tener el campo precio en Firestore
}

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit {
  bebidas$: Observable<Bebida[]> = of([]); // Inicializamos como un observable vacío

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    // Conectar a la colección de bebidas en Firestore
    const bebidasRef = collection(this.firestore, 'productos', 'bebidas', 'items');
    this.bebidas$ = collectionData(bebidasRef, { idField: 'id' }) as Observable<Bebida[]>;
  }

  async presentModal(bebida: Bebida) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: bebida } // Puedes usar un nombre diferente si lo prefieres
    });
    return await modal.present();
  }
}
