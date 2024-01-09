import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SwiperUtils } from 'src/app/utils/swiper.utils';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.css',
})
export class SwiperComponent extends LoaderComponent implements AfterViewInit {
  @ViewChild('swipper') swipper!: ElementRef;

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
