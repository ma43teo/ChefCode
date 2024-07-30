import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loginmovil',
  templateUrl: './loginmovil.page.html',
  styleUrls: ['./loginmovil.page.scss'],
})
export class LoginmovilPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginm() {
    // Aquí puedes implementar la lógica para registrar al usuario
    console.log('Registrando usuario...');
    // Puedes agregar aquí la lógica para enviar los datos del formulario al servidor
  }

}
