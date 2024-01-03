import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  effect,
  inject,
  untracked,
} from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';
import { TmdbTrendingService } from 'src/app/services/tmdb/tmdb-trending.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { TmdbConfigurationService } from 'src/app/services/tmdb/tmdb-configuration.service';
import {
  TMDBTrending,
  TMDMediaType,
} from 'src/app/interfaces/tmdb-trending.interface';
import { SwiperUtils } from 'src/app/utils/swiper.utils';
import { Country } from 'src/app/interfaces/country-interface';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [LoaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements AfterViewInit {
  trendingService = inject(TmdbTrendingService);
  countryService = inject(CountryService);
  languageService = inject(LanguageService);
  tmdbConfigurationService = inject(TmdbConfigurationService);
  error: string | undefined;
  trends: TMDBTrending[] | undefined;
  TMDMediaType = TMDMediaType;

  constructor() {
    effect(() => {
      const country = this.countryService.countrySignal();
      const language = untracked(() => this.languageService.languageSignal());
      if (country && language) {
        this.trends = undefined;
        this.loadTrends(language, country);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      Object.assign(swiperEl, SwiperUtils.swiperParams);
      swiperEl.initialize();
    }
  }

  async loadTrends(language: string, country: Country) {
    try {
      const TMDBlanguage = `${language}-${country?.alpha2Key}`;
      this.trends = await this.trendingService.getWeeklyTrending(TMDBlanguage);
    } catch (error) {
      console.log('error');
      this.error = error as string;
    }
  }
}
