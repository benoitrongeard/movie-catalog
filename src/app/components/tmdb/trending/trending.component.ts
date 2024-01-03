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
import {
  TMDBTrending,
  TMDMediaType,
} from 'src/app/interfaces/tmdb-trending.interface';
import { SwiperUtils } from 'src/app/utils/swiper.utils';
import { Country } from 'src/app/interfaces/country-interface';
import { TMDBImagePipe } from 'src/app/pipes/tmdb-image.pipe';
import { PosterSizes } from 'src/app/interfaces/tmdb-configuration.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, PercentPipe } from '@angular/common';
import { VoteColorPipe } from 'src/app/pipes/vote-color.pipe';
import { AveragePipe } from 'src/app/pipes/average.pipe';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [
    LoaderComponent,
    TMDBImagePipe,
    TranslateModule,
    PercentPipe,
    NgClass,
    VoteColorPipe,
    AveragePipe,
  ],
  // Used for custom element swiper
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent implements AfterViewInit {
  trendingService = inject(TmdbTrendingService);
  countryService = inject(CountryService);
  languageService = inject(LanguageService);
  error: string | undefined;
  trends: TMDBTrending[] | undefined;

  /* ENUM */
  TMDMediaType = TMDMediaType;
  PosterSizes = PosterSizes;

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
