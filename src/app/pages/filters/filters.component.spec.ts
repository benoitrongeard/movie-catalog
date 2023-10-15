import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ComboboxComponent } from 'src/app/components/combobox/combobox.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent, ComboboxComponent],
      imports: [TranslateModule.forRoot(), ReactiveFormsModule],
      providers: [LanguageService, CountryService],
    });
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
