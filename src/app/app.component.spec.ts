import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LanguageService } from './services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { FiltersComponent } from './pages/filters/filters.component';
import { ComboboxComponent } from './components/combobox/combobox.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        ReactiveFormsModule,
      ],
      providers: [LanguageService],
      declarations: [
        AppComponent,
        NavbarComponent,
        FiltersComponent,
        ComboboxComponent,
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'movie-catalog'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('movie-catalog');
  });

  it('should display navbar', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-navbar')).toBeTruthy();
  });
});
