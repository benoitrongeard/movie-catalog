import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { TMDBPageResult } from 'src/app/interfaces/tmdb-page-result.interface';
import { MovieNews } from 'src/app/interfaces/tmdb-movie-news.interface';
import { catchError, map } from 'rxjs';
import { ObjectUtils } from 'src/app/utils/object.utils';

@Injectable({
  providedIn: 'root',
})
export class TmdbNewsService {
  constructor(
    private _httpClient: HttpClient,
    private _configurationService: ConfigurationService
  ) {}

  getUpcomingMovies(language: string, region: string, page = 1) {
    return this._httpClient
      .get<TMDBPageResult<MovieNews>>(
        this._configurationService.getVercelProxyUrl() + `/movie/upcoming`,
        {
          params: {
            language: language,
            page: page,
            region: region,
          },
        }
      )
      .pipe(
        map((data: TMDBPageResult<MovieNews>) => {
          const movies: MovieNews[] = ObjectUtils.convertObjectToInterface<
            MovieNews[]
          >(data.results);
          return movies;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading movies news', error);
          throw new Error('Error loading movies news');
        })
      );
  }
}
