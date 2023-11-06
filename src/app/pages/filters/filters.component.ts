import { Component, effect } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';
import { LanguageService } from './../../services/language.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TmdbMovieProvider } from 'src/app/interfaces/tmdb-movie-provider.interface';
import { TmdbMovieProviderService } from 'src/app/services/tmdb/tmdb-movie-provider.service';
import { TmdbConfigurationService } from 'src/app/services/tmdb/tmdb-configuration.service';
import { ImagesConfiguration } from 'src/app/interfaces/tmdb-configuration.interface';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  countries!: Country[];
  providers: TmdbMovieProvider[] = [];
  filtersForm: FormGroup = this.formBuilder.group({
    language: new FormControl<string | null>(null),
    region: new FormControl<string | null>(null),
    with_watch_providers: new FormArray<FormControl<string>>([]),
  });
  tmdbImageConfiguration: ImagesConfiguration;

  constructor(
    private countryService: CountryService,
    private languageService: LanguageService,
    private tmdbMovieProviderService: TmdbMovieProviderService,
    private formBuilder: FormBuilder,
    private tmdbconfig: TmdbConfigurationService
  ) {
    /// Get image configuration from TMDB
    this.tmdbImageConfiguration = tmdbconfig.getImageConfiguration();

    /// When country list changed, we need to reload the form taht depends on it
    effect(() => {
      this.countries = this.countryService.countrySignal();
      this.providers = [];
      this.filtersForm.controls['language'].reset();
      this.filtersForm.controls['region'].reset();
      this.filtersForm.controls['with_watch_providers'].reset();
    });
  }

  get providersForm() {
    return this.filtersForm.controls['with_watch_providers'] as FormArray;
  }

  /**
   * Called when a country is selected
   * Update form fields that depends on country
   * @param country Country selected
   */
  countryChangeEvent(country: Country) {
    this.filtersForm.controls['language'].setValue(
      `${this.languageService.languageSignal()}-${country.alpha2Key}`
    );
    this.filtersForm.controls['region'].setValue(country.alpha2Key);

    this.loadMovieProviders();
  }

  /**
   * Load TMDB movie providers
   */
  async loadMovieProviders() {
    const language = this.filtersForm.controls['language'].value;
    const region = this.filtersForm.controls['region'].value;
    this.providers =
      (await this.tmdbMovieProviderService.getMovieProviders(
        language,
        region
      )) ?? [];
  }

  /**
   * Called when a provider is selected
   * Update form fields
   * @param provider TmdbMovieProvider selected
   */
  movieProviderChangeEvent(providers: TmdbMovieProvider[]) {
    this.providersForm.clear();
    providers.forEach(provider => {
      const control = new FormControl<string>(provider.providerId);
      this.providersForm.push(control);
    });
  }
}
