import { Component, Input, ViewChild, ChangeDetectionStrategy } from '@angular/core';

/**
 *
 */
@Component({
  selector: 'infographic-item',
  templateUrl: 'infographic-item.html',
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfographicItemComponent {
  @Input() itemHtml;
  @ViewChild("item") item;
  constructor() {}
  ngAfterViewInit(){
    this.item.nativeElement.innerHTML = this.itemHtml;
  }
}
