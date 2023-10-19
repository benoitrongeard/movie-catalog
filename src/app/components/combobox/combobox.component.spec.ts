import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxComponent } from './combobox.component';
import { Country } from 'src/app/services/country.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('ComboboxComponent', () => {
  let component: ComboboxComponent<Country>;
  let fixture: ComponentFixture<ComboboxComponent<Country>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComboboxComponent],
      imports: [ReactiveFormsModule, TranslateModule.forRoot()],
    });
    fixture = TestBed.createComponent(ComboboxComponent<Country>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
