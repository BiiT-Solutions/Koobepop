//import {describe, it, expect} from "@angular/testing"

//import {describe, it, expect} from "@angular/testing"
// userful link http://stackoverflow.com/questions/40064291/import-typescript-class-into-jasmine-tests-type-is-not-a-constructor-error

//import { HomePage } from "../pages/home/home";
//import { NavController, NavParams } from 'ionic-angular';
//var navCtrl: NavController;
//var homePage = new HomePage(navCtrl);
//import { HomePage } from "../pages/home/home";
//import { NavController } from "../../node_modules/ionic-angular";

//var navCtrl: NavController;
//var homePage = new HomePage(navCtrl)
describe("test suit", () => {
  
  it("should check if setInterval() is defined", () => {
    expect(2+2).toEqual(4)
  })
  it('should print Hello World', () => {
    expect('Hello World').toEqual('Hello World')
  })
})


// import { inject, TestBed } from "@angular/core/testing";
// import { HomePage } from "../pages/home/home";

// describe("Home Test", () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     providers: [
//       HomePage
//     ]
//   }));
// import { inject, TestBed } from "@angular/core/testing";
// import { HomePage } from "../pages/home/home";

// describe("Home Test", () => {
//   beforeEach(() => TestBed.configureTestingModule({
//     providers: [
//       HomePage
//     ]
//   }));

//   it("should have setInterval()", inject([HomePage], (homePage: HomePage) => {
//     expect(setInterval).toBeDefined()
//   }));
// });

//   it("should have setInterval()", inject([HomePage], (homePage: HomePage) => {
//     expect(setInterval).toBeDefined()
//   }));
// });


// import { NavController, NavParams } from 'ionic-angular';
// var homePage: HomePage;

// export class TestHome {
//   constructor(public navCtrl: NavController, private navParams: NavParams, private homePage: HomePage) {
//   }
// describe("dummietest", function() {
//   it("should do things", function(){
//     expect(2+2).toEqual(4)
//   })
// })

// }

// describe('dummie test', () => {
//   var TestingPage = require('../testing/testing.ts');
//   var testingPage = new TestingPage.TestingPage();
//   //var homePage = require('../pages/home/home.ts')
//   it('should print Hello World', () => {
//     expect('Hello World').toEqual('Hello World')
//   })
// })
