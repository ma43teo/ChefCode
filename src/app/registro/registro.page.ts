import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc, getDoc, setDoc } from '@angular/fire/firestore';


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
        // Crear el usuario con Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(this.auth, email, contrasena);
        
        // Guardar los datos del usuario en Firestore
        const userRef = collection(this.firestore, 'usuarios');
        await addDoc(userRef, {
          nombre,
          email,
          uid: userCredential.user.uid,
          createdAt: new Date().toISOString()
        });

        await this.presentToast('Registro exitoso', 'success');
        this.router.navigate(['/home']);
      } catch (error) {
        console.error('Error durante el registro:', error);
        await this.presentToast('Error durante el registro: ' + (error as Error).message, 'danger');
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
  
      // Referencia al documento del usuario
      const userDocRef = doc(this.firestore, 'usuarios', user.uid);
      
      // Verifica si el usuario ya está en la colección
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // Si no existe, agrega el nuevo usuario a Firestore
        await setDoc(userDocRef, {
          nombre: user.displayName || 'Nombre no disponible',
          email: user.email,
          uid: user.uid,
          createdAt: new Date().toISOString()
        });
      }
  
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