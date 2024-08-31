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
      imagen: 'https://imgs.search.brave.com/M-2vDwpqd6yb6FSazOhbCYU9MDe_3ZC8XOM0ciOYd2k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODdlMzM3Zjk2ODYx/OTRhNTVhZGFiN2Mu/cG5n',
      nombre: 'Mojito',
      descripcion: 'Solo mencionar esta deliciosa bebida preparada evoca imágenes de noches embriagadoras en La Habana y te transporta a las soleadas costas del Caribe.'
    },
    {
      imagen: 'https://imgs.search.brave.com/fIM3AbxcYhu8kHv-DvJLy_OH8mOLdQB3igxlaVrjcqk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbHVz/cG5nLmNvbS9pbWct/cG5nL3BuZy1jb3Nt/b3BvbGl0YW4tc2t5/eS1jb3Ntby04NDcu/cG5n',
      nombre: 'Cosmopolitan',
      descripcion: 'Cosmopolitan ha experimentado diversas presentaciones, pero su combinación clásica de arándanos, cítricos y vodka ha mantenido su popularidad como uno de los cocteles más queridos.'
    },
    {
      imagen: 'https://imgs.search.brave.com/oUk5Wgzq_5VX1YRHITzrUYktRPESeVAj_rKQY4zVafk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODdlMzM5NTk2ODYx/OTRhNTVhZGFiN2Yu/cG5n',
      nombre: 'Margarita',
      descripcion: 'La Margarita es una de las bebidas preparadas más populares en América del Norte por una buena razón. '
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
