import { Component } from '@angular/core';
import { LoadingController, ToastController, ModalController } from 'ionic-angular';

@Component({
  selector: 'lang-manager',
  templateUrl: 'lang-manager.html'
})
export class LangManagerComponent {
  currencyList = [
    'INR',
    'GBP',
    'USD',
    'NZD'
  ]
  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
  }

}
