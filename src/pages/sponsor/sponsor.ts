import { Sponsor } from "./../../model/sponsor.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "sponsor",
  templateUrl: "sponsor.html"
})
export class SponsorPage {
  sponsors: Sponsor[] = [];
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,public questionService: QuestionService, public loadingCtrl: LoadingController) {
    this.presentLoading();
    this.questionService.getSponsors().subscribe(
      sponsors => {
        this.sponsors = sponsors;
        this.dismissLoading();
      },
      err => {
        this.dismissLoading();
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad speaker");
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
