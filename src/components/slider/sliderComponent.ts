import {Component} from '@angular/core';
import { Slides } from 'ionic-angular';

@Component({selector:'slider-component'})
export class SliderComponent extends Slides{
    public options: any = {
        onSliderMove: (event: any) => this.allowedToSlide(event)
    };

    private allowedToSlide(swiper) {
        let slideIndex = this.getActiveIndex();
        let slide = swiper.slides[slideIndex];
        let zoomPan = slide.querySelector('[zoom-pan]');
        let isZoomed = (zoomPan.getAttribute('zoomed') !== 'false');
      
        if (isZoomed) {
            swiper.lockSwipes();
        } else {
            swiper.unlockSwipes();
        }
    }
}