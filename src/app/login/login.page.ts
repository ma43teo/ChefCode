import { Component, OnInit } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  uid: string = ''; // UID que se ingresa manualmente
  phoneNumber: string = ''; // Número de teléfono que se ingresa
  isUIDValid: boolean = false; // Variable para verificar si el UID es válido
  showUID: boolean = false; // Variable para controlar si el UID es visible

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  // Método para validar el UID en Firestore
  async validateUID() {
    try {
      const docRef = doc(this.firestore, `admins/${this.uid}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        this.isUIDValid = true;
        this.presentToast('UID válido, puedes iniciar sesión.');
      } else {
        this.isUIDValid = false;
        this.presentToast('UID no válido, por favor revisa.');
      }
    } catch (error) {
      console.error('Error validando UID:', error);
      this.presentToast('Error al validar el UID, intenta de nuevo.');
    }
  }

  // Método para iniciar sesión con Google
  async loginWithGoogle() {
    if (!this.uid) {
      this.presentToast('Por favor, ingresa tu UID.');
      return;
    }

    await this.validateUID(); // Validar UID primero

    if (this.isUIDValid) {
      const provider = new GoogleAuthProvider();

      try {
        const docRef = doc(this.firestore, `admins/${this.uid}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const adminData = docSnap.data();

          // Verificar si ya existe una cuenta de Google asociada al UID
          if (adminData['id']) {
            // Si ya hay una cuenta de Google, verificar que sea la misma
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            if (adminData['id'] === user.uid) {
              this.router.navigate(['/home-web']);
              this.presentToast('Inicio de sesión exitoso.');
            } else {
              this.presentToast('Este UID ya está asociado a otra cuenta de Google.');
            }
          } else {
            // No hay cuenta de Google asociada, proceder a registrar
            const result = await signInWithPopup(this.auth, provider);
            const user = result.user;

            // Guarda los datos del usuario en la colección admins
            await this.saveAdminData(user.uid, user.displayName ?? 'Sin nombre', user.email ?? 'Sin email');
            this.router.navigate(['/home-web']);
          }
        } else {
          this.presentToast('El UID no es válido, por favor, verifica.');
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        this.presentToast('Error al iniciar sesión con Google.');
      }
    } else {
      this.presentToast('El UID no es válido, por favor, verifica.');
    }
  }

  // Método para guardar o actualizar los datos del administrador en Firestore
  async saveAdminData(authUID: string, nombre: string, email: string) {
    const adminRef = doc(this.firestore, `admins/${this.uid}`);

    const adminData = {
      // Guardar el UID de autenticación como ID principal
      id: authUID, // UID generado por Firebase Authentication
      adminUID: this.uid, // UID proporcionado por el administrador
      nombre: nombre,
      correo: email,
      telefono: this.phoneNumber, // Guardar el número de teléfono
    };

    try {
      await setDoc(adminRef, adminData, { merge: true });
      this.presentToast('Datos del administrador guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      this.presentToast('Error al guardar los datos del administrador.');
    }
  }

  // Método para alternar la visibilidad del UID
  toggleUIDVisibility() {
    this.showUID = !this.showUID;
  }

  // Método para mostrar mensajes de toast
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
