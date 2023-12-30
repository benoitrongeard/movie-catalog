import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map } from 'rxjs';
import { TmdbMovieProvider } from 'src/app/interfaces/tmdb-movie-provider.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ObjectUtils } from 'src/app/utils/object.utils';
import { StringUtils } from 'src/app/utils/string.utils';

type DataResult = {
  results: TmdbMovieProvider[];
};

@Injectable({
  providedIn: 'root',
})
export class TmdbMovieProviderService {
  constructor(
    private _httpClient: HttpClient,
    private _configurationService: ConfigurationService
  ) {}

  getMovieProviders(
    language: string,
    region: string
  ): Promise<TmdbMovieProvider[]> {
    return firstValueFrom(
      this._httpClient
        .get<DataResult>(
          this._configurationService.getVercelProxyUrl() +
            '/watch/providers/movie',
          {
            params: {
              language: language,
              watch_region: region,
            },
          }
        )
        .pipe(
          map((data: DataResult) => {
            const providers: TmdbMovieProvider[] =
              ObjectUtils.convertObjectToInterface<TmdbMovieProvider[]>(
                data.results
              );

            providers.sort((a, b) =>
              StringUtils.ignoreCaseAndDiacritic(a.providerName) <
              StringUtils.ignoreCaseAndDiacritic(b.providerName)
                ? -1
                : 1
            );
            return providers;
          }),
          catchError((error: HttpErrorResponse) => {
            console.error('Error loading movie providers', error);
            throw new Error('Error loading movie providers');
          })
        )
    );
  }
}
