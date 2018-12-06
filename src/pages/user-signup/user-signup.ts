import { QuestionService } from "./../../providers/question.service";
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController } from "ionic-angular";

import { Dashboard } from "../dashboard/dashboard";
import { UserLogin } from "../user-login/user-login";

@Component({
  selector: "page-user-signup",
  templateUrl: "user-signup.html"
})
export class UserSignup {
  principal: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private questionService: QuestionService,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserSignup");
  }

  dashboardPage() {
    this.navCtrl.push(Dashboard);
  }
  loginPage() {
    this.navCtrl.push(UserLogin);
  }

  register() {
    this.questionService.register(this.principal).subscribe(
      res => {
        const toast = this.toastCtrl.create({
          message: "Account was added successfully",
          duration: 3000
        });
        this.principal = {};
        toast.present();
      },
      err => {
        if (err.status == 300) {
          const toast = this.toastCtrl.create({
            message: "Email aleray exist",
            duration: 3000
          });
          toast.present();
        }
      }
    );
  }
}
