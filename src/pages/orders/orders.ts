import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrdersPage");
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }
}
