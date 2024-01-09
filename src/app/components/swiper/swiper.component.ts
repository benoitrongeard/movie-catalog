import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { SwiperUtils } from 'src/app/utils/swiper.utils';
import { LoaderComponent } from 'src/app/components/loader/loader.component';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [NgTemplateOutlet, LoaderComponent],
  // Used for custom element swiper
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
  styles: [
    `
      :host {
        @apply h-full;
        @apply w-full;
      }
    `,
  ],
})
export class SwiperComponent<T> implements AfterViewInit {
  @ViewChild('swipper') swipper!: ElementRef;
  @Input() items: T[] | undefined;
  @Input() loading = false;
  @Input() slideTemplate!: TemplateRef<unknown>;

  ngAfterViewInit(): void {
    this.initSwiper();
  }

  initSwiper() {
    const swiperEl = this.swipper.nativeElement;
    if (swiperEl) {
      Object.assign(swiperEl, SwiperUtils.swiperParams);
      swiperEl.initialize();
    }
  }
}
