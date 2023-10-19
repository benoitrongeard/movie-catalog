import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import {
  ImagesConfiguration,
  TmdbConfiguration,
} from 'src/app/interfaces/tmdb-configuration.interface';
import { ConfigurationService } from 'src/app/services/configuration.service';

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
      .get<TmdbConfiguration>(
        this.configurationService.getTMDBApiUrl() + '/configuration'
      )
      .pipe(
        map((config: TmdbConfiguration) => {
          this.configuration = config;
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading configuration', error);
          throw new Error('Error loading configuration');
        })
      );
  }

  getImages(): ImagesConfiguration {
    return this.configuration?.images;
  }

  getChangesKeys(): string[] {
    return this.configuration?.changeKeys;
  }
}
