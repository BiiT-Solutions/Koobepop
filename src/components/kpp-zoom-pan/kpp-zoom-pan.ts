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

    this.setZoomListeners(this.frame.nativeElement, this.zoomable.nativeElement, extraHeight);
  }

  private setZoomed(zoomed) {
    this.isZoomed = zoomed;
  }

  private setZoomListeners(frame, zoomable, extraHeight) {
    //despl = (w*scale-w)/2 - (location*(newscale/oldscale)-location)

    //Configure event handling
    const hammer = new Hammer(zoomable, {});
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
      min_pos_x = 0,
      min_pos_y = 0,
      transform = '';

    const translate_due_to_scale = { x: 0, y: 0 }

    hammer.on('doubletap pan pinch panend pinchend', (ev) => {
      if (ev.type === 'pinch') {
        scale = Math.max(.999, Math.min(lastScale + (ev.scale - 1), 4));
        translate_due_to_scale.x = ((zoomable.clientWidth * scale - zoomable.clientWidth) / 2 - (ev.center.x * scale - ev.center.x));
        translate_due_to_scale.y = ((zoomable.clientHeight * scale - zoomable.clientHeight) / 2 - (ev.center.y * scale - ev.center.y));
        posX = lastPosX * scale;
        posY = lastPosY * scale;
        //console.log("lastScale", lastScale.toFixed(2), "scale", scale.toFixed(2), "scaleE", ev.scale.toFixed(2), "tdsX", translate_due_to_scale.x.toFixed(2), "pX", posX.toFixed(2), "cX", ev.center.x)
      }

      if (ev.type === 'pinchend') {
        lastScale = scale;
        lastPosX = posX;
        lastPosY = posY;
      }

      if (ev.type === 'pan') {
        posX = lastPosX + ev.deltaX;
        posY = lastPosY + ev.deltaY;
      }

      if (ev.type === 'panend') {
        lastPosX = posX
        lastPosY = posY
      }

      if (ev.type === 'doubletap') {
        if (scale != 1) {
          scale = 1;
          lastScale = 1;
          posX = 0;
          posY = 0;
          lastPosX = 0;
          lastPosY = 0;
          translate_due_to_scale.x = 0
          translate_due_to_scale.y = 0
        } else {
          scale = 3;
          lastScale = 3;
          translate_due_to_scale.x = ((zoomable.clientWidth * scale - zoomable.clientWidth) / 2 - (ev.center.x * scale - ev.center.x));
          translate_due_to_scale.y = ((zoomable.clientHeight * scale - zoomable.clientHeight) / 2 - (ev.center.y * scale - ev.center.y));
          posX = posX * scale;
          posY = posY * scale;
          lastPosX = posX
          lastPosY = posY
        }
      }

      //Set bounds
      max_pos_x = (zoomable.clientWidth * scale - zoomable.clientWidth) / 2 - translate_due_to_scale.x;
      max_pos_y = (zoomable.clientHeight * scale - zoomable.clientHeight) / 2 - translate_due_to_scale.y;
      min_pos_x = max_pos_x - (zoomable.clientWidth * scale - frame.clientWidth);
      if (zoomable.clientHeight * scale - frame.clientHeight > 0) {
        min_pos_y = max_pos_y - (zoomable.clientHeight * scale - frame.clientHeight);
      } else {
        min_pos_y = max_pos_y;
      }

      posX = this.clamp(posX, min_pos_x, max_pos_x);
      posY = this.clamp(posY, min_pos_y, max_pos_y);
      lastPosX = this.clamp(lastPosX, min_pos_x, max_pos_x);
      lastPosY = this.clamp(lastPosY, min_pos_y, max_pos_y);

      transform =
        'translate3d(' + (translate_due_to_scale.x) + 'px,' + (translate_due_to_scale.y) + 'px, 0) ' + //Translate due to zoom
        'translate3d(' + posX + 'px,' + posY + 'px, 0) ' +  //translate due to pan
        'scale3d(' + scale + ', ' + scale + ', 1)'
        ;

      if (transform) {
        zoomable.style.webkitTransform = transform;
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
    //console.log("clamp", num, min, max)
    //We check first max and then min
    return num >= max ? max : num <= min ? min : num;
  }
}
