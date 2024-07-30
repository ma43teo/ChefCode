import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';

interface Platillo {
  imagen: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.page.html',
  styleUrls: ['./entradas.page.scss'],
})
export class EntradasPage implements OnInit {

  platillos: Platillo[] = [
    {
      imagen: 'assets/img/platillo1.jpg',
      nombre: 'Nombre del platillo 1',
      descripcion: 'Descripción del platillo 1'
    },
    {
      imagen: 'assets/img/platillo2.jpg',
      nombre: 'Nombre del platillo 2',
      descripcion: 'Descripción del platillo 2'
    },
    {
      imagen: 'assets/img/platillo3.jpg',
      nombre: 'Nombre del platillo 3',
      descripcion: 'Descripción del platillo 3'
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
  async presentModal(platillo: Platillo) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: platillo }
    });
    return await modal.present();
  }

}
