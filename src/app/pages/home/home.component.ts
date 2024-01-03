import { Component } from '@angular/core';
import { TrendingComponent } from 'src/app/components/tmdb/trending/trending.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TrendingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
