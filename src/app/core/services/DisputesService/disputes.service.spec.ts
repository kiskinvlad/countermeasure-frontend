import { TestBed, inject } from '@angular/core/testing';

import { DisputesService } from './disputes.service';

describe('DisputesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisputesService]
    });
  });

  it('should be created', inject([DisputesService], (service: DisputesService) => {
    expect(service).toBeTruthy();
  }));
});
