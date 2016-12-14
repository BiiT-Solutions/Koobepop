import { Component,AfterViewInit,ViewChild,ViewChildren,ElementRef } from '@angular/core';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'

// })

export class Todea {
  public name: string;
  public age: number;
  constructor(newName: string, newAge: number) {
    this.name = newName;
    this.age = newAge;
  }
  public getAge(): number {
    return this.age
  }
}