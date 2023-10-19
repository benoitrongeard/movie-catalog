import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfiguration } from 'src/app/interfaces/app-configuration.interface';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationService {
  private configuration!: AppConfiguration;
  constructor(private httpClient: HttpClient) {}

  loadConfig(): Observable<boolean> {
    return this.httpClient
      .get<AppConfiguration>('/assets/config/config.json')
      .pipe(
        map((config: AppConfiguration) => {
          this.configuration = config;
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error loading configuration', error);
          throw new Error('Error loading configuration');
        })
      );
  }

  isProduction(): boolean {
    return this.configuration?.production ?? false;
  }

  getTMDBApiUrl(): string {
    return this.configuration?.tmdbApiUrl ?? '';
  }

  getTMDBApiToken(): string {
    return this.configuration?.tmdbApiToken ?? '';
  }
}
