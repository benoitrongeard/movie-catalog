import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageListInterface } from '../interfaces/language-list-interface';

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
    const defaultsLanguage: LanguageListInterface[] = [
      {
        language: 'en',
        name: 'language.en',
      },
      { language: 'fr', name: 'language.fr' },
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

  updateLanguage(language: string) {
    this.translateService.use(language);
    this.languageSignal$.set(language);
  }
}
