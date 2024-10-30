import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilWebPage } from './perfil-web.page';

describe('PerfilWebPage', () => {
  let component: PerfilWebPage;
  let fixture: ComponentFixture<PerfilWebPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilWebPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
