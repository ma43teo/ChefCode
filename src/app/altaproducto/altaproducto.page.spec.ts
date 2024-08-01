import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AltaproductoPage } from './altaproducto.page';

describe('AltaproductoPage', () => {
  let component: AltaproductoPage;
  let fixture: ComponentFixture<AltaproductoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaproductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
