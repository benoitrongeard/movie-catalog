import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Country } from 'src/app/services/country.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ComboboxWithBadgesComponent } from './combobox-with-badges.component';

describe('ComboboxWithBadgesComponent', () => {
  let component: ComboboxWithBadgesComponent<Country>;
  let fixture: ComponentFixture<ComboboxWithBadgesComponent<Country>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboboxWithBadgesComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    });
    fixture = TestBed.createComponent(ComboboxWithBadgesComponent<Country>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
