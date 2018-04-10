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
    const extraHeight = 0;

    this.setZoomListeners(this.zoomable.nativeElement, extraHeight);
  }

  private setZoomed(zoomed) {
    this.isZoomed = zoomed;
  }

  private setZoomListeners(elm, extraHeight) {
    //despl = (w*scale-w)/2 - (location*(newscale/oldscale)-location)

    //Configure event handling
    const hammer = new Hammer(elm, {});
    hammer.get('pinch').set({ enable: true });
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })
    //Initialize variables
    let posX = 0,
      posY = 0,
      scale = 1,
      lastScale = 1,
      lastPosX = 0,
      lastPosY = 0,
      max_pos_x = 0,
      max_pos_y = 0,
      transform = '';
    const el = elm;
    const translate_due_to_scale = { x: 0, y: 0 }

    hammer.on('doubletap pan pinch panend pinchend', (ev) => {
      lastScale = scale;
      // pinch
      if (ev.type === 'pinch') {
        scale = Math.max(.999, Math.min(lastScale * (ev.scale), 4));
        //translate_due_to_scale.x = (el.clientWidth / 2 - ev.center.x + posX) * (scale - 1)
        //translate_due_to_scale.y = (el.clientHeight / 2 - ev.center.y + posY) * (scale - 1)
        translate_due_to_scale.x = ((el.clientWidth * scale - el.clientWidth) / 2 - (ev.center.x * (scale / lastScale) - ev.center.x));
        translate_due_to_scale.y = ((el.clientHeight * scale - el.clientHeight) / 2 - (ev.center.y * (scale / lastScale) - ev.center.y));
      }

      posX = lastPosX + ev.deltaX;
      posY = lastPosY + ev.deltaY;

      if (ev.type === 'panend') {
        lastPosX = posX
        lastPosY = posY
      }

      if (ev.type === 'doubletap') {
        lastScale=scale
        if (scale != 1) {
          scale = 1;
          posX = 0;
          posY = 0;
          lastPosX = 0;
          lastPosY = 0;
          translate_due_to_scale.x = 0
          translate_due_to_scale.y = 0
        } else {
          scale = 2;
          translate_due_to_scale.x = ((el.clientWidth * scale - el.clientWidth) / 2 - (ev.center.x * scale - ev.center.x));
          translate_due_to_scale.y = ((el.clientHeight * scale - el.clientHeight) / 2 - (ev.center.y * scale - ev.center.y));
        }
      }
      if (ev.type === 'pinchend') {
        lastScale = scale;
      }
      max_pos_x = (el.clientWidth * scale - el.clientWidth) / 2;
      max_pos_y = (el.clientHeight * scale - el.clientHeight) / 2;

      //Set bounds
      posX = this.clamp(posX, -max_pos_x - translate_due_to_scale.x, max_pos_x - translate_due_to_scale.x);
      posY = this.clamp(posY, -max_pos_y - translate_due_to_scale.y, max_pos_y - translate_due_to_scale.y);
      lastPosX = this.clamp(lastPosX, -max_pos_x - translate_due_to_scale.x, max_pos_x - translate_due_to_scale.x);
      lastPosY = this.clamp(lastPosY, -max_pos_y - translate_due_to_scale.y, max_pos_y - translate_due_to_scale.y);

      transform =
        'translate3d(' + translate_due_to_scale.x + 'px,' + translate_due_to_scale.y + 'px, 0) ' + //Translate due to zoom
        'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +  //translate due to pan
        'scale3d(' + scale + ', ' + scale + ', 1)'
        ;

      if (transform) {
        el.style.webkitTransform = transform;
      }

      if (lastScale > 1 && scale <= 1) {
        this.setZoomed(false);
        this.zoom.emit(false);
      } else if (lastScale <= 1 && scale > 1) {
        this.setZoomed(true);
        this.zoom.emit(true);
      }
    });
  }

  clamp(num, min, max) {
    console.log("clamp", num, min, max)
    return num <= min ? min : num >= max ? max : num;
  }
}
