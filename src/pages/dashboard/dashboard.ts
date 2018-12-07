import { BasketPage } from './../basket/basket';
import { Authentification } from './../authentification/authentification';
import { ProductPage } from './../product/product';
import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { QuestionService } from "../../providers/question.service";
import { Category } from "./../../model/category.model";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class Dashboard {
  categories: Category[] = [];
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public questionService: QuestionService
  ) {
    this.categories.push(
      new Category(1, "Viandes", "67 Listings", "http://i.f1g.fr/media/ext/1900x1900/madame.lefigaro.fr/sites/default/files/img/2016/08/consommer-trop-de-viande-favoriserait-la-depression.jpg"),
      new Category(2, "Légumes", "41 Listings", "https://i-sam.unimedias.fr/2017/11/22/legumes.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=crop&h=388&w=690"),
      new Category(3, "Poulets", "111 Listings", "https://www.fermedubio.com/uploaded/1/35/big/altimage380.jpg"),
      new Category(4, "Poissons", "29 Listings" , "http://djolo.net/wp-content/uploads/2014/12/Ebadjea.jpg"),
      new Category(4, "Menage", "120 Listings" , "http://www.natura-sciences.com/wordpress/wp-content/uploads/2013/11/produits-d-entretien.jpg")
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Dashboard");
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  goToCategoryDetails(categorie: Category){
    this.navCtrl.push(ProductPage, {
      data: categorie
    });
  }

  logout(){
    this.navCtrl.setRoot(Authentification);
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }
}
