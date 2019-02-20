import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'date',
    pure: false
})
export class DatePipeProxy implements PipeTransform {

    constructor(private translateService: TranslateService) {
    }

    public transform(value: any, pattern: any): any {
        const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
        return datePipe.transform(value, pattern);
    }
}