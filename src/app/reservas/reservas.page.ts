import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ReservaModalComponent } from '../reserva-modal/reserva-modal.component';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

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
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM'
  ];
  minDate: string;
  maxDate: string;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private firestore: Firestore
  ) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Fecha mínima
    const maxDate = new Date();
    maxDate.setMonth(today.getMonth() + 1); // Un mes a partir de hoy
    this.maxDate = maxDate.toISOString().split('T')[0];

    // Establecer fecha inicial como la mínima
    this.fecha = this.minDate;
  }

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
      componentProps: {
        fecha: this.fecha,
        hora: this.hora,
        personas: this.personas
      }
    });

    await modal.present();

  }
}
