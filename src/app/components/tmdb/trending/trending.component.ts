import { Component, Input, effect, inject, untracked } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';
import { TmdbTrendingService } from 'src/app/services/tmdb/tmdb-trending.service';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import {
  TMDBTrending,
  TMDMediaType,
} from 'src/app/interfaces/tmdb-trending.interface';
import { Country } from 'src/app/interfaces/country-interface';
import { TMDBImagePipe } from 'src/app/pipes/tmdb-image.pipe';
import { PosterSizes } from 'src/app/interfaces/tmdb-configuration.interface';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, PercentPipe } from '@angular/common';
import { VoteColorPipe } from 'src/app/pipes/vote-color.pipe';
import { AveragePipe } from 'src/app/pipes/average.pipe';
import { TitleSeparatorComponent } from 'src/app/components/title-separator/title-separator.component';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';

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
    TitleSeparatorComponent,
    SwiperComponent,
  ],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css',
})
export class TrendingComponent extends LoaderComponent {
  trendingService = inject(TmdbTrendingService);
  countryService = inject(CountryService);
  languageService = inject(LanguageService);
  trends: TMDBTrending[] | undefined;
  @Input() mediaType: 'movie' | 'tv' | 'all' = 'all';

  /* ENUM */
  TMDMediaType = TMDMediaType;
  PosterSizes = PosterSizes;

  constructor() {
    super();
    effect(() => {
      const country = this.countryService.countrySignal();
      const language = untracked(() => this.languageService.languageSignal());
      if (country && language) {
        this.loadTrends(language, country);
      }
    });
  }

  async loadTrends(language: string, country: Country) {
    try {
      this.loading = true;
      const TMDBlanguage = `${language}-${country?.alpha2Key}`;
      this.trends = await this.trendingService.getWeeklyTrending(
        TMDBlanguage,
        this.mediaType
      );
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
  }
}
