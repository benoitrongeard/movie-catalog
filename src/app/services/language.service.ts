import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageSignal$: WritableSignal<string>;

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang(
      translateService.getBrowserLang() ?? 'en'
    );
    this.languageSignal$ = signal(this.translateService.getDefaultLang());
  }

  get languageSignal(): Signal<string> {
    return this.languageSignal$.asReadonly();
  }

  get defaultLanguage(): string {
    return this.translateService.getDefaultLang();
  }

  updateLanguage(language: string) {
    this.translateService.use(language);
    this.languageSignal$.set(language);
  }
}
