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
      imagen: 'https://imgs.search.brave.com/4C707KTnPRLDUYTvNu2Gp_NaiQb_LvJZ_cfCTnbgA5w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLWNsaXBhcnQv/MjAyMTExMDUvb3Vy/bWlkL3BuZ3RyZWUt/bmFzaS1nb3Jlbmct/a2FtcHVuZy1zZWFm/b29kLXBuZy1pbWFn/ZV80MDIyNDI1LnBu/Zw',
      nombre: 'Sopa de Mariscos',
      descripcion: 'Pescado, camarón, cangrejo, calamar y pulpo en un consomé de vino blanco y ajo.'
    },
    {
      imagen: 'https://w7.pngwing.com/pngs/822/38/png-transparent-chicken-parm-thumbnail.png',
      nombre: 'Pollo a la Parmesana',
      descripcion: 'Pollo empanizado con salsa marinara casera y queso mozzarella, servido con un acompañamiento de espaghetti marinara y vegetales.'
    },
    {
      imagen: 'https://png.pngtree.com/png-vector/20240130/ourmid/pngtree-home-made-spaghetti-bolognese-made-with-meat-and-pasta-isolated-illustration-png-image_11570454.png',
      nombre: 'Espaguetti de la Casa',
      descripcion: 'Salsa de tomate casera con ajo aceite de oliva y albahaca fresca con pan de ajo'
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
