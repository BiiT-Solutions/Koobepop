import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
@Injectable()
export class ToastIssuer {
    GOOD_TOAST_CLASS = 'good-toast'
    BAD_TOAST_CLASS = 'bad-toast'
    constructor(public toastCtrl: ToastController) { }
    public goodToast(text: string, time: number = 1500): void {
       this.toast(text, time, this.GOOD_TOAST_CLASS);
    }
    public badToast(text: string, time: number = 1500): void {
        this.toast(text, time, this.BAD_TOAST_CLASS);
    }
    private toast(text: string, time: number, cssClass: string) {
        let toast = this.toastCtrl.create({
            message: text,//TODO change 
            duration: time,
            cssClass: cssClass
        });
        toast.present();
    }
}