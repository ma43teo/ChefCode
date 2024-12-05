// entrega.page.ts
import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service'; 

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {
  nombreCompleto: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  domicilio: string = '';
  tipoEntrega: string = ''; // Añadido para capturar el tipo de entrega
  uid: string = ''; // UID del usuario autenticado
  currentStep = 1;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        try {
          const userDocRef = doc(this.firestore, `usuarios/${this.uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            this.nombreCompleto = data['nombre'] || '';
            this.correoElectronico = data['correo'] || '';
            this.telefono = data['telefono'] || '';
            console.log('Datos de entrega:', data);

            // Guardamos los datos del usuario en el servicio
            this.orderService.updateUserInfo({
              nombre: this.nombreCompleto,
              correo: this.correoElectronico,
              telefono: this.telefono
            });
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      }
    });
  }

  agregarDomicilio() {
    // Actualizar tipo de entrega junto con el domicilio
    this.orderService.updateDeliveryInfo({
      tipoEntrega: this.tipoEntrega, // Agregar tipo de entrega
      domicilio: this.domicilio
    });

    this.router.navigate(['/agregar']); // Redirigir a la página de agregar
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
}
