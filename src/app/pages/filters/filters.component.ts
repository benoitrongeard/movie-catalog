import { Component, effect } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';
import { LanguageService } from './../../services/language.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  countries!: Country[];
  form: FormGroup = this.formBuilder.group({
    language: new FormControl<string | null>(null),
    region: new FormControl<string | null>(null),
    with_watch_providers: new FormControl<string | null>(null),
  });
  constructor(
    private countryService: CountryService,
    private languageService: LanguageService,
    private formBuilder: FormBuilder
  ) {
    /// When country list changed, we need to reload the form taht depends on it
    effect(() => {
      this.countries = this.countryService.countrySignal();
      this.form.controls['language'].reset();
      this.form.controls['region'].reset();
      this.form.controls['with_watch_providers'].reset();
      //TODO RESET GLOBAL FORM
    });
  }

  /**
   * Called when a country is selected in form
   * Update form fields that depends on country
   * @param country Country selected
   */
  countryChangeEvent(country: Country) {
    this.form.controls['language'].setValue(
      `${this.languageService.languageSignal()}-${country.alpha2Key}`
    );
    this.form.controls['region'].setValue(country.alpha2Key);
  }
}
