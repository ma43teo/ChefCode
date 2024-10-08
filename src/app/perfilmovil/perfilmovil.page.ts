import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfilmovil',
  templateUrl: './perfilmovil.page.html',
  styleUrls: ['./perfilmovil.page.scss'],
})
export class PerfilmovilPage implements OnInit {
  nombreCompleto: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  uid: string = '';
  avatar: string = ''; // Para las iniciales del avatar

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Utilizar onAuthStateChanged para detectar cambios de estado de autenticación
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        
        console.log('Usuario logueado con UID:', this.uid);

        try {
          // Obtener los datos del usuario desde Firestore
          const userDocRef = doc(this.firestore, `usuarios/${this.uid}`);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            console.log('Datos del usuario:', userData);
            
            this.nombreCompleto = userData['nombre'] || '';
            this.telefono = userData['telefono'] || ''; // Si no existe aún, estará vacío
            this.correoElectronico = userData['email'] || '';

            // Generar las iniciales para el avatar
            this.avatar = this.generarAvatar(this.nombreCompleto);
          } else {
            console.log('No se encontró el documento del usuario en Firestore.');
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      } else {
        console.log('No hay un usuario logueado.');
      }
    });
  }

  // Función para generar las iniciales del nombre y apellido
  generarAvatar(nombreCompleto: string): string {
    const partes = nombreCompleto.split(' ');
    const iniciales = partes.length > 1 
      ? partes[0].charAt(0).toUpperCase() + partes[1].charAt(0).toUpperCase()
      : nombreCompleto.charAt(0).toUpperCase();
    return iniciales;
  }

  async guardarCambios() {
    try {
      // Verificar que el usuario tenga un UID
      if (!this.uid) {
        console.log('UID no encontrado, no se puede actualizar el teléfono.');
        return;
      }

      // Actualizar solo el teléfono en la colección 'usuarios'
      const userDocRef = doc(this.firestore, `usuarios/${this.uid}`);
      await updateDoc(userDocRef, {
        telefono: this.telefono,
      });

      await this.presentToast('Teléfono actualizado correctamente', 'success');
    } catch (error) {
      console.error('Error al actualizar el teléfono:', error);
      await this.presentToast('Error al actualizar el teléfono', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
