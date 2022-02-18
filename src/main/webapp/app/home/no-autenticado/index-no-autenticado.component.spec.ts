import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexNoAutenticadoComponent } from './index-no-autenticado.component';

describe('IndexNoAutenticadoComponent', () => {
  let component: IndexNoAutenticadoComponent;
  let fixture: ComponentFixture<IndexNoAutenticadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexNoAutenticadoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexNoAutenticadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
