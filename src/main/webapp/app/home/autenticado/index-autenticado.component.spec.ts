import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAutenticadoComponent } from './index-autenticado.component';

describe('IndexAutenticadoComponent', () => {
  let component: IndexAutenticadoComponent;
  let fixture: ComponentFixture<IndexAutenticadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexAutenticadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexAutenticadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
