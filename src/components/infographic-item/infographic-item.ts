import { Component, Input, ViewChild } from '@angular/core';

/**

 */
@Component({
  selector: 'infographic-item',
  templateUrl: 'infographic-item.html'
})
export class InfographicItemComponent {

  @Input() itemHtml;
  @ViewChild("item") item;
  constructor() {}
  ngAfterViewInit(){
    this.item.nativeElement.innerHTML = this.itemHtml;
  }
}
