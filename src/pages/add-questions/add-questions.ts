import { Dashboard } from "./../dashboard/dashboard";
import { Speaker } from "./../../model/speaker.model";
import { Section } from "./../../model/section.model";
import { QuestionService } from "./../../providers/question.service";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-add-questions",
  templateUrl: "add-questions.html"
})
export class AddQuestions {
  sections: Section[] = [];
  speakers: Speaker[] = [];
  request: any = {};

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private questionService: QuestionService,
    public loadingCtrl: LoadingController
  ) {
    this.presentLoading();
    this.questionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.dismissLoading();
    }, (err) => {
      this.dismissLoading();
    });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad AddQuestions");
  }

  addQuestion() {
    const confirm = this.alertCtrl.create({
      title: "Are you sure ?",
      message: "Are you sure , to post this question ?",

      buttons: [
        {
          text: "Disagree",
          handler: () => {
            this.request = {};
          }
        },
        {
          text: "Agree",
          handler: () => {
            this.confirmQuestionCreation();
          },
          cssClass: "agree"
        }
      ]
    });
    confirm.present();
  }

  confirmQuestionCreation() {
    this.questionService.addQuestion(this.request).subscribe(succes => {
      this.request.submited = true;
      setTimeout(() => {
        this.navCtrl.push(Dashboard);
      }, 3000);
    }, (err)=> {
    });
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  onSelectSection(section: Section) {
    this.request.sectionId = section.id;
    this.speakers = section.speackers.slice(0);
    this.speakers.unshift(
      new Speaker(-1, "To All speackers", null, null, null)
    );
  }
}
