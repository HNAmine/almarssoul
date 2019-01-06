import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { Store } from '../../model/store.model';
import { ProductPage } from '../product/product';
import { Category } from '../../model/category.model';

@Component({
  selector: "category",
  templateUrl: "category.html"
})
export class CategoryPage {
  store: Store = null;

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController
  ) {
    this.store = navParams.get("data");
  }

  onNavigate(url: string) {
    window.open(url, "_blank");
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

  goToCategoryDetails(category: Category){
    this.navCtrl.push(ProductPage, {
      store : this.store,
      category
    });
  }
}