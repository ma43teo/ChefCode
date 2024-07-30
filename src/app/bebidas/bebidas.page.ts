import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component'; // Ajusta la ruta según la ubicación del modal

interface Bebida {
  imagen: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit {

  bebidas: Bebida[] = [
    {
      imagen: 'assets/img/bebida1.jpg',
      nombre: 'Nombre de bebida 1',
      descripcion: 'Descripción de bebida 1'
    },
    {
      imagen: 'assets/img/bebida2.jpg',
      nombre: 'Nombre de bebida 2',
      descripcion: 'Descripción de bebida 2'
    },
    {
      imagen: 'assets/img/bebida3.jpg',
      nombre: 'Nombre de bebida 3',
      descripcion: 'Descripción de bebida 3'
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal(bebida: Bebida) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: bebida } // Puedes usar un nombre diferente si lo prefieres
    });
    return await modal.present();
  }
}
