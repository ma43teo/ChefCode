import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrega',
  templateUrl: './entrega.page.html',
  styleUrls: ['./entrega.page.scss'],
})
export class EntregaPage implements OnInit {
  nombreCompleto: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  domicilio: string = ''; // Para futuras expansiones
  uid: string = ''; // UID del usuario autenticado
  currentStep = 1;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  async obtenerDatosUsuario() {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        this.uid = user.uid;
        console.log('Usuario autenticado con UID:', this.uid);

        try {
          const userDocRef = doc(this.firestore, `usuarios/${this.uid}`);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            this.nombreCompleto = data['nombre'] || '';
            this.correoElectronico = data['correo'] || '';
            this.telefono = data['telefono'] || '';
            console.log('Datos de entrega:', data);
          } else {
            console.error('No se encontraron datos del usuario en Firestore.');
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      } else {
        console.error('No hay un usuario autenticado.');
      }
    });
  }

  agregarDomicilio() {
    this.router.navigate(['/agregar']); // Redirigir a la vista para agregar domicilio
  }

  Home() {
    this.router.navigate(['/home']);
  }

  Pedir() {
    this.router.navigate(['/pedido']);
  }

  Reserva() {
    this.router.navigate(['/reservar']);
  }

  Perfil() {
    this.router.navigate(['/perfil']);
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }
}
