import { TestBed } from '@angular/core/testing';

import { ConsultargiroServiceService } from './consultargiro-service.service';

describe('ConsultargiroServiceService', () => {
  let service: ConsultargiroServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultargiroServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
