import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
declare var Hammer;

@Component({
  selector: 'kpp-zoom-pan',
  templateUrl: 'kpp-zoom-pan.html'
})
export class KppZoomPanComponent {
  @ViewChild('frame') frame: ElementRef;
  @ViewChild('zoomable') zoomable: ElementRef;
  isZoomed
  @Output() zoom: EventEmitter<boolean> = new EventEmitter();
  constructor() {

  }
  ngAfterViewInit() {
    this.setZoomed(false);
    const extraHeight = this.zoomable.nativeElement.clientHeight - this.frame.nativeElement.clientHeight;
    this.hammerIt(this.zoomable.nativeElement, extraHeight);
  }
  private setZoomed(zoomed) {
    this.isZoomed = zoomed;
  }

  private hammerIt(elm, extraHeight) {


    const hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
      enable: true
    });

    let posX = 0,
      posY = 0,
      scale = 1,
      last_scale = 1,
      last_posX = 0,
      last_posY = 0,
      max_pos_x = 0,
      max_pos_y = 0,
      transform = '';
    const el = elm;
    const translate_due_to_scale = { x: 0, y: 0 }

    hammertime.on('doubletap pan pinch panend pinchend', (ev) => {

      // pinch
      if (ev.type === 'pinch') {
        scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        console.log(ev.scale,el.clientWidth)
        translate_due_to_scale.x = (el.clientWidth / 2 - ev.center.x + posX  ) * (scale - 1)
        translate_due_to_scale.y = (el.clientHeight / 2 - ev.center.y + posY) * (scale - 1)

      }

      // pan
      //if (scale !== 1) {
      posX = last_posX + ev.deltaX;
      posY = last_posY + ev.deltaY;
      max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
      max_pos_y = Math.ceil(((scale - 1) * el.clientHeight / 2) + extraHeight);
      if (posX > max_pos_x) {
        posX = max_pos_x;
      }
      if (posX < -max_pos_x) {
        posX = -max_pos_x;
      }
      if (posY > max_pos_y - extraHeight) {
        posY = max_pos_y - extraHeight;
      }
      if (posY < -max_pos_y) {
        posY = -max_pos_y;
      }
      //}


      if (ev.type === 'pinchend') {
        last_scale = scale;
      }

      // panend
      if (ev.type === 'panend') {
        last_posX = Math.min(posX, max_pos_x);
        last_posY = Math.min(posY, max_pos_y);
      }

      if (ev.type === 'doubletap') {

        if (scale != 1) {
          scale = 1;
          last_scale = 1;
          posX = 0;
          posY = 0;
          last_posX = 0;
          last_posX = 0;
        } else {
          scale = 2;
          last_scale = 2;
        }
      }

      transform =
        'translate3d(' + translate_due_to_scale.x + 'px,' + translate_due_to_scale.y + 'px, 0) ' + //Translate due to zoom
        'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +  //translate due to pan
        'scale3d(' + scale + ', ' + scale + ', 1)';

      if (transform) {
        el.style.webkitTransform = transform;
      }

      if (scale <= 1) {
        this.setZoomed(false);
        this.zoom.emit(false);
      } else {
        this.setZoomed(true);
        this.zoom.emit(true);
      }
    });
  }
}
