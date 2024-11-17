import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FracasoPage } from './fracaso.page';

describe('FracasoPage', () => {
  let component: FracasoPage;
  let fixture: ComponentFixture<FracasoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FracasoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
