import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { Committee } from "../../model/committee.model";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "Committee",
  templateUrl: "Committee.html"
})
export class CommitteePage {
  committees: Committee[] = [];
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(public navCtrl: NavController,public navParams: NavParams, public loadingCtrl: LoadingController, public questionService: QuestionService) {
    this.presentLoading();
    this.questionService.getCommittees().subscribe(
      committees => {
        this.committees = committees;
        this.dismissLoading();
      },
      err => {
        this.dismissLoading();
      }
    );
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad Comittee");
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
