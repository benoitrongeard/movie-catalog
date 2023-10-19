import { Component, effect } from '@angular/core';
import { Country, CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
})
export class FiltersComponent {
  countries!: Country[];
  constructor(private countryService: CountryService) {
    effect(() => {
      this.countries = this.countryService.countrySignal();
      //TODO RESET GLOBAL FORM
    });
  }

  /**
   * Called when a country is selected in form
   * @param country Country selected
   */
  countryChangeEvent(country: Country) {
    console.log('changement de pays', country);
  }
}
