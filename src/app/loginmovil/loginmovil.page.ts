import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private toastController: ToastController
  ) { }

  async loginm() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.contrasena);
      console.log('Inicio de sesión exitoso:', userCredential);
      await this.presentToast('Inicio de sesión exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error durante el inicio de sesión:', error);
      await this.presentToast('Error durante el inicio de sesión: ' + error.message, 'danger');
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(this.auth, provider);
      await this.presentToast('Inicio de sesión con Google exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      console.error('Error durante el inicio de sesión con Google:', error);
      await this.presentToast('Error durante el inicio de sesión con Google: ' + error.message, 'danger');
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

  Recuperar(){
    this.router.navigate(['/recuperar']);
  }
}
