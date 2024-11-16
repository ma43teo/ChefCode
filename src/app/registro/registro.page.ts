import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Firestore, doc, setDoc, collection, query, where, getDocs } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private firestore: Firestore,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registrationForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async register() {
    if (this.registrationForm.valid) {
      const { nombre, email, contrasena } = this.registrationForm.value;

      try {
        const adminsQuery = query(collection(this.firestore, 'admins'), where('correo', '==', email));
        const adminDocs = await getDocs(adminsQuery);
        if (!adminDocs.empty) {
          await this.presentToast('Este correo está registrado como administrador. No puedes registrarte como usuario regular.', 'warning');
          return;
        }

        // Verificar si el usuario ya está registrado
        const usersQuery = query(collection(this.firestore, 'usuarios'), where('correo', '==', email));
        const userDocs = await getDocs(usersQuery);
        if (!userDocs.empty) {
          await this.presentToast('Ya existe una cuenta asociada a este correo.', 'warning');
          return;
        }

        // Verificar métodos de inicio de sesión
        const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
        if (signInMethods.length > 0) {
          await this.presentToast('Esta cuenta ya está registrada. No se puede usar el mismo correo para diferentes métodos de autenticación.', 'warning');
          return;
        }

        // Registro con correo y contraseña
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, contrasena);
        const userRef = doc(this.firestore, 'usuarios', userCredential.user.uid);
        await setDoc(userRef, {
          nombre,
          correo: email,
          uid: userCredential.user.uid,
          provider: 'password',  // Guarda el proveedor de autenticación
          createdAt: new Date().toISOString()
        });

        await this.presentToast('Registro exitoso', 'success');
        this.router.navigate(['/home']);
      } catch (error) {
        await this.presentToast('Error. El correo electrónico ingresado ya está registrado.', 'danger');
      }
    } else {
      await this.presentToast('Por favor, complete todos los campos correctamente.', 'warning');
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      const adminsQuery = query(collection(this.firestore, 'admins'), where('correo', '==', user.email));
      const adminDocs = await getDocs(adminsQuery);
      if (!adminDocs.empty) {
        await this.presentToast('Ya tienes acceso como administrador. No puedes iniciar sesión con esta cuenta.', 'warning');
        return;
      }

      // Verificar si el usuario ya está registrado
      const usersQuery = query(collection(this.firestore, 'usuarios'), where('correo', '==', user.email));
      const userDocs = await getDocs(usersQuery);
      if (!userDocs.empty) {
        await this.presentToast('Ya tienes una cuenta registrada con este correo. No puedes iniciar sesión con Google.', 'warning');
        return;
      }

      // Registro con Google
      const userDocRef = doc(this.firestore, 'usuarios', user.uid);
      await setDoc(userDocRef, {
        nombre: user.displayName || 'Nombre no disponible',
        correo: user.email,
        uid: user.uid,
        provider: 'google.com',  // Guarda el proveedor de autenticación
        createdAt: new Date().toISOString()
      });

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
}
