import { UserLogin } from './../user-login/user-login';
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { GooglePlus } from '@ionic-native/google-plus';

@Component({
  selector: "page-authentification",
  templateUrl: "authentification.html"
})
export class Authentification {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private googlePlus: GooglePlus
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserLogin");
  }

  loginGoogle(){
    this.googlePlus.login({}).then(
      res => {
        debugger;
        console.log(res)}).catch(err => {
          debugger;

          console.error(err)});
  }
  login() {
    this.navCtrl.push(UserLogin);
  }
}
