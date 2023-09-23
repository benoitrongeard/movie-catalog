import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isMobileMenuOpen = false;
  title = 'menu.films';

  toggleMenuMobile() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
