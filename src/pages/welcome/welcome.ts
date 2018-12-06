import { Welcome } from "./../../model/welcome.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "welcome",
  templateUrl: "welcome.html"
})
export class WelcomePage {
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  public welcome: Welcome = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public questionService: QuestionService) {
    this.presentLoading();
    this.questionService.getWelcomeMessage().subscribe(
      welcome => {
        this.welcome = welcome;
        this.dismissLoading();
      },
      err => {
        this.dismissLoading();
      }
    );
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
