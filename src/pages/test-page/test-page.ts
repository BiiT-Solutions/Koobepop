import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as infographicjs from 'infographic-js';
//declare function createFreeInfographic(any:any) : any;

@Component({
    selector: 'test-page',
    templateUrl:'test-page.html'
})
export class TestPage{
    jsonDefinition = {"width": "800", "height": "800", "background": "fill:#FFE4C4",
            "svgElements": [{"id":"girlDoctor","href":"http://www.google.com", "attributes": {"width": "300","height": "250",  "x":"30", "y":"40"}},
                    {"id":"doctor", "attributes": {"width": "300","height": "250","x":"400", "y":"40"}},
                    {"id":"medical-kit", "attributes": {"width": "200","height": "160","x":"450", "y":"600"}},
                    {"id":"heart", "attributes": {"width": "150","height": "150","x":"600", "y":"600"}}],
            "textElements": [{"id":"text1","contentText":"Doctor Infographic","attributes":{"font-family": "Purisa","font-size":"60","x":"100", "y":"400","fill":"#660000;font-weight:bold"}}],
            "pngElements":  [{"id":"bitIcon","attributes": { "width": "75", "height": "75", "x":"50", "y":"700"}}]
        };
svg;
    constructor(public navCtrl: NavController){
       this.svg = infographicjs.createFreeInfographic(this.jsonDefinition);
       console.log("SVG: "+this.svg);
    }
    /**
     * Let's test Anna's api 
     */

}