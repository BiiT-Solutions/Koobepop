import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CompaniesProvider } from '../../providers/companies'
import { DetailsPage } from '../details/details';
import { TranslateService } from 'ng2-translate';
/**
 * Here we manage the book page 
 */
@Component({
	selector: 'page-book',
	templateUrl: 'book.html'
})

export class BookPage implements AfterViewInit {
	BOOK_WIDTH = 400;
	BOOK_HEIGHT = 200;
	PAGE_WIDTH = 0;
	PAGE_HEIGHT = 0;
	PAGE_MARGIN = 0;
	pageNum = 0;

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

	@ViewChild("book") book: ElementRef;
	@ViewChild("pageflipCanvas") canvas: ElementRef;
	context: CanvasRenderingContext2D;
	hideHeader: boolean;
	id;
	scaling = false;
	constructor(public navCtrl: NavController, private companies: CompaniesProvider, private translate: TranslateService) {
		this.imageList = companies.getImages();
		this.actualImage = this.imageList[this.pageNum];
		this.nextImage = this.imageList[this.pageNum + 1];
		this.previousImage = this.imageList[this.pageNum - 1];
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

	ngAfterViewInit() {
		this.PAGE_MARGIN = window.outerWidth * 0.05;
		this.BOOK_WIDTH = window.outerWidth * 2;
		this.BOOK_HEIGHT = window.outerHeight;
		this.PAGE_WIDTH = this.BOOK_WIDTH / 2 - this.PAGE_MARGIN * 2;
		this.PAGE_HEIGHT = this.BOOK_HEIGHT - this.PAGE_MARGIN * 2;
		this.canvas.nativeElement.width = this.BOOK_WIDTH;
		this.canvas.nativeElement.height = this.BOOK_HEIGHT;
		this.book.nativeElement.style.marginLeft = - this.PAGE_WIDTH + "px";
		this.context = this.canvas.nativeElement.getContext("2d");
		//Pages 
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

		this.previousRightPage.nativeElement.style.marginLeft = this.PAGE_MARGIN + "px";
		this.previousRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN + "px";
		this.actualRightPage.nativeElement.style.marginLeft = this.PAGE_WIDTH + this.PAGE_MARGIN + "px";
		this.actualRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN + "px";
		this.nextRightPage.nativeElement.style.marginLeft = this.PAGE_WIDTH + this.PAGE_MARGIN + "px";
		this.nextRightPage.nativeElement.style.marginTop = this.PAGE_MARGIN + "px";

		this.previousRightPage.nativeElement.style.zIndex = 2;
		this.actualRightPage.nativeElement.style.zIndex = 1;
		this.nextRightPage.nativeElement.style.zIndex = 0;
	}
/*
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
	mouseMoveHandler(event) {

		// Offset mouse position so that the top of the spine is 0
		this.mouse.x = event.center.x - this.book.nativeElement.offsetLeft - (this.BOOK_WIDTH / 2);
		this.mouse.y = event.center.y - this.book.nativeElement.offsetTop;

	}
	mouseUpHandler(event) {

		// If the flip was being dragged we animate to its destination
		if (this.actualFlip.dragging) {
			this.actualFlip.target = this.mouse.x < 0.5 * this.PAGE_WIDTH ? -1 : 1;
		}
		this.actualFlip.dragging = false;
	}
	mouseDownHandler(event) {
		this.mouse.x = event.touches[0].clientX - this.book.nativeElement.offsetLeft - (this.BOOK_WIDTH / 2);
		this.mouse.y = event.touches[0].clientY - this.book.nativeElement.offsetTop;
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
		//Prevents the text selection cursor from appearing when dragging
		event.preventDefault();
	}

	

	render() {
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
    
	drawFlip(flip) {
		// Strength of the fold, is strongest in the middle of the book
		let strength = 1 - Math.abs(flip.progress);

		// Width of the folded paper
		let foldWidth = (this.PAGE_WIDTH * 0.5) * (1 - flip.progress);

		// X position of the folded paper
		let foldX = this.PAGE_WIDTH * flip.progress + foldWidth;

		// How far the page should outdent vertically due to perspective
		let verticalOutdent = this.PAGE_MARGIN * strength;

		// The maximum width of the left and right side shadows
		let paperShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(1 - flip.progress, 0.5), 0);
		let rightShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);
		let leftShadowWidth = (this.PAGE_WIDTH * 0.5) * Math.max(Math.min(strength, 0.5), 0);

		// Change the right page element width to match the x position of the fold
		this.actualRightPage.nativeElement.style.width = Math.max(foldX - foldWidth + this.PAGE_MARGIN, 0) + "px";

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

	navBack() {
		window.onorientationchange = null;
		this.navCtrl.pop();
	}
	/* Change view mode depending on the device's orientation */
	navToHorizontalBook() {
		//TODO remove logs, add logger class
		console.log("Orientation change: " + window.orientation);
		//First we place the following page then we pop the actual so its a substitution
		if (window.orientation != 90 && window.orientation != -90) {
			this.navCtrl.insert(this.navCtrl.indexOf(this.navCtrl.last()), BookPage);
			this.navCtrl.pop();
		}
	}

	navDetails() {
		this.navCtrl.push(DetailsPage, this.pageNum);
	}

	
	ionViewWillEnter() {	
		window.onorientationchange = e => this.navToHorizontalBook();
		this.id = setInterval(() => this.render(), 1000 / 60);
		this.hideHeader = true;	
	}
	/* When  we exit the page we don't want that behaviour anymore*/
	ionViewDidLeave() {
		window.onorientationchange = null;
		clearInterval(this.id);
	}
}


