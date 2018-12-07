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

  }
}
