import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { FilmsLayoutComponent } from './pages/films-layout/films-layout.component';
import { SeriesLayoutComponent } from './pages/series-layout/series-layout.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfigurationService } from './services/configuration.service';
import { Observable, switchMap } from 'rxjs';
import { TmdbConfigurationService } from './services/tmdb/tmdb-configuration.service';
import { TokenInterceptor } from './core/token.interceptor';
import { ComboboxWithBadgesComponent } from './components/combobox-with-badges/combobox-with-badges.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { SelectInputComponent } from './components/select-input/select-input.component';
import { ToastrModule } from 'ngx-toastr';
import { ToastrComponent } from './components/toastr/toastr.component';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

/**
 * Init the app with configuration and TMDB configuration
 * @param configurationService Service to load the app configuration
 * @param tmdbConfigurationService Service to load the TMDB configuration
 * @returns () => Observable<boolean>
 */
export function initApp(
  configurationService: ConfigurationService,
  tmdbConfigurationService: TmdbConfigurationService
): () => Observable<boolean> {
  return () => {
    // Return an observable that resolve the app configuration
    return configurationService.loadConfig().pipe(
      switchMap(() => {
        // Return an observable that resolve the TMDB configuration
        return tmdbConfigurationService.loadTMDBConfig();
      })
    );
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsLayoutComponent,
    SeriesLayoutComponent,
    FiltersComponent,
    ComboboxComponent,
    ComboboxWithBadgesComponent,
    SettingsComponent,
    SelectInputComponent,
    ToastrComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: navigator.languages[0].substring(0, 2),
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      toastComponent: ToastrComponent,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [ConfigurationService, TmdbConfigurationService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
