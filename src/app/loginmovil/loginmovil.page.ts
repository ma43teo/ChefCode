import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-loginmovil',
  templateUrl: './loginmovil.page.html',
  styleUrls: ['./loginmovil.page.scss'],
})
export class LoginmovilPage {
  email: string = '';
  contrasena: string = '';

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController
  ) {}

  async loginm() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.contrasena);
      const user = userCredential.user;

      const userDocRef = doc(this.firestore, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await this.presentToast('Este usuario no está registrado.', 'warning');
        await this.auth.signOut();
        return;
      }

      // Verificar proveedor de autenticación
      if (userDoc.data()?.['provider'] !== 'password') {
        await this.presentToast('Este usuario se registró con Google. Usa Google para iniciar sesión.', 'warning');
        await this.auth.signOut();
        return;
      }

      await this.presentToast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error) {
      await this.presentToast('Error. Cuenta no registrada o contraseña incorrecta.', 'danger');
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      const userDocRef = doc(this.firestore, 'usuarios', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await this.presentToast('Este usuario no está registrado.', 'warning');
        await this.auth.signOut();
        return;
      }

      // Verificar proveedor de autenticación
      if (userDoc.data()?.['provider'] !== 'google.com') {
        await this.presentToast('Este usuario se registró con correo y contraseña. Usa ese método para iniciar sesión.', 'warning');
        await this.auth.signOut();
        return;
      }

      await this.presentToast('Inicio de sesión con Google exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error) {
      await this.presentToast('Error durante el inicio de sesión con Google: ' + (error as Error).message, 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color
    });
    toast.present();
  }

  Recuperar() {
    this.router.navigate(['/recuperar']);
  }
}
