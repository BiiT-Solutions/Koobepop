import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams,Gesture } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies';
/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
  companies = [{name:" :D"}];
  private gesture: Gesture;
  @ViewChild('frame') element;
  constructor(public navCtrl: NavController, public navParams: NavParams, public companiesProvider: CompaniesProvider) {}

 
searchCompanies(){
 let criteria = {country:"Commonwealth",brand:"",product:"",service:""};
this.companiesProvider.requestCompanies(criteria);
this.companies = this.companiesProvider.getCompanies();
}

 ionViewDidLoad() {
	//create gesture obj w/ ref to DOM element
	this.gesture = new Gesture(this.element.nativeElement);

	//listen for the gesture
	this.gesture.listen();

	//turn on listening for pinch or rotate events
	this.gesture.on('pinch', e => this.pinchEvent(e));
    }

private pinchEvent(event) {
        console.log("Event: ",event);
    }

//pinchEvent(e){
//this.width = this.pinchW * e.scale;
//this.height = this.pinchH * e.scale;
//if(this.timeout == null){
//this.timeout = setTimeout(()=>{
//this.timeout = null;
//this.updateWidthHeightPinch();
//}, 1000);
//}else{
//clearTimeout(this.timeout);
//this.timeout = setTimeout(()=>{
//this.timeout = null;
//this.updateWidthHeightPinch();
//}, 1000);
//}
//}
//updateWidthHeightPinch(){
//this.pinchW = this.width;
//this.pinchH = this.height;
//}
}
