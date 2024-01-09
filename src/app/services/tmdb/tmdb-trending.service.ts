import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../configuration.service';
import { catchError, firstValueFrom, map } from 'rxjs';
import { ObjectUtils } from 'src/app/utils/object.utils';
import { TMDBPageResult } from 'src/app/interfaces/tmdb-page-result.interface';
import { TMDBTrending } from 'src/app/interfaces/tmdb-trending.interface';

@Injectable({
  providedIn: 'root',
})
export class TmdbTrendingService {
  constructor(
    private _httpClient: HttpClient,
    private _configurationService: ConfigurationService
  ) {}

  getWeeklyTrending(language: string, type: 'movie' | 'tv' | 'all') {
    return firstValueFrom(
      this._httpClient
        .get<TMDBPageResult<TMDBTrending>>(
          this._configurationService.getVercelProxyUrl() +
            `/trending/${type}/week`,
          {
            params: {
              language: language,
            },
          }
        )
        .pipe(
          map((data: TMDBPageResult<TMDBTrending>) => {
            const trendings: TMDBTrending[] =
              ObjectUtils.convertObjectToInterface<TMDBTrending[]>(
                data.results
              );
            return trendings;
          }),
          catchError((error: HttpErrorResponse) => {
            console.error(error);
            throw new Error('Error loading trending movies');
          })
        )
    );
  }
}
