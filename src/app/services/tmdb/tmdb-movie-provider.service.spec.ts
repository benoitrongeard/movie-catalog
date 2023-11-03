import { TestBed } from '@angular/core/testing';

import { TmdbMovieProviderService } from './tmdb-movie-provider.service';

describe('TmdbMovieProviderService', () => {
  let service: TmdbMovieProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbMovieProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
