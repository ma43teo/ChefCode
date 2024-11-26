import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
})
export class BienvenidaPage implements OnInit {

  constructor(
    private router: Router
  ) {  }

  ngOnInit() {
  }
  crear(){
    this.router.navigate(['/registro']);
  }

  loguear(){
    this.router.navigate(['/loginmovil']);
  }
  admin(){
    this.router.navigate(['/login']);
  }

}
