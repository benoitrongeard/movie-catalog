import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import {
  ImagesConfiguration,
  TmdbConfiguration,
} from 'src/app/interfaces/tmdb-configuration.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ObjectUtils } from 'src/app/utils/object.utils';

@Injectable({
  providedIn: 'root',
})
export class TmdbConfigurationService {
  private configuration!: TmdbConfiguration;

  constructor(
    private httpClient: HttpClient,
    private configurationService: ConfigurationService
  ) {}

  loadTMDBConfig(): Observable<boolean> {
    return this.httpClient
      .get(this.configurationService.getVercelProxyUrl() + '/configuration')
      .pipe(
        map(config => {
          this.configuration =
            ObjectUtils.convertObjectToInterface<TmdbConfiguration>(config);
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading configuration', error);
          throw new Error('Error loading configuration');
        })
      );
  }

  getImageConfiguration(): ImagesConfiguration {
    return this.configuration?.images;
  }

  getChangesKeys(): string[] {
    return this.configuration?.changeKeys;
  }
}
