import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginmovilPage } from './loginmovil.page';

describe('LoginmovilPage', () => {
  let component: LoginmovilPage;
  let fixture: ComponentFixture<LoginmovilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginmovilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
