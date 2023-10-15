import { TestBed } from '@angular/core/testing';
import { CountryService } from './country.service';
import { LanguageService } from './language.service';
import { TranslateModule } from '@ngx-translate/core';

describe('CountryService', () => {
  let service: CountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [LanguageService],
    });
    service = TestBed.inject(CountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
