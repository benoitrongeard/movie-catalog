import { TestBed } from '@angular/core/testing';

import { TmdbConfigurationService } from './tmdb-configuration.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TmdbConfigurationService', () => {
  let service: TmdbConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TmdbConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
