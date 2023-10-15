import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilmsLayoutComponent } from './pages/films-layout/films-layout.component';
import { SeriesLayoutComponent } from './pages/series-layout/series-layout.component';
import { FiltersComponent } from './pages/filters/filters.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilmsLayoutComponent,
    SeriesLayoutComponent,
    FiltersComponent,
    ComboboxComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
