// src/app/components/reserva-modal/reserva-modal.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Auth, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.component.html',
  styleUrls: ['./reserva-modal.component.scss'],
})
export class ReservaModalComponent implements OnInit {
  @Input() fecha!: string;
  @Input() hora!: string;
  @Input() personas!: number;

  userId: string = '';
  nombre: string = '';
  telefono: string = '';
  phoneNumberError: boolean = false;

  constructor(
    private modalController: ModalController,
    private auth: Auth,
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Obtener el usuario logueado
    const user: User | null = this.auth.currentUser;
    if (user) {
      this.userId = user.uid;

      // Obtener datos adicionales del usuario desde Firestore
      const userDoc = doc(this.firestore, `usuarios/${this.userId}`);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        this.nombre = userData['nombre'] || '';
        this.telefono = userData['telefono'] || '';
      }
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }

  customCounterFormatter(inputLength: number, maxLength: number): string {
    return `${inputLength} / ${maxLength}`;
  }

  validatePhoneNumber(event: any) {
    const input = event.target.value;
    const phoneNumberPattern = /^[0-9]{10}$/;

    this.phoneNumberError = !phoneNumberPattern.test(input);

    if (!this.phoneNumberError) {
      this.telefono = input;
    }
  }

  async confirmarReserva() {
    if (this.nombre && !this.phoneNumberError) {
      try {
        // Crear una nueva reserva en la colección "reservas" con un ID generado automáticamente
        const reservasCollection = collection(this.firestore, 'reservas');
        await addDoc(reservasCollection, {
          fecha: this.fecha,
          hora: this.hora,
          personas: this.personas,
          nombre: this.nombre,
          telefono: this.telefono,
          userId: this.userId // Agregar el ID del usuario como un campo dentro del documento
        });

        // Mostrar mensaje de éxito
        await this.showToast('Reserva completada exitosamente.');
        this.modalController.dismiss({
          success: true,
          fecha: this.fecha,
          hora: this.hora,
          personas: this.personas,
          nombre: this.nombre,
          telefono: this.telefono,
          userId: this.userId
        });
      } catch (error) {
        console.error('Error al guardar la reserva:', error);
        await this.showToast('Error al completar la reserva. Intenta de nuevo.');
      }
    } else {
      await this.showToast('Por favor, completa todos los campos correctamente.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
    });
    await toast.present();
  }
}
