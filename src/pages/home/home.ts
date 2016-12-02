import { Component,AfterViewInit,ViewChild,ViewChildren,ElementRef } from '@angular/core';

import { NavController } from 'ionic-angular';


//BOOK_WIDTH = dispositive.width*2
//BOOK_HEIGHT = dispositive.height

//PAGE_WIDTH = dispositive.width -10%
//PAGE_HEIGHT = dispositive.height -10%


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage implements AfterViewInit{
  BOOK_WIDTH = 830;
  BOOK_HEIGHT = 260;
  PAGE_WIDTH = 400;
  PAGE_HEIGHT = 250;
  PAGE_Y = ( this.BOOK_HEIGHT - this.PAGE_HEIGHT ) / 2;
  CANVAS_PADDING = 60;
  title: string = "Title";
  @ViewChild("book") book: ElementRef;
  @ViewChildren("page") pages: ElementRef[];
  mouse = {x: 0, y: 0};
  flips=[];
  page=0;
  context: CanvasRenderingContext2D ;
  @ViewChild("pageflipCanvas") canvas: ElementRef;
  show = false;
  constructor(public navCtrl: NavController) {
  document.addEventListener( "mousemove", this.mouseMoveHandler, false );
	document.addEventListener( "mousedown", this.mouseDownHandler, false );
	document.addEventListener( "mouseup", this.mouseUpHandler, false );
  // Resize the canvas to match the book size
	
	// Offset the canvas so that it's padding is evenly spread around the book
	//this.canvas.nativeElement.style.top = -this.CANVAS_PADDING + "px";
	//this.canvas.nativeElement.style.left = -this.CANVAS_PADDING + "px";
	
  }

  ngAfterViewInit(){
    
    this.canvas.nativeElement.style.top = -this.CANVAS_PADDING + "px";
	  this.canvas.nativeElement.style.left = -this.CANVAS_PADDING + "px";
    this.context= this.canvas.nativeElement.getContext("2d");
    console.log(this.context);
    console.log(this.pages)
    this.context.fillStyle = 'blue';
    this.context.fillRect(10, 10, 150, 150);

  }


mouseMoveHandler( event ) {
  console.log(this.book);
   // Offset mouse position so that the top of the spine is 0,0
   this.mouse.x = event.clientX - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
   this.mouse.y = event.clientY - this.book.nativeElement.offsetTop;
   //DEBUG:
   this.title = "X: "+event.clientX+" Y: "+ event.clientY;
   this.show = !this.show;  
   
}

//
mouseDownHandler( event ) {
if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
   if (this.mouse.x < 0 && this.page - 1 >= 0) {
       this.flips[this.page - 1].dragging = true;
   } else if (this.mouse.x > 0 && this.page + 1 < this.flips.length) {
       this.flips[this.page].dragging = true;
   }
   this.mouse.x = event.clientX - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
   this.mouse.y = event.clientY - this.book.nativeElement.offsetTop;
}
 //Prevents the text selection cursor from appearing when dragging
event.preventDefault();
}
 mouseUpHandler( event ) {
  for( var i = 0; i < this.flips.length; i++ ) {
    if( this.flips[i].dragging ) {
      this.flips[i].target = this.mouse.x < 0 ? -1 : 1;
      if( this.flips[i].target === 1 ) {
        this.page = this.page - 1 >= 0 ? this.page - 1 : this.page;
      } else {
        this.page = this.page + 1 < this.flips.length ? this.page + 1 : this.page;
      }
    }
    this.flips[i].dragging = false;
    }
  }
  render() {
		
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
		// Strength of the fold is strongest in the middle of the book
		var strength = 1 - Math.abs( flip.progress );
		
		// Width of the folded paper
		var foldWidth = ( this.PAGE_WIDTH * 0.5 ) * ( 1 - flip.progress );
		
		// X position of the folded paper
		var foldX = this.PAGE_WIDTH * flip.progress + foldWidth;
		
		// How far the page should outdent vertically due to perspective
		var verticalOutdent = 20 * strength;
		
		// The maximum width of the left and right side shadows
		var paperShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
		var rightShadowWidth = (this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		var leftShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		
		
		// Change page element width to match the x position of the fold
		flip.page.style.width = Math.max(foldX, 0) + "px";
		
		this.context.save();
		this.context.translate( this.CANVAS_PADDING + ( this.BOOK_WIDTH / 2 ), this.PAGE_Y + this.CANVAS_PADDING );
		
		
		// Draw a sharp shadow on the left side of the page
		this.context.strokeStyle = 'rgba(0,0,0,'+(0.05 * strength)+')';
		this.context.lineWidth = 30 * strength;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
		this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT + (verticalOutdent * 0.5));
		this.context.stroke();
		
		
		// Right side drop shadow
		var rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
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
		var leftShadowGradient = this.context.createLinearGradient(foldX - foldWidth - leftShadowWidth, 0, foldX - foldWidth, 0);
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
		var foldGradient = this.context.createLinearGradient(foldX - paperShadowWidth, 0, foldX, 0);
		foldGradient.addColorStop(0.35, '#fafafa');
		foldGradient.addColorStop(0.73, '#eeeeee');
		foldGradient.addColorStop(0.9, '#fafafa');
		foldGradient.addColorStop(1.0, '#e2e2e2');
		
		this.context.fillStyle = foldGradient;
		this.context.strokeStyle = 'rgba(0,0,0,0.06)';
		this.context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		this.context.beginPath();
		this.context.moveTo(foldX, 0);
		this.context.lineTo(foldX, this.PAGE_HEIGHT);
		this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
		this.context.lineTo(foldX - foldWidth, -verticalOutdent);
		this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		
		this.context.fill();
		this.context.stroke();
		
		
		this.context.restore();
	}
}

