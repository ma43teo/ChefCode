import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-web',
  templateUrl: './perfil-web.page.html',
  styleUrls: ['./perfil-web.page.scss'],
})
export class PerfilWebPage implements OnInit {
  user: any = {
    nombre: '',
    correo: '',
    avatar: 'https://cdn-icons-png.flaticon.com/512/11507/11507579.png',
    cargo: 'Gerente general',
    telefono: '',
  };
  uid: string = ''; // UID del usuario logueado
  id: string = ''; // ID del documento en Firestore

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getUserData();
  }

  // Obtener datos del administrador desde Firestore
  async getUserData() {
    onAuthStateChanged(this.auth, async (user: User | null) => {
      if (user) {
        this.uid = user.uid; // Obtiene el UID del usuario logueado
        console.log('Administrador autenticado con UID:', this.uid);

        try {
          // Usamos una consulta para encontrar el documento donde el campo 'id' es igual al UID del usuario logueado
          const adminsRef = collection(this.firestore, 'admins');
          const q = query(adminsRef, where('id', '==', this.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const adminDoc = querySnapshot.docs[0]; // Si encontramos el documento
            this.user = adminDoc.data(); // Asignamos los datos al objeto 'user'
            this.id = adminDoc.id; // Guardamos el ID del documento para referencia

            console.log('Datos del administrador:', this.user);
            console.log('ID del documento Firestore:', this.id);
          } else {
            console.log('No se encontró el documento del administrador en Firestore.');
          }
        } catch (error) {
          console.error('Error al obtener los datos del administrador:', error);
        }
      } else {
        console.log('No hay un administrador autenticado.');
      }
    });
  }

  // Subir avatar
  async uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `avatars/${this.uid}`;
      const storageRef = ref(this.storage, filePath);

      try {
        await uploadBytes(storageRef, file);
        const avatarUrl = await getDownloadURL(storageRef);

        // Actualizar Firestore
        const adminDocRef = doc(this.firestore, `admins/${this.id}`);
        await updateDoc(adminDocRef, { avatar: avatarUrl });

        this.user.avatar = avatarUrl; // Actualizar el avatar en la interfaz
        this.showToast('Avatar actualizado correctamente');
      } catch (error) {
        console.error('Error al subir el avatar:', error);
        this.showToast('Error al actualizar el avatar');
      }
    }
  }

  // Guardar cambios en los datos del usuario
  async saveChanges() {
    try {
      // Si el campo de cargo está vacío, se asigna por defecto "Gerente general"
      if (!this.user.cargo) {
        this.user.cargo = 'Gerente general';
      }

      // Actualizar Firestore con los nuevos datos
      const adminDocRef = doc(this.firestore, `admins/${this.id}`);
      await updateDoc(adminDocRef, { 
        telefono: this.user.telefono, 
        cargo: this.user.cargo 
      });

      this.showToast('Cambios guardados correctamente');
    } catch (error) {
      console.error('Error al guardar los cambios:', error);
      this.showToast('Error al guardar los cambios');
    }
  }

  // Mostrar mensaje en pantalla
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }

  // Cerrar sesión
  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar cierre de sesión',
      message: '¿Estás seguro que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          handler: async () => {
            try {
              await this.auth.signOut();
              this.showToast('Sesión cerrada correctamente');
              console.log('Sesión cerrada');
            } catch (error) {
              console.error('Error al cerrar sesión:', error);
              this.showToast('Error al cerrar sesión');
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
