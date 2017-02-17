import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NavController, Gesture } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies'
import { TranslateService } from 'ng2-translate';
import * as infographicjs from 'infographic-js';
/**
 * Here we manage the book page 
 */
@Component({
	selector: 'page-book',
	templateUrl: 'book.html'
})

export class BookPage implements AfterViewInit {
	@Input()
	flipActive: boolean = true;
	@Input()
	BOOK_WIDTH = 400;
	@Input()
	BOOK_HEIGHT = 200;
	@Input()
	zoomLeftMargin = 0;
	@Input()
	zoomTopMargin = 0;

	PAGE_WIDTH = 0;
	PAGE_HEIGHT = 0;
	PAGE_MARGIN = 0;
	pageNum = 0;
	bookLeftMovement = 0;
	bookTopMovement = 0;

	imageList;

	previousImage;
	actualImage;
	nextImage;

	previousFlip;
	actualFlip;
	nextFlip;
	
	mouse = { x: 0, y: 0 };
	flips = [];
	@ViewChild("previousPage") previousRightPage
	@ViewChild("actualPage") actualRightPage;
	@ViewChild("nextPage") nextRightPage;
	@ViewChild("pageflipCanvas") canvas: ElementRef;
	context: CanvasRenderingContext2D;

	@ViewChild("book") book: ElementRef;
	private gesture: Gesture;
	hideHeader: boolean;

	intervalId;



	@ViewChild("eventReciver") eventHandling: ElementRef;
	percentageOfImageAtPinchPointX = 0;
	percentageOfImageAtPinchPointY = 0;

	mLeft = 0;
	mTop = 0;

	actualPageWidth;

	imageHeight;
	imageWidth;
	pageHeight;
	pageWidth;
	bookHeight;
	bookWidth;

	drawTime = 0;
	imageTime = 0;
	renderTime = 0;

	paperShadowWidth = 0;
	rightShadowWidth = 0;
	leftShadowWidth = 0;
	foldWidth=0;

	paperShadowMargin = 0;
	leftShadowMargin = 0;
	rightShadowMargin = 0;
	foldMargin=0;

	 @ViewChild("svgBox") box: ElementRef;
    jsonDefinition = {"width": "300", "height": "400", "background": "fill:#FFE4C4",
            "svgElements": [{"id":"girlDoctor","href":"http://www.google.com", "attributes": {"width": "100","height": "90",  "x":"10", "y":"4"}},
                    {"id":"doctor", "attributes": {"width": "100","height": "90","x":"120", "y":"4"}},
                    {"id":"medical-kit", "attributes": {"width": "60","height": "50","x":"80", "y":"150"}},
                    {"id":"heart", "attributes": {"width": "50","height": "50","x":"20", "y":"150"}}],
            "textElements": [{"id":"text1","contentText":"Doctor Infographic","attributes":{"font-family": "Purisa","font-size":"20","x":"10", "y":"120","fill":"#660000;font-weight:bold"}}],
            "pngElements":  [{"id":"bitIcon","attributes": { "width": "30", "height": "30", "x":"10", "y":"300"}}]
        };

	constructor(public navCtrl: NavController, private companies: CompaniesProvider, private translate: TranslateService) {
		this.imageList = companies.getImages();
		this.actualImage = this.imageList[this.pageNum];
		this.nextImage = this.imageList[this.pageNum + 1];
		this.previousImage = this.imageList[this.pageNum - 1];
	}



	ngAfterViewInit() {
		 this.box.nativeElement.innerHTML=infographicjs.createFreeInfographic(this.jsonDefinition);

		//this.setBookAttributes(window.outerWidth * 2,window.outerHeight);	
		this.context = this.canvas.nativeElement.getContext("2d");
		// Define PageFlips 
		//Previous
		this.previousFlip = {
			progress: 1,
			target: 1,
			rightPage: this.previousRightPage.nativeElement,
			dragging: false
		};
		//Actual
		this.actualFlip = {
			progress: 1,
			target: 1,
			rightPage: this.actualRightPage.nativeElement,
			dragging: false
		};
		//Next
		this.nextFlip = {
			progress: 1,
			target: 1,
			rightPage: this.nextRightPage.nativeElement,
			dragging: false
		};



		//Setting up the z index
		this.previousRightPage.nativeElement.style.zIndex = 2;
		this.actualRightPage.nativeElement.style.zIndex = 1;
		this.nextRightPage.nativeElement.style.zIndex = 0;
		// Canvas has the greatest zIndex
		this.canvas.nativeElement.style.zIndex = 4;

		// Create gesture obj w/ ref to DOM element
		this.gesture = new Gesture(this.eventHandling.nativeElement);
		this.gesture.listen();

		// Turn on listening for panning
		this.gesture.on('panstart', e => this.mouseDownHandler(e));
		this.gesture.on('pan', e => this.mouseMoveHandler(e));
		this.gesture.on('panend', e => this.mouseUpHandler(e));
		//this.intervalId = setInterval(() => this.render(), 1000 / 60);
	}
	/* Sets all size attributes */
	setBookAttributes(width, height) {
		// Determines the size of the book
		this.BOOK_WIDTH = width;
		this.BOOK_HEIGHT = height;
		// Determines the margin of the pages
		this.PAGE_MARGIN = this.BOOK_WIDTH * 0.01;
		// Determines the size of the pages
		this.PAGE_WIDTH = this.BOOK_WIDTH / 2 - this.PAGE_MARGIN * 2;
		this.PAGE_HEIGHT = this.BOOK_HEIGHT - this.PAGE_MARGIN * 2;

		this.imageHeight = this.PAGE_HEIGHT;
		this.imageWidth = this.PAGE_WIDTH;
		this.pageHeight = this.PAGE_HEIGHT;
		this.pageWidth = this.PAGE_WIDTH;
		this.bookHeight = this.BOOK_HEIGHT;
		this.bookWidth = this.BOOK_WIDTH;
		//this is so the book shows just 1 page
		this.bookLeftMovement = -(this.BOOK_WIDTH / 2) + this.zoomLeftMargin;
		this.bookTopMovement = this.zoomTopMargin;
		this.actualPageWidth = this.BOOK_WIDTH;

	}

	mouseMoveHandler(event) {
		if (this.flipActive) {
			//console.log("moving around");
			// Offset mouse position so that the top of the spine is 0
			this.mouse.x = event.center.x;
			this.mouse.y = event.center.y;
		}

	}

	mouseDownHandler(event) {
		//console.log("Down");
		if (this.flipActive) {
			this.mouse.x = event.center.x;
			this.mouse.y = event.center.y;
			if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
				if (this.mouse.x < 0.5 * this.PAGE_WIDTH && this.pageNum > 0) {
					this.actualFlip.dragging = true;
					this.actualFlip.progress = -1;
					this.decreasePage();
					this.actualFlip.target = -1;
				} else if (this.mouse.x > 0.5 * this.PAGE_WIDTH && this.pageNum < this.imageList.length - 1) {
					if (this.actualFlip.dragging || Math.abs(this.actualFlip.progress) < 0.996) {
						this.increasePage();
					}
					this.actualFlip.dragging = true;
					this.actualFlip.progress = 1;
					this.actualFlip.target = 1;
				}
			}
		}
		//Prevents the text selection cursor from appearing when dragging
		event.preventDefault();
	}
	mouseUpHandler(event) {
		//console.log("Up");
		if (this.flipActive) {
			// If the flip was being dragged we animate to its destination
			if (this.actualFlip.dragging) {
				this.actualFlip.target = this.mouse.x < 0.5 * this.PAGE_WIDTH ? -1 : 1;
			}
			this.actualFlip.dragging = false;
		}
	}
	render() {
		this.setBookAttributes(this.BOOK_WIDTH, this.BOOK_HEIGHT);
		if (this.flipActive) {
			this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);

			if (this.actualFlip.dragging) {
				this.actualFlip.target = Math.max(Math.min(this.mouse.x / this.PAGE_WIDTH, 1), -1);
			}
			this.actualFlip.progress += (this.actualFlip.target - this.actualFlip.progress) * 0.2;

			// If the flip is being dragged or is somewhere in the middle of the book, render it
			if (this.actualFlip.dragging || Math.abs(this.actualFlip.progress) < 0.997) {
				this.drawFlip(this.actualFlip);
			} else if (this.actualFlip.progress < 0) {
				this.actualFlip.target = 1;
				this.actualFlip.progress = 1;
				this.increasePage();
			}
		}
	}
	drawFlip2(flip){
		// Strength of the fold, is strongest in the middle of the book
		let strength = 1 - Math.abs(flip.progress);

		// Width of the folded paper
		let foldWidth = ((this.PAGE_WIDTH * 0.5) + this.PAGE_MARGIN) * (1 - flip.progress);

		// X position of the folded paper
		let foldX = (this.PAGE_WIDTH + this.PAGE_MARGIN * 2) * flip.progress + foldWidth;

		// The maximum width of the left and right side shadows
		
		this.actualPageWidth = Math.max(foldX - foldWidth, 0);

		//Here we use the gradient images overlaped with the pages to mimic the shadows
		this.paperShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
		this.rightShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
		this.leftShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
		this.foldWidth = foldWidth;

		this.paperShadowMargin = foldX  - this.paperShadowWidth + this.PAGE_WIDTH;
		this.rightShadowMargin = foldX + this.PAGE_WIDTH;
		this.leftShadowMargin = foldX - foldWidth - this.leftShadowWidth + this.PAGE_WIDTH;		
		this.foldMargin = foldX- foldWidth+this.PAGE_WIDTH;
		
	}


	drawFlip(flip) {
		
		// Strength of the fold, is strongest in the middle of the book
		let strength = 1 - Math.abs(flip.progress);

		// Width of the folded paper
		let foldWidth = ((this.PAGE_WIDTH * 0.5) + this.PAGE_MARGIN) * (1 - flip.progress);

		// X position of the folded paper
		let foldX = (this.PAGE_WIDTH + this.PAGE_MARGIN * 2) * flip.progress + foldWidth;

		// How far the page should outdent vertically due to perspective
		let verticalOutdent = this.PAGE_MARGIN * strength;

		// The maximum width of the left and right side shadows
		let paperShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
		let rightShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
		let leftShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);

		// Change the right page element width to match the x position of the fold
		//this.actualRightPage.nativeElement.style.width = Math.max(foldX - foldWidth + this.PAGE_MARGIN, 0) + "px";
		//flip.page.nativeElement.style.width = Math.max(foldX - foldWidth + this.PAGE_MARGIN, 0) + "px";
		this.actualPageWidth = Math.max(foldX - foldWidth, 0);
		
		this.context.save();
		//Set canvas in position
		this.context.translate((this.BOOK_WIDTH / 2), this.PAGE_MARGIN);
		
		// Draw a sharp shadow on the left side of the page
		this.context.strokeStyle = 'rgba(0,0,0,' + (0.05 * strength) + ')';
		this.context.lineWidth = 30 * strength;
		this.context.beginPath();
		this.context.moveTo(foldX - foldWidth, -verticalOutdent * 0.5);
		this.context.lineTo(foldX - foldWidth, this.PAGE_HEIGHT + (verticalOutdent * 0.5));
		this.context.stroke();
		
		// Right side drop shadow
		let rightShadowGradient = this.context.createLinearGradient(foldX, 0, foldX + rightShadowWidth, 0);
		rightShadowGradient.addColorStop(0, 'rgba(0,0,0,' + (strength * 0.2) + ')');
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
		leftShadowGradient.addColorStop(1, 'rgba(0,0,0,' + (strength * 0.15) + ')');

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
		this.context.moveTo(foldX, 0);
		this.context.lineTo(foldX, this.PAGE_HEIGHT);
		this.context.quadraticCurveTo(foldX, this.PAGE_HEIGHT + (verticalOutdent * 2), foldX - foldWidth, this.PAGE_HEIGHT + verticalOutdent);
		this.context.lineTo(foldX - foldWidth, -verticalOutdent);
		this.context.quadraticCurveTo(foldX, -verticalOutdent * 2, foldX, 0);
		this.context.fill();
		this.context.stroke();
		this.context.restore();
		
	}

	increasePage() {
		this.pageNum = this.pageNum + 1;
		this.previousImage = this.actualImage;
		this.actualImage = this.nextImage;
		this.drawFlip(this.actualFlip);
		this.nextImage = this.imageList[this.pageNum + 1];
	}

	decreasePage() {
		this.pageNum = this.pageNum - 1;
		this.nextImage = this.actualImage;
		this.actualImage = this.previousImage;
		this.drawFlip(this.actualFlip);
		this.previousImage = this.imageList[this.pageNum - 1];
	}

	navBack() {
		window.onorientationchange = null;
		this.navCtrl.pop();
	}

	/* Change view mode depending on the device's orientation */
	navToHorizontalBook() {
		//First we place the following page then we pop the actual so its a substitution
		if (window.orientation != 90 && window.orientation != -90) {
			this.navCtrl.insert(this.navCtrl.indexOf(this.navCtrl.last()), BookPage);
			this.navCtrl.pop();
		}
	}

	public getPageNum() {
		return this.pageNum;
	}
	public stopRendering() {
		clearInterval(this.intervalId);
	}
	public startRendering() {
		this.intervalId = setInterval(() => this.render(), 1000 / 25);
	}

}


/* //Code to fix for better functionality and logic 
	grabPage(event){
		//Initial position of the movement, the grabbing (spine is position 0)
		this.mouse.x = event.touches[0].clientX - this.book.nativeElement.offsetLeft - (this.BOOK_WIDTH / 2);
		this.mouse.y = event.touches[0].clientY - this.book.nativeElement.offsetTop;
		//If the touch is inside the page
		if (Math.abs(this.mouse.x) < this.PAGE_WIDTH) {
			//In the right side
			if (this.mouse.x < 0.5 * this.PAGE_WIDTH && this.pageNum > 0) {
				//right to left already moving 
				if(this.actualFlip.target == -1 && this.actualFlip.progress >=0.5){
					this.pageNum += 1;
					//previousFlip is now the same as actualFlip
					this.previousFlip.target = -1;
					this.previousFlip.progress = this.actualFlip.progress;
					this.previousImage = this.actualImage;
					//actualFlip is now the same as nextFlip
					this.actualFlip.target = -1;
					this.actualFlip.progress = -1;
					this.actualImage = this.nextImage;
					//nextFlip is now a newFlip with a new page
					this.nextFlip.target = -1;
					this.nextFlip.progress = -1;
					this.nextImage = this.imageList[this.pageNum+1];
				}
				//left to right already moving or no movement
				//we pick the moving flip so we don't have to chage flips				
				
				this.actualFlip.dragging = true;
			}
			//In the left side
			if (this.mouse.x > 0.5 * this.PAGE_WIDTH && this.pageNum < this.imageList.length) {
				//left to right already moving
				if(this.actualFlip.target == 1){
					this.pageNum -= 1;
					//nextFlip is now the same as actualFlip
					this.nextFlip.target = 1;
					this.nextFlip.progress = this.actualFlip.progress;
					this.nextImage = this.actualImage;
					//actualFlip is now the same as nextFlip
					this.actualFlip.target = -1;
					this.actualFlip.progress = -1;
					this.actualImage = this.previousImage;
					//previousFlip is now a newFlip with a new page
					this.previousFlip.target = -1;
					this.previousFlip.progress = -1;
					this.previousImage = this.imageList[this.pageNum+1];
				}
			}
		}
		event.preventDefault();
	}

	dragPage(event){
		// We just save the new location of the pointer
		this.mouse.x = event.center.x - this.book.nativeElement.offsetLeft - (this.BOOK_WIDTH / 2);
		this.mouse.y = event.center.y - this.book.nativeElement.offsetTop;
	}

	releasePage(event){

		if (this.actualFlip.dragging) {
			this.actualFlip.target = this.mouse.x < 0.5 * this.PAGE_WIDTH ? -1 : 1;
		}
		this.actualFlip.dragging = false;
	}
*/