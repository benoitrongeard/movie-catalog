import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
  standalone: true,
  imports: [],
})
export class LoaderComponent {
  @Input() loading = false;
  @Input() color = 'stroke-white';
}
