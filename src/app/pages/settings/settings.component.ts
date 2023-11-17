import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  effect,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/interfaces/country-interface';
import { LanguageListInterface } from 'src/app/interfaces/language-list-interface';
import { CountryService } from 'src/app/services/country.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SettingsComponent {
  @ViewChild('slideover', { static: false }) slideOver!: ElementRef;
  isOpen = false;
  settingsForm!: FormGroup;
  countries!: Country[];
  languages!: LanguageListInterface[];

  constructor(
    public languageService: LanguageService,
    private _countryService: CountryService,
    private _fb: FormBuilder
  ) {
    effect(() => {
      this.initForm();
      this.countries = this._countryService.countriesSignal();
      this.languages = this.languageService.getLanguageList();
    });
  }

  initForm() {
    this.settingsForm = this._fb.group({
      language: [this.languageService.languageSignal()],
      country: [this._countryService.countrySignal()?.alpha2Key],
    });
  }

  resetForm() {
    this.settingsForm.reset();
  }

  /**
   * Open the settings panel
   */
  open() {
    this.isOpen = true;
  }

  /**
   * Close the settings panel
   */
  close() {
    this.isOpen = false;
  }

  get languageControl() {
    return this.settingsForm.get('language');
  }

  get countryControl() {
    return this.settingsForm.get('country');
  }

  /**
   * Detect if the user click outside the settings panel and close it
   * @param event Click event
   * @param targetElement HTML element targeted by the click
   * @returns void
   */
  @HostListener('document:click', ['$event', '$event.target'])
  public clickOutsideAndClose(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement || !this.slideOver || !this.isOpen) {
      return;
    }

    const clickedInside = this.slideOver.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.close();
      this.initForm();
    }
  }
}
