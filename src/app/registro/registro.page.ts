import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: Auth,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registrationForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],  // Solo letras y espacios
      email: ['', [Validators.required, Validators.email]], // Validación de correo electrónico
      contrasena: ['', [Validators.required, Validators.minLength(6)]] // Mínimo 6 caracteres para la contraseña
    });
  }

  async register() {
    if (this.registrationForm.valid) {
      const { email, contrasena } = this.registrationForm.value;

      try {
        await createUserWithEmailAndPassword(this.auth, email, contrasena);
        await this.presentToast('Registro exitoso', 'success');
        this.router.navigate(['/home']);
      } catch (error: any) {
        console.error('Error durante el registro:', error);
        await this.presentToast('Error durante el registro: ' + error.message, 'danger');
      }
    } else {
      console.warn('Formulario no válido');
      await this.presentToast('Por favor, complete todos los campos correctamente.', 'warning');
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
}
