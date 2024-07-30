import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PlatilloDetalleModalComponent } from '../platillo-detalle-modal/platillo-detalle-modal.component';

interface Plato {
  imagen: string;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-platos-principales',
  templateUrl: './platos-principales.page.html',
  styleUrls: ['./platos-principales.page.scss'],
})
export class PlatosPrincipalesPage implements OnInit {

  platos: Plato[] = [
    {
      imagen: 'assets/img/plato1.jpg',
      nombre: 'Nombre del plato 1',
      descripcion: 'Descripción del plato 1'
    },
    {
      imagen: 'assets/img/plato2.jpg',
      nombre: 'Nombre del plato 2',
      descripcion: 'Descripción del plato 2'
    },
    {
      imagen: 'assets/img/plato3.jpg',
      nombre: 'Nombre del plato 3',
      descripcion: 'Descripción del plato 3'
    }
  ];

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async presentModal(plato: Plato) {
    const modal = await this.modalController.create({
      component: PlatilloDetalleModalComponent,
      componentProps: { platillo: plato } // Puedes usar un nombre diferente si lo prefieres
    });
    return await modal.present();
  }

}
