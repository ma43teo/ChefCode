import { Component } from '@angular/core';

@Component({
  selector: 'app-perfilmovil',
  templateUrl: './perfilmovil.page.html',
  styleUrls: ['./perfilmovil.page.scss'],
})
export class PerfilmovilPage {
  nombreCompleto: string = '';
  telefono: string = '';
  correoElectronico: string = '';
  fotoPerfil: File | undefined;

  constructor() {
    this.nombreCompleto = 'Nombre del Usuario';
    this.telefono = '1234567890';
    this.correoElectronico = 'correo@example.com';
  }

  guardarCambios() {
    console.log('Guardando cambios...');
    console.log('Nombre Completo:', this.nombreCompleto);
    console.log('Teléfono:', this.telefono);
    console.log('Correo Electrónico:', this.correoElectronico);
    console.log('Foto de Perfil:', this.fotoPerfil);
  }

  onFileSelected(event: Event) {
    this.fotoPerfil = (event.target as HTMLInputElement).files![0];
    console.log('Archivo seleccionado:', this.fotoPerfil);
  }
}
