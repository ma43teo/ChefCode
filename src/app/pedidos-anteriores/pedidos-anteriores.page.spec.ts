import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PedidosAnterioresPage } from './pedidos-anteriores.page';

describe('PedidosAnterioresPage', () => {
  let component: PedidosAnterioresPage;
  let fixture: ComponentFixture<PedidosAnterioresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosAnterioresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
