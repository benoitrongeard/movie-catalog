import { Component, Signal, ViewChild } from '@angular/core';
import { NavigationEnd, Router, Event, RouterEvent } from '@angular/router';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsComponent } from 'src/app/pages/settings/settings.component';
import { Auth, signOut } from '@angular/fire/auth';

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
    private _router: Router,
    private _auth: Auth
  ) {
    this.headerTitle$ = toSignal(
      this._router.events.pipe(
        filter(
          (e: Event | RouterEvent): e is RouterEvent =>
            e instanceof NavigationEnd
        ),
        map(
          (e: RouterEvent) =>
            (e as NavigationEnd)?.urlAfterRedirects?.replaceAll('/', '') ??
            (e as NavigationEnd)?.url?.replaceAll('/', '')
        )
      )
    );
  }

  toggleMenuMobile() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  openSettings() {
    this.settings.open();
  }

  async signOut() {
    await signOut(this._auth);
    this._router.navigate(['/login']);
  }
}
