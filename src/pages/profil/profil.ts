import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "profil",
  templateUrl: "profil.html"
})
export class ProfilPage {

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public questionService: QuestionService
  ) {
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

}
