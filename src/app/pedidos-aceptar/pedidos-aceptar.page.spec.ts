import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosAceptarPage } from './pedidos-aceptar.page';

describe('PedidosAceptarPage', () => {
  let component: PedidosAceptarPage;
  let fixture: ComponentFixture<PedidosAceptarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosAceptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
