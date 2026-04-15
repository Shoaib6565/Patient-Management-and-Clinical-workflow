import { TestBed } from '@angular/core/testing';

import { PracticeLocationService } from './practice-location.service';

describe('PracticeLocationService', () => {
  let service: PracticeLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PracticeLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
