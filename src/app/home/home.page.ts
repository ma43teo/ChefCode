import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import Swiper, { Navigation, Autoplay } from 'swiper';

// Instala los módulos de Swiper necesarios
Swiper.use([Navigation, Autoplay]);

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('swiper') swiperElement!: ElementRef;
  swiper: Swiper | undefined;

  constructor() {}

  ngAfterViewInit() {
    if (this.swiperElement && this.swiperElement.nativeElement) {
      this.swiper = new Swiper(this.swiperElement.nativeElement, {
        loop: true,
        autoplay: {
          delay: 5000,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });
    }
  }
}
