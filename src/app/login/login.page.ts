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
  isUIDValid: boolean = false; // Variable para verificar si el UID es válido

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
      // Verifica si el UID existe en la colección de administradores
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
    if (!this.isUIDValid) {
      this.presentToast('Por favor, valida tu UID primero.');
      return;
    }

    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(this.auth, provider);
      const user = result.user;

      // Guarda los datos del usuario en el mismo UID que se validó
      this.saveAdminData(this.uid, user.displayName ?? 'Sin nombre', user.email ?? 'Sin email');

      // Redirecciona a la página principal
      this.router.navigate(['/home-web']);
    } catch (error) {
      console.error('Error de autenticación:', error);
      this.presentToast('Error al iniciar sesión con Google.');
    }
  }

  // Método para guardar los datos del usuario en Firestore
  async saveAdminData(adminUID: string, nombre: string, email: string) {
    // Asegúrate de que estás usando el mismo UID validado
    const adminRef = doc(this.firestore, `admins/${adminUID}`);

    const adminData = {
      id: adminUID,
      nombre: nombre,
      correo: email,
    };

    try {
      await setDoc(adminRef, adminData, { merge: true });
      this.presentToast('Datos del administrador guardados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      this.presentToast('Error al guardar los datos del administrador.');
    }
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
