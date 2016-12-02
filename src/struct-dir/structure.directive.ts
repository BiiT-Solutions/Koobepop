import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({selector:'[myBook]'})
export class BookDirective{
    constructor(el: ElementRef, renderer: Renderer){
        renderer.setElementStyle(el.nativeElement,'backgroundColor','#995a89');
    }

}

@Directive({selector:'[myPage]'})
export class PageDirective{
    constructor(el: ElementRef, renderer: Renderer){
        renderer.setElementStyle(el.nativeElement,'backgroundColor','#81a0d3');
    }
}