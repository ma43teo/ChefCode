import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilmovilPage } from './perfilmovil.page';

describe('PerfilmovilPage', () => {
  let component: PerfilmovilPage;
  let fixture: ComponentFixture<PerfilmovilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilmovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
