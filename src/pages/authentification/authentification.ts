import { UserLogin } from './../user-login/user-login';
import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { GooglePlus } from '@ionic-native/google-plus';
import { UserSignup } from '../user-signup/user-signup';
import { tokenIndex } from '../../app/config';
import { Storage } from '@ionic/storage';
import { UserInvited } from '../user-invited/user-invited';

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
    private googlePlus: GooglePlus,
    private storage: Storage
  ) {
    this.storage.remove(tokenIndex);
  }

  ionViewDidLoad() {
  }

  loginGoogle(){
    this.googlePlus.login({}).then(
      res => {
        const toast = this.toastCtrl.create({
          message: 'User information '+res.displayName + res.email + res.familyName + res.givenName + res.userId + res.imageUrl,
          duration: 3000
        });
        toast.present();
        }).catch(err => {
        const toast = this.toastCtrl.create({
          message: 'Err '+ err,
          duration: 3000
        });
        toast.present();
        console.error(err)});
  }

  login() {
    this.navCtrl.push(UserLogin);
  }

  signup(){
    this.navCtrl.push(UserSignup);
  }

  invited(){
    this.navCtrl.push(UserInvited);
  }

}
