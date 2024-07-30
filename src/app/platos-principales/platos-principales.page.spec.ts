import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatosPrincipalesPage } from './platos-principales.page';

describe('PlatosPrincipalesPage', () => {
  let component: PlatosPrincipalesPage;
  let fixture: ComponentFixture<PlatosPrincipalesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatosPrincipalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
