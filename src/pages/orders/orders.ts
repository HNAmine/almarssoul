import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { Storage } from '@ionic/storage';
import { tokenIndex } from '../../app/config';
import { BasketService } from '../../providers/basket.service';
import { AssignmentGlobal } from '../../model/product.model';

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

  token = null;
  assignmentGlobals:AssignmentGlobal[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private basketService:BasketService
  ) {
  }

  ionViewDidLoad() {
    this.storage.get(tokenIndex).then((token) => {
      this.token = token;
      this.loadCommandes();
    });
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadCommandes() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.getCommandes(this.token).subscribe((assignmentGlobals:AssignmentGlobal[])=> {
        this.assignmentGlobals = assignmentGlobals;
        loader.dismiss();
    }, () => {
        loader.dismiss();
    })
  }
}
