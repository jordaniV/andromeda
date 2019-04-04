import { TestBed } from '@angular/core/testing';

import { SensorDAOService } from './sensor-dao.service';

describe('SensorDAOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SensorDAOService = TestBed.get(SensorDAOService);
    expect(service).toBeTruthy();
  });
});
