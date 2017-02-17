import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Http} from '@angular/http';
import * as infographicjs from 'infographic-js';
import * as dummy from '../../assets/dummy-data/fileManager.js';
//declare function createFreeInfographic(any:any) : any;
/**
 *  This is a test page and should be removed before releasing .
 * Here you can meddle with dark magic better left alone.
 * Beware of dragons!
 * 
 */
@Component({
    selector: 'test-page',
    templateUrl:'test-page.html'
})
export class TestPage{

    @ViewChild("svgBox") box: ElementRef;
    jsonDefinition = {"width": "300", "height": "400", "background": "fill:#FFE4C4",
            "svgElements": [{"id":"girlDoctor","href":"http://www.google.com", "attributes": {"width": "100","height": "90",  "x":"10", "y":"4"}},
                    {"id":"doctor", "attributes": {"width": "100","height": "90","x":"120", "y":"4"}},
                    {"id":"medical-kit", "attributes": {"width": "60","height": "50","x":"80", "y":"150"}},
                    {"id":"heart", "attributes": {"width": "50","height": "50","x":"20", "y":"150"}}],
            "textElements": [{"id":"text1","contentText":"Doctor Infographic","attributes":{"font-family": "Purisa","font-size":"20","x":"10", "y":"120","fill":"#660000;font-weight:bold"}}],
            "pngElements":  [{"id":"bitIcon","attributes": { "width": "30", "height": "30", "x":"10", "y":"300"}}]
        };
svg;
    constructor(public navCtrl: NavController, public http: Http){
    }

    /**
     * Let's test Anna's api 
     */
    ngAfterViewInit(){
        //console.log(dummy.readFileFromImages('assets/images/girlDoctor','svg'));
        //console.log(dummy.readFileFromImages('assets/images/sea','jpg'));
        //console.log(dummy.readFileFromImages('assets/images/bitIcon','png'));
        //console.log(dummy.readFileFromImages('assets/images/colors','png'));
       //this.svg = infographicjs.createFreeInfographic(this.jsonDefinition);
       //console.log("SVG: "+this.svg);
              
       this.box.nativeElement.innerHTML=infographicjs.createFreeInfographic(this.jsonDefinition);

        //http.get('assets/infografies/publi1_m'+'.'+'jpg').forEach(function(response){
        //    console.log(response);
        //});

    }
}