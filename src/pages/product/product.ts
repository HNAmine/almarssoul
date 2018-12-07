import { BasketPage } from './../basket/basket';
import { Category } from "./../../model/category.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ModalController, ViewController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";
import { Product } from "../../model/product.model";

@Component({
  selector: "product",
  templateUrl: "product.html"
})
export class ProductPage {
  category: Category = null;

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public questionService: QuestionService,
    public modalCtrl: ModalController
  ) {
    this.category = navParams.get("data");
    this.loadProductsOfCategory(this.category.id);
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

  loadProductsOfCategory(id: number) {
    this.category.products = [
      new Product(1, "Viande boeuf", 1200),
      new Product(1, "Viande mouton", 800),
      new Product(1, "Viande chefvre", 1400)
    ];
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  openProductModal(){
    let profileModal = this.modalCtrl.create(ProductModal, { userId: 8675309 });
    profileModal.present()
  }
}

@Component({
  selector: 'product-modal',
  template: `
  <ion-header>
  <ion-toolbar>
    <ion-title>
      <button ion-button style="font-size: 30px;color:white;" clear item-end>
        <ion-icon name="md-add-circle" style="margin-right:10px"></ion-icon> au panier
      </button>
    </ion-title>
    <ion-buttons start>
      <button ion-button (click)="dismiss()">
        <span ion-text color="primary" showWhen="ios">Cancel</span>
        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>
      </button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content>

</ion-content>
  `
})
export class ProductModal {

 constructor(params: NavParams, public viewCtrl: ViewController) {
   console.log('UserId', params.get('userId'));
 }

 dismiss() {
  this.viewCtrl.dismiss();
}
}
