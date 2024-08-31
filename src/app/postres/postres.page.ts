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
      imagen: 'https://imgs.search.brave.com/mWWmC8k5R2Ly1_dzrYMSJHLGzllufLbRyfm-A5JyGSk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/OGIxNmNlZjEwMmRk/ZWNkZWUwZGQwMjUu/cG5n',
      nombre: 'Créme brulée',
      descripcion: 'Un postre similar es la crema catalana, que se elabora con los mismos ingredientes, aunque se diferencian en el proceso de cocción.'
    },
    {
      imagen: 'https://imgs.search.brave.com/EbQp9GYQvvQJgkM8XOLjD08zpIDi1tIzoTzm54v0IRY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDQv/MzE0Lzc2NS9zbWFs/bC9waWVjZS1vZi1j/aG9jb2xhdGUtY2Fr/ZS1pc29sYXRlZC1v/bi10cmFuc3BhcmVu/dC1iYWNrZ3JvdW5k/LXBuZy5wbmc',
      nombre: 'Coulant de chocolate',
      descripcion: 'Es un pastel relleno de chocolate caliente y líquido que se desborda en un espectáculo que vale la pena presenciar y paladear.'
    },
    {
      imagen: 'https://imgs.search.brave.com/uQTe-KoeTc3ltMzWmeG5gXg-oCHtlxjkuKPOF21LYjk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/OGIxNmFjZDEwMmRk/ZWNkZWUwZGQwMGYu/cG5n',
      nombre: 'Profiteroles',
      descripcion: 'En la cocina española es habitual servirlos como postres dulces. Los más conocidos son los de crema, de nata y los de chocolate'
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
