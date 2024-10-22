import { Component, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';
import { Observable, of } from 'rxjs';

interface Postre {
  imagenUrl: string;  // Aquí es donde los postres guardan la imagen
  nombre: string;
  precio: number;
  disponible: boolean;
}

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {
  postres$: Observable<Postre[]> = of([]);

  constructor(private firestore: Firestore, private modalController: ModalController) {}

  ngOnInit() {
    const postresRef = collection(this.firestore, 'productos', 'postres', 'items');
    this.postres$ = collectionData(postresRef, { idField: 'id' }) as Observable<Postre[]>;
  }

  async presentModal(item: any) {
    // Asignamos una propiedad común 'imagen' al abrir el modal
    const modalItem = {
      ...item,
      imagen: item.imagenUrl || item.imagen || '' // Dependiendo de si es postre, bebida o plato
    };
  
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: modalItem }
    });
    return await modal.present();
  }
}  
