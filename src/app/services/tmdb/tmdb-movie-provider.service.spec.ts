import { TestBed } from '@angular/core/testing';

import { TmdbMovieProviderService } from './tmdb-movie-provider.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TmdbMovieProviderService', () => {
  let service: TmdbMovieProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TmdbMovieProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
