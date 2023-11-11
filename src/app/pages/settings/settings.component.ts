import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('500ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class SettingsComponent {
  @ViewChild('slideover', { static: false }) slideOver!: ElementRef;
  isOpen = false;

  /**
   * Open the settings panel
   */
  open() {
    this.isOpen = true;
  }

  /**
   * Close the settings panel
   */
  close() {
    this.isOpen = false;
  }

  /**
   * Detect if the user click outside the settings panel and close it
   * @param event Click event
   * @param targetElement HTML element targeted by the click
   * @returns void
   */
  @HostListener('document:click', ['$event', '$event.target'])
  public clickOutsideAndClose(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement || !this.slideOver || !this.isOpen) {
      return;
    }

    const clickedInside = this.slideOver.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.close();
    }
  }
}
