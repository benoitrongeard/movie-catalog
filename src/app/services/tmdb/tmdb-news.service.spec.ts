import { TestBed } from '@angular/core/testing';

import { TmdbNewsService } from './tmdb-news.service';

describe('TmdbNewsService', () => {
  let service: TmdbNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TmdbNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
