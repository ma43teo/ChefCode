import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, doc } from '@angular/fire/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-altaproducto',
  templateUrl: './altaproducto.page.html',
  styleUrls: ['./altaproducto.page.scss'],
})
export class AltaproductoPage implements OnInit {
  producto = {
    nombre: '',
    descripcion: '',
    precio: null, // Ahora acepta decimales
    categoria: '',
    disponible: '', // Nuevo campo disponible (Sí o No)
    imagenUrl: ''
  };
  imagenFile: File | null = null;

  constructor(
    private firestore: Firestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  // Método para seleccionar la imagen
  onImageChange(event: any) {
    this.imagenFile = event.target.files[0];
  }

  // Método para crear producto y subir la imagen a Firebase Storage
  async crearProducto() {
    if (this.imagenFile) {
      const storage = getStorage(); // Inicializa el almacenamiento

      // Subir la imagen a Firebase Storage
      const filePath = `productos/${new Date().getTime()}_${this.imagenFile.name}`;
      const fileRef = ref(storage, filePath);

      // Subir la imagen
      await uploadBytes(fileRef, this.imagenFile);

      // Obtener URL de la imagen una vez subida
      const url = await getDownloadURL(fileRef);
      this.producto.imagenUrl = url;

      // Guardar los datos del producto en Firestore
      await this.guardarProducto();
    } else {
      // Si no hay imagen, guardar solo los datos del producto
      await this.guardarProducto();
    }
  }

  // Guardar el producto en Firestore y organizarlo en subcolecciones
  async guardarProducto() {
    let subcoleccion = '';

    // Asignar subcolección dependiendo de la categoría seleccionada
    if (this.producto.categoria === 'platosprincipales') {
      subcoleccion = 'platosprincipales';
    } else if (this.producto.categoria === 'bebidas') {
      subcoleccion = 'bebidas';
    } else if (this.producto.categoria === 'postres') {
      subcoleccion = 'postres';
    }

    // Guardar producto en la colección 'productos' y su respectiva subcolección
    try {
      const docRef = doc(collection(this.firestore, 'productos'), subcoleccion);
      await addDoc(collection(docRef, 'items'), this.producto);

      // Mostrar mensaje de éxito
      this.mostrarToast('Producto creado correctamente');

      // Limpiar los campos
      this.limpiarCampos();
    } catch (error) {
      console.error('Error al agregar el producto: ', error);
    }
  }

  // Método para mostrar un mensaje de éxito
  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  // Método para limpiar los campos
  limpiarCampos() {
    this.producto = {
      nombre: '',
      descripcion: '',
      precio: null,
      categoria: '',
      disponible: '', // Limpiar campo disponible
      imagenUrl: ''
    };
    this.imagenFile = null;
  }
}
