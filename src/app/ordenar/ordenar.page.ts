import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordenar',
  templateUrl: './ordenar.page.html',
  styleUrls: ['./ordenar.page.scss'],
})
export class OrdenarPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  plato(){
    this.router.navigate(['/platos-principales']);
  }
  bebida(){
    this.router.navigate(['/bebidas']);
  }
  postre(){
    this.router.navigate(['/postres']);
  }

}
