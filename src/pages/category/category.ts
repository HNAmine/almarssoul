import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Store } from '../../model/store.model';
import { ProductPage } from '../product/product';
import { Category } from '../../model/category.model';

@Component({
  selector: "category",
  templateUrl: "category.html"
})
export class CategoryPage {
  store: Store = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.store = navParams.get("data");
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