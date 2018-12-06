import { QuestionService } from './../../providers/question.service';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController
} from "ionic-angular";
import { DetailQuestion } from '../detail-question/detail-question';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-list-questions",
  templateUrl: "list-questions.html"
})
export class ListQuestions {

  topics: any[] = [];
  initTopics: any[] = [];
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

  }

  ionViewDidLoad() {
    this.presentLoading();
    this.questionService.getTopics().subscribe(topics => {
      this.topics = topics;
      this.initTopics = this.topics;
      this.dismissLoading();
    },()=> {
      this.dismissLoading();
    });
  }

  search($event) {
    let keyword = $event.target.value;
    if (!keyword || keyword === '' || keyword.trim() === "") {
      this.initTopic();
    } else {
      this.topics = Object.assign(this.topics.filter(topic => topic.value.toLowerCase().includes(keyword.toLowerCase())));
    }
  }

  initTopic() {
    this.topics = Object.assign(this.initTopics);
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  goToDetailPage(question) {
    this.navCtrl.push(DetailQuestion, { question });
  }
}
