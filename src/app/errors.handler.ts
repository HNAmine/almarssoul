import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

export interface CustomError {
  timestamp: string;
  message: string;
  details: string;
  debugMessage: string;
  subExceptions: string;
  status: string;
  exceptionType: string;
}

@Injectable()
export class ErrorsHandler implements ErrorHandler {

  constructor(public alertCtrl: AlertController) {
  }

  showAlert(content: string) {
    const alert = this.alertCtrl.create({
      title: 'Alert !',
      subTitle: content,
      buttons: ['OK'],
      enableBackdropDismiss : true
    });
    alert.present();
  }

  handleError(payload: { error: CustomError }) {
    if (payload instanceof HttpErrorResponse) {
      // Server or connection error happened
      if (!navigator.onLine) {
        // Handle offline error
        // this.iziToast.error({title: 'No Internet Connection', position: 'topCenter', toastOnce: true});
      } else if (payload.error && payload.error.message) {
         this.showAlert(payload.error.message);
      } else {
        // go to login page !
        // this.iziToast.error({title: 'Service not available', position: 'topCenter', toastOnce: true});
        // this.router.navigate(['auth']);
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
      console.log('Handle Client Error (Angular Error, ReferenceError...)');
      console.log(payload);
    }
  }
}
