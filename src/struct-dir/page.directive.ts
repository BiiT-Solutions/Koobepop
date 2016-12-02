import { Directive, ElementRef, Input, Renderer } from '@angular/core';
@Directive({selector:'[myPage]'})
export class PageDirective{
    constructor(el: ElementRef, renderer: Renderer){
        renderer.setElementStyle(el.nativeElement,'backgroundColor','cyan');
    }

}