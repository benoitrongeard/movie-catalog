import { TestBed } from '@angular/core/testing';

import { TmdbConfigurationService } from './tmdb-configuration.service';

describe('TmdbConfigurationService', () => {
  let service: TmdbConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
