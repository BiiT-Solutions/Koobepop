import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

/**
 * Simple checkmark element
 */
@Component({
  selector: 'kpp-check-box',
  templateUrl: 'kpp-check-box.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KppCheckBoxComponent {
  @Input() checked: boolean;
  @Input() disabled: boolean;
  constructor() {
  }
}
