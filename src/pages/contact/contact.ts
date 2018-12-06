import { Contact } from "./../../model/contact.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { QuestionService } from "../../providers/question.service";

@Component({
  selector: "contact",
  templateUrl: "contact.html"
})
export class ContactPage {

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  contact: Contact = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public questionService: QuestionService) {
    this.presentLoading();
    this.questionService.getContacts().subscribe(
      contact => {
        this.contact = contact;
        this.dismissLoading();
      },
      err => {
        this.dismissLoading();
      }
    );
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
}
