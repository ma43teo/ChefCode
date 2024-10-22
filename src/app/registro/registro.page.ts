import { Firestore, collection, addDoc, query, where, getDocs, doc, setDoc } from '@angular/fire/firestore'; // Asegúrate de incluir 'doc' aquí
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
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
        // Verifica si el correo ya está registrado en la colección usuarios
        const usersQuery = query(collection(this.firestore, 'usuarios'), where('correo', '==', email));
        const userDocs = await getDocs(usersQuery);

        if (!userDocs.empty) {
          // Si ya existe un usuario con este correo
          await this.presentToast('Ya existe una cuenta asociada a este correo.', 'warning');
          return;
        }

        // Verifica si el email ya está registrado en Firebase Authentication
        const signInMethods = await fetchSignInMethodsForEmail(this.auth, email);
        
        if (signInMethods.length > 0) {
          // Si ya existe un método de inicio de sesión para este email
          await this.presentToast('Esta cuenta ya está registrada.', 'warning');
          return;
        }

        // Crear el usuario con Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, contrasena);
        
        // Guardar los datos del usuario en Firestore
        const userRef = doc(this.firestore, 'usuarios', userCredential.user.uid); // Cambiado a 'doc'
        await setDoc(userRef, {
          nombre,
          correo: email, // Asegúrate de que este campo sea 'correo' en Firestore
          uid: userCredential.user.uid,
          createdAt: new Date().toISOString()
        });

        await this.presentToast('Registro exitoso', 'success');
        this.router.navigate(['/home']);
      } catch (error) {
        await this.presentToast('Error. El correo electrónico ingresado ya está registrado.', 'danger');
      }
    } else {
      console.warn('Formulario no válido');
      await this.presentToast('Por favor, complete todos los campos correctamente.', 'warning');
    }
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      // Verifica si el correo electrónico ya está en la colección admins
      const adminsQuery = query(collection(this.firestore, 'admins'), where('correo', '==', user.email));
      const adminDocs = await getDocs(adminsQuery);

      if (!adminDocs.empty) {
        // Si se encuentra el correo en admins, no se permite el inicio de sesión
        await this.presentToast('Ya tienes acceso como administrador. No puedes iniciar sesión con esta cuenta.', 'warning');
        return;
      }

      // Verifica si el correo ya está en la colección usuarios
      const usersQuery = query(collection(this.firestore, 'usuarios'), where('correo', '==', user.email));
      const userDocs = await getDocs(usersQuery);

      if (!userDocs.empty) {
        // Si se encuentra el correo en usuarios, no se permite el inicio de sesión
        await this.presentToast('Ya tienes una cuenta registrada con este correo. No puedes iniciar sesión con Google.', 'warning');
        return;
      }

      // Si no existe en usuarios, agrega el nuevo usuario a Firestore
      const userDocRef = doc(this.firestore, 'usuarios', user.uid);
      await setDoc(userDocRef, {
        nombre: user.displayName || 'Nombre no disponible',
        correo: user.email,
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      await this.presentToast('Inicio de sesión con Google exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error durante el inicio de sesión con Google:', error);
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
