import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map } from 'rxjs';
import { TmdbMovieProvider } from 'src/app/interfaces/tmdb-movie-provider.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ObjectUtils } from 'src/app/utils/object.utils';

type DataResult = {
  results: TmdbMovieProvider[];
};

@Injectable({
  providedIn: 'root',
})
export class TmdbMovieProviderService {
  constructor(
    private httpClient: HttpClient,
    private configurationService: ConfigurationService
  ) {}

  getMovieProviders(
    language: string,
    region: string
  ): Promise<TmdbMovieProvider[]> {
    return firstValueFrom(
      this.httpClient
        .get<DataResult>(
          this.configurationService.getTMDBApiUrl() + '/watch/providers/movie',
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
              a.providerName < b.providerName ? -1 : 1
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
