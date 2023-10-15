import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { LanguageService } from './language.service';
import {
  LocalizedCountryNames,
  getNames,
  registerLocale,
} from 'i18n-iso-countries';

export interface Country {
  countryName: string;
  alpha2Key: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  countries!: Country[];
  countrySignal$: WritableSignal<Country[]> = signal([]);

  constructor(private languageService: LanguageService) {
    effect(() => {
      const language = this.languageService.languageSignal();
      if (language != null) {
        this.registerLocale(language).then(() => {
          this.countries = this.constructDTO(getNames(language));
          this.countrySignal$.set(this.countries);
        });
      }
    });
  }

  constructDTO(
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

  get countrySignal() {
    return this.countrySignal$.asReadonly();
  }

  async registerLocale(locale: string) {
    return registerLocale(
      await import(`i18n-iso-countries/langs/${locale}.json`)
    );
  }
}
