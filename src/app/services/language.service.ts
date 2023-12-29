import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageListInterface } from '../interfaces/language-list-interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSignal$: WritableSignal<string>;
  private languageList: LanguageListInterface[] = [];

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(
      this.getBrowserLanguage() == 'fr' ? 'fr' : 'en'
    );
    this.languageSignal$ = signal(this.translateService.getDefaultLang());
    this.initLanguageList();
  }

  private async initLanguageList() {
    this.languageList = [];
    const defaultsLanguage: LanguageListInterface[] = [
      {
        language: 'en',
        name: await firstValueFrom(this.translateService.get('language.en')),
        iconName: 'GB',
      },
      {
        language: 'fr',
        name: await firstValueFrom(this.translateService.get('language.fr')),
        iconName: 'FR',
      },
    ];
    this.languageList.push(...defaultsLanguage);
  }

  getLanguageList() {
    return this.languageList;
  }

  get languageSignal(): Signal<string> {
    return this.languageSignal$.asReadonly();
  }

  get defaultLanguage(): string {
    return this.translateService.getDefaultLang();
  }

  getBrowserLanguage(): string | undefined {
    return this.translateService.getBrowserLang();
  }

  getTrad(key: string | Array<string>, interpolateParams?: object) {
    return this.translateService.get(key, interpolateParams);
  }

  async updateLanguage(language: string) {
    await firstValueFrom(this.translateService.use(language));
    this.languageSignal$.set(language);
  }
}
