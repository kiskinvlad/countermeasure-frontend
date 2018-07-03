import { TestBed, async, inject } from '@angular/core/testing';

import { AddTaxesGuard } from './add-taxes.guard';

describe('AddTaxesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTaxesGuard]
    });
  });

  it('should ...', inject([AddTaxesGuard], (guard: AddTaxesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
