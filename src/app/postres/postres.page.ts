import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component'; // Ajusta la ruta según la ubicación del modal

interface Postre {
  imagen: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-postres',
  templateUrl: './postres.page.html',
  styleUrls: ['./postres.page.scss'],
})
export class PostresPage implements OnInit {

  postres: Postre[] = [
    {
      imagen: 'assets/img/postre1.jpg',
      nombre: 'Nombre del postre 1',
      descripcion: 'Descripción del postre 1'
    },
    {
      imagen: 'assets/img/postre2.jpg',
      nombre: 'Nombre del postre 2',
      descripcion: 'Descripción del postre 2'
    },
    {
      imagen: 'assets/img/postre3.jpg',
      nombre: 'Nombre del postre 3',
      descripcion: 'Descripción del postre 3'
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal(postre: Postre) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: postre } // Puedes usar un nombre diferente si lo prefieres
    });
    return await modal.present();
  }
}
