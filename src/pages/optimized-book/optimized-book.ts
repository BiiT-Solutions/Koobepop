import { Component,AfterViewInit,ViewChild,ViewChildren,ElementRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { HorizonalBookPage } from '../horizontal-book/horizontal-book';
import { Companies } from '../../providers/companies'
@Component({
  selector: 'page-optimized-book',
  templateUrl: 'optimized-book.html'
})

export class OptimizedBookPage implements AfterViewInit{
  BOOK_WIDTH = 400;
  BOOK_HEIGHT = 200;
  PAGE_WIDTH = 0;
  PAGE_HEIGHT = 0;
  PAGE_MARGIN = 0; 
  pageNum=0;
  imageList ;
  actualImages = {left:"",right:""};
  previousImages = {left:"",right:""};
  nextImages = {left:"",right:""};
  previousFlip;
  actualFlip;
  nextFlip;
  @ViewChild("previousPage") previousRightPage
  @ViewChild("actualPage") actualRightPage;
  @ViewChild("nextPage") nextRightPage;
  mouse = {x: 0, y: 0};
  flips=[];
  @ViewChild("book") book: ElementRef;
  @ViewChildren("rightPage") rightPages;
  @ViewChild("pageflipCanvas") canvas: ElementRef;
  context: CanvasRenderingContext2D ;
  constructor(public navCtrl: NavController,public platform: Platform,public companies: Companies) {
	  this.imageList = companies.getCompanies(); 
    this.previousImages.right = this.imageList[3];
    this.nextImages.right = this.imageList[4];
  }
  
  ngAfterViewInit(){
	
	window.onorientationchange = e => this.navToHorizontalBook();

	this.PAGE_MARGIN = this.platform.width()*0.05;
	this.BOOK_WIDTH = this.platform.width()*2 ;
	this.BOOK_HEIGHT = this.platform.height();
	this.PAGE_WIDTH = this.BOOK_WIDTH/2-this.PAGE_MARGIN*2 ;
	this.PAGE_HEIGHT = this.BOOK_HEIGHT-this.PAGE_MARGIN*2;
	this.canvas.nativeElement.width = this.BOOK_WIDTH;
	this.canvas.nativeElement.height = this.BOOK_HEIGHT;
	this.book.nativeElement.style.marginLeft = - this.PAGE_WIDTH+"px";
  	this.context= this.canvas.nativeElement.getContext("2d");	
	//Pages 
		//Previous
		this.previousFlip = {};
		//Actual
		this.actualFlip = {
			progress: 1,
			target: 1,
			rightPage: this.actualRightPage.nativeElement,
			ragging: false
		};
		//Next
		this.nextFlip = {};
	this.previousRightPage.nativeElement.style.marginLeft = this.PAGE_MARGIN+"px";
	this.previousRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN+"px";		
	this.actualRightPage.nativeElement.style.marginLeft = this.PAGE_WIDTH+this.PAGE_MARGIN+"px";
	this.actualRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN+"px";	
	this.nextRightPage.nativeElement.style.marginLeft = this.PAGE_WIDTH+this.PAGE_MARGIN+"px";
	this.nextRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN+"px";	

	this.previousRightPage.nativeElement.style.zIndex = 0;
	this.actualRightPage.nativeElement.style.zIndex = 0;
	this.nextRightPage.nativeElement.style.zIndex = 0;

    //console.log("Context:",this.context);
	setInterval( () => this.render(), 1000 / 60 );

  }


mouseMoveHandler( event ) {
  // Offset mouse position so that the top of the spine is 0
   this.mouse.x = event.center.x - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
   this.mouse.y = event.center.y - this.book.nativeElement.offsetTop;
   
}
 
mouseDownHandler( event ) {
 this.mouse.x = event.touches[0].clientX - this.book.nativeElement.offsetLeft - ( this.BOOK_WIDTH / 2 );
 this.mouse.y = event.touches[0].clientY - this.book.nativeElement.offsetTop;
 
  if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
    if (this.mouse.x < 0.5*this.PAGE_WIDTH && this.pageNum > 0) {
      	this.pageNum = this.pageNum -1;
		  this.actualFlip.progress = -1;  
        this.actualFlip.dragging = true;
    } else if (this.mouse.x > 0.5*this.PAGE_WIDTH ) {
        this.actualFlip.progress = 1;
 		this.actualFlip.target = 1;
		this.actualFlip.dragging = true;
    }
  }
  //Prevents the text selection cursor from appearing when dragging
  event.preventDefault();
  console.log(this.pageNum);
}

 mouseUpHandler( event ) {
 
    // If this flip was being dragged we animate to its destination
	if( this.actualFlip.dragging ) {
      this.actualFlip.target = this.mouse.x < 0.5*this.PAGE_WIDTH ? -1 : 1;
	  
      // Figure out which page we should go to next depending on the flip direction
		if( this.actualFlip.target !== 1 ) {
			this.pageNum =  this.pageNum + 1 ;
			
      	} 
    }
    this.actualFlip.dragging = false;
    console.log(this.pageNum);
  }

  render() {	
		this.context.clearRect( 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height );
    
      if( this.actualFlip.dragging ) {

         this.actualFlip.target = Math.max( Math.min( this.mouse.x / this.PAGE_WIDTH, 1 ), -1 );
      }

       this.actualFlip.progress += (  this.actualFlip.target - this.actualFlip.progress ) * 0.2;

      // If the flip is being dragged or is somewhere in the middle of the book, render it
      if( this.actualFlip.dragging || Math.abs( this.actualFlip.progress ) < 0.997 ) {
        this.drawFlip( this.actualFlip );
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
		let verticalOutdent = this.PAGE_MARGIN * strength;
		
		// The maximum width of the left and right side shadows
		let paperShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( 1 - flip.progress, 0.5 ), 0 );
		let rightShadowWidth = (this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		let leftShadowWidth = ( this.PAGE_WIDTH * 0.5 ) * Math.max( Math.min( strength, 0.5 ), 0 );
		
		
		// Change the right page element width to match the x position of the fold
		flip.rightPage.style.width = Math.max(foldX - foldWidth + this.PAGE_MARGIN, 0) + "px";	

		this.context.save();
		//Set canvas in position
		this.context.translate( ( this.BOOK_WIDTH / 2 ) , this.PAGE_MARGIN);
		
		// Draw a sharp shadow on the left side of the page
		this.context.strokeStyle = 'rgba(0,0,0,'+(0.05 * strength)+')';
		this.context.lineWidth = 30 * strength;
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
		foldGradient.addColorStop(0.35, '#fafafa');
		foldGradient.addColorStop(0.73, '#eeeeee');
		foldGradient.addColorStop(0.9, '#fafafa');
		foldGradient.addColorStop(1.0, '#e2e2e2');
		
		this.context.fillStyle = foldGradient;
		this.context.strokeStyle = 'rgba(0,0,0,0.06)';
		this.context.lineWidth = 0.5;
		
		// Draw the folded piece of paper
		this.context.beginPath();
		this.context.moveTo(foldX, 0);//rt
		this.context.lineTo(foldX, this.PAGE_HEIGHT);//lb - rb
		this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
		this.context.lineTo(foldX - foldWidth, -verticalOutdent);
		this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		
		this.context.fill();
		this.context.stroke();

		this.context.restore();
	}

	obtainImage(){
		return 'assets/infografies/commomfojmddoekd.png';	}
	navBack(){
		window.onorientationchange = null;
		this.navCtrl.pop();
	}
	navToHorizontalBook(){
		//TODO fix this
		console.log(window.orientation );
		
	if (window.orientation == 90 || window.orientation == -90){
		window.onorientationchange = null;
		this.navCtrl.pop().then(e => this.navCtrl.push(HorizonalBookPage));
		}else{
		window.onorientationchange = null;
		this.navCtrl.pop().then(e => this.navCtrl.push(OptimizedBookPage));
		}
	}
}


