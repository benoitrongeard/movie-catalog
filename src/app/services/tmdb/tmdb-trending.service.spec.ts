import { TestBed } from '@angular/core/testing';

import { TmdbTrendingService } from './tmdb-trending.service';

describe('TmdbTrendingService', () => {
  let service: TmdbTrendingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbTrendingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
