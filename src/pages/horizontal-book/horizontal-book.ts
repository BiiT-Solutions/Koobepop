import { Component,AfterViewInit,ViewChild,ViewChildren,ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import {VerticalBookPage} from '../vertical-book/vertical-book';
import { Companies } from '../../providers/companies'

@Component({
  selector: 'page-horizontal-book',
  templateUrl: 'horizontal-book.html',
  providers: [Companies]
})
export class HorizonalBookPage implements AfterViewInit{
	imageList;
  BOOK_WIDTH = 0;
  BOOK_HEIGHT = 0;
  PAGE_WIDTH = 0;
  PAGE_HEIGHT = 0;
  PAGE_MARGIN = 0; 
  pageNum=0;
  @ViewChild("pageflipCanvas") canvas: ElementRef;
  context: CanvasRenderingContext2D ;
  mouse = {x: 0, y: 0};
  flips=[];
  @ViewChild("book") book: ElementRef;
  @ViewChildren("rightPage") rightPages;
  @ViewChildren("leftPage") leftPages;
  constructor(public navCtrl: NavController,public platform: Platform, public companies: Companies) {
	  this.imageList = companies.getCompanies(); 
    }

  ngAfterViewInit(){
	window.onorientationchange = ev => this.navToVerticalBook();
	this.PAGE_MARGIN = this.platform.width()*0.05;
	this.BOOK_WIDTH = this.platform.width() ;
  	this.BOOK_HEIGHT = this.platform.height();
  	this.PAGE_WIDTH = this.BOOK_WIDTH/2-this.PAGE_MARGIN*2 ;
  	this.PAGE_HEIGHT = 	this.BOOK_HEIGHT-this.PAGE_MARGIN*2;
	this.canvas.nativeElement.width = this.BOOK_WIDTH;
	this.canvas.nativeElement.height = this.BOOK_HEIGHT;

    this.context= this.canvas.nativeElement.getContext("2d");	
	//Pages 
	for( var i = 0, len = this.rightPages.length; i < len; i++ ) {
		//Right
		if(this.rightPages._results[i]!= undefined){
		this.rightPages._results[i].nativeElement.style.zIndex = len - i;
		this.rightPages._results[i].nativeElement.style.width = this.PAGE_WIDTH+"px";
		this.rightPages._results[i].nativeElement.style.height = this.PAGE_HEIGHT+"px"
		this.rightPages._results[i].nativeElement.style.marginLeft = this.PAGE_WIDTH+this.PAGE_MARGIN*2+"px";
		this.rightPages._results[i].nativeElement.style.marginTop = this.PAGE_MARGIN+"px";
		
	
		}
		//Left
		if(this.leftPages._results[i]!= undefined){
		this.leftPages._results[i].nativeElement.style.zIndex = len + i;
		this.leftPages._results[i].nativeElement.style.width = "0px";
		this.leftPages._results[i].nativeElement.style.height = this.PAGE_HEIGHT+"px"
		this.leftPages._results[i].nativeElement.style.marginLeft = this.PAGE_MARGIN+"px";
		this.leftPages._results[i].nativeElement.style.marginTop = this.PAGE_MARGIN+"px";
	}
		this.flips.push( {
			// Current progress of the flip (left -1 to right +1)
			progress: 1,
			// The target value towards which progress is always moving
			target: 1,
			// The page DOM element related to this flip
			rightPage: this.rightPages._results[i].nativeElement, 
			leftPage: this.leftPages._results[i]!=undefined?this.leftPages._results[i].nativeElement:"",
			// True while the page is being dragged
			dragging: false
		} );
	}	
    //console.log("Context:",this.context);
	setInterval( () => this.render(), 1000 / 60 );

  }


mouseMoveHandler( event ) {
   // Offset mouse position so that the top of the spine is 0
   this.mouse.x = event.center.x - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
   this.mouse.y = event.center.y - this.book.nativeElement.offsetTop;
    
}
 

//
mouseDownHandler( event ) {
//console.log(" downHandler X:",event.touches[0].clientX);
 this.mouse.x = event.touches[0].clientX - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
 this.mouse.y = event.touches[0].clientY - this.book.nativeElement.offsetTop;

if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
   if (this.mouse.x < 0*this.PAGE_WIDTH && this.pageNum > 0) {
		this.pageNum = this.pageNum -1;
       	this.flips[this.pageNum ].dragging = true;
   } else if (this.mouse.x > 0*this.PAGE_WIDTH && this.pageNum + 1 < this.flips.length) {
       	this.flips[this.pageNum].dragging = true;
   }
}
 //Prevents the text selection cursor from appearing when dragging
event.preventDefault();
}

 mouseUpHandler( event ) {
	// console.log(" upHandler X:",event);
  for( var i = 0; i < this.flips.length; i++ ) {
    // If this flip was being dragged we animate to its destination
	if( this.flips[i].dragging ) {
      this.flips[i].target = this.mouse.x < 0*this.PAGE_WIDTH ? -1 : 1;
      // Figure out which page we should go to next depending on the flip direction
		if( this.flips[i].target !== 1 ) {
			this.pageNum = this.pageNum + 1 < this.flips.length ? this.pageNum + 1 : this.pageNum;
      	} 
    }
    this.flips[i].dragging = false;
    }
  }

  render() {	
	   //console.log("Render func:",this.pageNum);	
		this.context.clearRect( 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height );
	for (var i = 0; i < this.flips.length; i++) {
		var flip = this.flips[i];

		if( flip.dragging ) {

			flip.target = Math.max( Math.min( this.mouse.x / this.PAGE_WIDTH, 1 ), -1 );
		}

		flip.progress += ( flip.target - flip.progress ) * 0.2;

		// If the flip is being dragged or is somewhere in the middle of the book, render it
		if( flip.dragging || Math.abs( flip.progress ) < 0.997 ) {
			this.drawFlip( flip );
		}

	}
		
	}



drawFlip( flip ) {
		// Strength of the fold, is strongest in the middle of the book
		let strength = 1 - Math.abs( flip.progress );
		
		// Width of the folded paper
		let foldWidth = ( this.PAGE_WIDTH * 0.5 ) * ( 1 - flip.progress );
		
		// X position of the folded paper
		let foldX = this.PAGE_WIDTH * flip.progress + foldWidth;
		
		// How far the page should outdent vertically due to perspective
		let verticalOutdent = this.PAGE_MARGIN*0.5 * strength;
		
		// The maximum width of the left and right side shadows
		let paperShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
		let rightShadowWidth = (this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		let leftShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		
		
		// Change the right page element width to match the x position of the fold
		flip.rightPage.style.width = Math.max(foldX - foldWidth , 0) + "px";	

		// Change the Left page width and position along with the folded piece check for non defined pages
		flip.leftPage.style.marginLeft = Math.max(this.PAGE_WIDTH+this.PAGE_MARGIN*2+foldX-foldWidth,0)+"px";
		flip.leftPage.style.width = Math.max(foldWidth,0)+"px";
		
		this.context.save();
		//Set canvas in position
		//( this.BOOK_WIDTH / 2 )
		this.context.translate( ( this.BOOK_WIDTH / 2 ) , this.PAGE_MARGIN);
		
		


		// Draw a sharp shadow on the left side of the page
		this.context.strokeStyle = 'rgba(0,0,0,'+(0.04 * strength)+')';
		this.context.lineWidth = 20 * strength;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
		this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT + (verticalOutdent * 0.5));
		this.context.stroke();
		
		
		// Right side drop shadow
		let rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
		rightShadowGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.2)+')');
		rightShadowGradient.addColorStop(0.8, 'rgba(0,0,0,0.0)');
		
		this.context.fillStyle = rightShadowGradient;
		this.context.beginPath();
		this.context.moveTo(foldX, 0);
		this.context.lineTo(foldX + rightShadowWidth, 0);
		this.context.lineTo(foldX + rightShadowWidth, this.PAGE_HEIGHT);
		this.context.lineTo(foldX, this.PAGE_HEIGHT);
		this.context.fill();
		
		
		// Left side drop shadow
		let leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
		leftShadowGradient.addColorStop(0, 'rgba(0,0,0,0.0)');
		leftShadowGradient.addColorStop(1, 'rgba(0,0,0,'+(strength*0.15)+')');
		
		this.context.fillStyle = leftShadowGradient;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth - leftShadowWidth, 0);
		this.context.lineTo(foldX - foldWidth, 0);
		this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT);
		this.context.lineTo(foldX - foldWidth - leftShadowWidth, this.PAGE_HEIGHT);
		this.context.fill();
		
		
		// Gradient applied to the folded paper (highlights & shadows)
		let foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);	
		foldGradient.addColorStop(0, 'rgba(0,0,0,'+(strength*0.1)+')');
		foldGradient.addColorStop(0.35, 'rgba(1,1,1,0)');
		foldGradient.addColorStop(1.0, 'rgba(0,0,0,'+(strength*0.1)+')');
		
		this.context.fillStyle = foldGradient;
		this.context.strokeStyle = 'rgba(0,0,0,0.06)';
		this.context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		this.context.beginPath();
		this.context.moveTo(foldX, 0);//
		this.context.lineTo(foldX, this.PAGE_HEIGHT);//lb - rb
		this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
		this.context.lineTo(foldX - foldWidth, -verticalOutdent);
		this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		
		this.context.fill();
		this.context.stroke();

		this.context.restore();
	}

	obtainImage(){
		return 'assets/infografies/commomfojmddoekd.png';
	}

	navBack(){
		window.onorientationchange = null;
		this.navCtrl.pop();
	}

	navToVerticalBook(){
		//TODO fix this
		console.log(window.orientation );
		
		if (window.orientation==0){
			window.onorientationchange = null;		
			this.navCtrl.pop().then(e => this.navCtrl.push(VerticalBookPage));
		}else{
			window.onorientationchange = null;
			this.navCtrl.pop().then(e => this.navCtrl.push(HorizonalBookPage));
		}
	}
}

