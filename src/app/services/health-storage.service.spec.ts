import { TestBed } from '@angular/core/testing';

import { HealthStorageService } from './health-storage.service';

describe('HealthStorageService', () => {
  let service: HealthStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
