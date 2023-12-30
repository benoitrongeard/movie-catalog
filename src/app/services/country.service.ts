import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { LanguageService } from './language.service';
import {
  LocalizedCountryNames,
  getNames,
  registerLocale,
} from 'i18n-iso-countries';
import { Country } from '../interfaces/country-interface';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  // List of countries, depend of current language
  private _countriesSignal$: WritableSignal<Country[]> = signal([]);
  // Current country selected
  private _countrySignal$: WritableSignal<Country | null> = signal(null);

  private _currentCountry!: Country;

  constructor(private languageService: LanguageService) {
    effect(() => {
      // Refresh countries list and current country when language changed
      this.loadCountries(this.languageService.languageSignal());
    });
  }

  /**
   * Load locale for given language and update countries
   * @param language Language to load
   */
  async loadCountries(language: string) {
    if (language != null) {
      await this.registerLocale(language);
      const countries = this.createCountries(getNames(language));
      // Update countries list
      this._countriesSignal$.set(countries);

      // Update current country
      const currentCountry = countries.find(
        country =>
          country.alpha2Key ==
          (this._currentCountry?.alpha2Key ??
            navigator?.language?.split('-')[1])
      );
      this._countrySignal$.set(currentCountry ?? null);
    }
  }

  /**
   * Map TMDB country list to Country interface list
   * @param countries LocalizedCountryNames TMDB object
   * @returns Array of {@link Country}
   */
  createCountries(
    countries: LocalizedCountryNames<{
      select: 'official';
    }>
  ): Country[] {
    const keys = Object.keys(countries);
    const countriesDTO: Country[] = [];
    keys.forEach(key => {
      countriesDTO.push({
        countryName: countries[key],
        alpha2Key: key,
      } as Country);
    });
    return countriesDTO;
  }

  get countriesSignal() {
    return this._countriesSignal$.asReadonly();
  }

  get countrySignal() {
    return this._countrySignal$.asReadonly();
  }

  updateCountry(country: Country) {
    this._countrySignal$.set(country);
    this._currentCountry = country;
  }

  async registerLocale(locale: string) {
    switch (locale) {
      case 'fr':
        return registerLocale(await import('i18n-iso-countries/langs/fr.json'));
      case 'en':
        return registerLocale(await import('i18n-iso-countries/langs/en.json'));
    }
  }
}
