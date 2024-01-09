import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-title-separator',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './title-separator.component.html',
  styleUrl: './title-separator.component.css',
})
export class TitleSeparatorComponent {
  @Input() title!: string;
}
