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
import { TranslateService } from "@ngx-translate/core";

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
    private storage: Storage,
    private translate: TranslateService
  ) {}

  ionViewDidLoad() {
  }

  homePage() {
    this.navCtrl.push(Home);
  }

  signupPage() {
    this.navCtrl.push(UserSignup);
  }

  async signin() {

    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });

    loader.present();
      this.authentificationService.signin(this.credential).subscribe((token:Value<string>) => {

        this.authentificationService.token = token.value;

        this.authentificationService.refreshPrincipal();

        if(this.authentificationService.isClient()) {

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
