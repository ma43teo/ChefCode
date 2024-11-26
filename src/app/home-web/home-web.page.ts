import { Component } from '@angular/core';
import { Auth, onAuthStateChanged, User } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-web',
  templateUrl: './home-web.page.html',
  styleUrls: ['./home-web.page.scss'],
})
export class HomeWebPage {
  user: any = {
    nombre: '',
  };
  uid: string = ''; // UID del usuario logueado
  id: string = ''; // ID del documento en Firestore


  constructor( private auth: Auth,
    private firestore: Firestore,private router: Router
    ) {
    
   }

  ngOnInit() {
    this.getUserData();
  }

  navigate(page: string) {
    console.log('Navigate to ${page}');
    // Implementar navegación aquí
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


  showAppointmentHistory() {
    console.log('Mostrar historial de citas');
    // Implementar funcionalidad aquí
  }

  addPatient() {
    console.log('Agregar paciente');
    // Implementar funcionalidad aquí
  }

  viewDetails(section: string) {
    console.log('Ver detalles de ${section}');
    // Implementar funcionalidad aquí
  }
  
  home() {
    this.router.navigate(['/home-web']);
  }
  
 
  cart() {
    this.router.navigate(['/pedidos']);
  }
  
  calendar() {
    this.router.navigate(['/reservaciones']);
  }
  
  add() {
    this.router.navigate(['/altaproducto']);
  }
  
  create() {
    this.router.navigate(['/admin-productos']);
  }

  person() {
    this.router.navigate(['/perfil-web']);
  }
}