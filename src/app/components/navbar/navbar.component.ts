import { Component, Signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Event, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from 'src/app/services/language.service';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  headerTitle$: Signal<string | undefined>;
  @ViewChild(SettingsComponent, { static: true }) settings!: SettingsComponent;

  constructor(
    private router: Router,
    public languageService: LanguageService
  ) {
    this.headerTitle$ = toSignal(
      this.router.events.pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent =>
            e instanceof NavigationEnd
        ),
        map((e: RouterEvent) => e?.url?.replaceAll('/', ''))
      )
    );
  }

  toggleMenuMobile() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openSettings() {
    this.settings.open();
  }
}
