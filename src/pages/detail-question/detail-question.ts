import { QuestionService } from './../../providers/question.service';
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
  selector: "detail-question",
  templateUrl: "detail-question.html"
})
export class DetailQuestion {

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  question:any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public questionService: QuestionService,
    public loadingCtrl: LoadingController,
    public nacParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    this.presentLoading();
    this.dismissLoading();

    this.question = this.nacParams.get('question');
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
