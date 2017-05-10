import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShowExerciseInfoPage } from '../show-exercise-info/show-exercise-info';

/**
 * This Page displays information from some topics 
 */
@Component({
  selector: 'page-know',
  templateUrl: 'know.html'
})
export class KnowPage {
  topics=[
    {image:'assets/icons/antropometry.svg',
      name:'anthropometry'},
    {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
    {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
    {image:'assets/icons/spirometry.svg',
      name:'spirometry'},
    {image:'assets/icons/spirometry.svg',
      name:'spirometry'}];
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
  }
  displayInfo(topic:any){
    //Show some info
    this.navCtrl.push(ShowExerciseInfoPage)
  }
  //TODO - Make a component for the button
  public randomColor():string{
   let color = "#fff2e9"
    console.log("###########################\n Old:")
    let oldR = Number.parseInt(color.slice(1,3),16)
    console.log(oldR)
    let oldG = Number.parseInt(color.slice(3,5),16)
     console.log(oldR)
    let oldB = Number.parseInt(color.slice(5,7),16)
     console.log(oldR)
     console.log("New:")
    let r = (Math.round((Math.random()* 255 + oldR)/2)).toString(16);
    console.log(r)
    let g = (Math.round((Math.random()* 255 + oldG)/2)).toString(16);
    console.log(g)
    let b = (Math.round((Math.random()* 255 + oldB)/2)).toString(16);
    console.log(b)
    return '#' + r + g + b;
  }

}
