import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReservaModalComponent } from '../reserva-modal/reserva-modal.component'; // Asegúrate de importar el componente del modal

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage {
  fecha: string = '';
  hora: string = '';
  personas: number = 1;
  horas: string[] = [
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00'
  ];

  constructor(private alertController: AlertController, private modalController: ModalController) { }

  async reservar() {
    if (!this.fecha || !this.hora) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor, selecciona tanto la fecha como la hora.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const modal = await this.modalController.create({
      component: ReservaModalComponent,
    });

    await modal.present();
  }
}


