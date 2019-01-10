import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { UserSignup } from "../user-signup/user-signup";
import { Home } from "./../home/home";
import { AuthentificationService } from "../../providers/authentification.service";
import { Credentials } from "../../model/authentification.model";
import { Value } from "../../model/shared.model";
import { Storage } from '@ionic/storage';
import { tokenIndex } from "../../app/config";
import { CustomError } from "../../app/errors.handler";

@Component({
  selector: "page-user-login",
  templateUrl: "user-login.html"
})
export class UserLogin {

  credential: Credentials = {login:null ,password:null};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private authentificationService: AuthentificationService,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserLogin");
  }

  homePage() {
    this.navCtrl.push(Home);
  }

  signupPage() {
    this.navCtrl.push(UserSignup);
  }

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present();
      this.authentificationService.signin(this.credential).subscribe((token:Value<string>) => {

        if(this.authentificationService.isClient(token.value)) {
         // set a key/value
         this.storage.set(tokenIndex, token.value);
         loader.dismiss();
         this.homePage();
        } else {
          loader.dismiss();
          throw new Error('You are not authorised')
        }
      }, (err: { error: CustomError } )=> {
        loader.dismiss();
        throw err;
      });
  }
}
