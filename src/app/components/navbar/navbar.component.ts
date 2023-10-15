import { Component, Signal } from '@angular/core';
import { NavigationEnd, Router, Event, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  headerTitle$: Signal<string | undefined>;

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
}
