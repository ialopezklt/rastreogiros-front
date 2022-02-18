import { TestBed } from '@angular/core/testing';

import { ConsultaEstadoGiroService } from './consulta-estado-giro.service';

describe('ConsultaEstadoGiroService', () => {
  let service: ConsultaEstadoGiroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaEstadoGiroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
