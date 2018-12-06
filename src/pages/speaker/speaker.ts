import { Speaker } from "./../../model/speaker.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "speaker",
  templateUrl: "speaker.html"
})
export class SpeakerPage {
  speakers: Speaker[] = [];
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public questionService: QuestionService) {
    this.presentLoading();
    this.questionService.getSpeackers().subscribe(
      speakers => {
        this.speakers = speakers;
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
