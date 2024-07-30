import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-platillo-detalle-modal',
  templateUrl: './platillo-detalle-modal.component.html',
  styleUrls: ['./platillo-detalle-modal.component.scss'],
})
export class PlatilloDetalleModalComponent {
  @Input() platillo: any;

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
