import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";

import { Dashboard } from "../dashboard/dashboard";
import { UserLogin } from "../user-login/user-login";
import { AuthentificationService } from "../../providers/authentification.service";
import { Value } from "../../model/shared.model";
import { Storage } from '@ionic/storage';
import { tokenIndex } from "../../app/config";
import { Home } from "../home/home";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "page-user-invited",
  templateUrl: "user-invited.html"
})
export class UserInvited {
  invited: any = {};

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
    console.log("ionViewDidLoad UserSignup");
  }

  dashboardPage() {
    this.navCtrl.push(Dashboard);
  }
  loginPage() {
    this.navCtrl.push(UserLogin);
  }

  async register() {
    const pleaseWaitLabel:any = await this.translate.get('please_wait');
    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });
    loader.present();
    this.authentificationService.acceptInvitation(this.invited).subscribe((token:Value<string>) => {
          this.storage.set(tokenIndex, token.value);
          this.authentificationService.token = token.value;
          this.authentificationService.refreshPrincipal();
          loader.dismiss();
          this.homePage();
        }, (err)=> {
          loader.dismiss();
          throw err;
        });
  }


  homePage() {
    this.navCtrl.push(Home);
  }

}
