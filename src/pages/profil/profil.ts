import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { User } from '../../model/authentification.model';
import { tokenIndex } from '../../app/config';
import { AuthentificationService } from '../../providers/authentification.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: "profil",
  templateUrl: "profil.html"
})
export class ProfilPage {
  principal = {};
  currentUser: User = {};
  token = null;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private authentificationService: AuthentificationService,
    public toastCtrl: ToastController
  ) {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.currentUser = this.authentificationService.getCurrentUser();
    loader.dismiss();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  save() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authentificationService.updateUserInfo(this.currentUser).subscribe(payload => {
      // set a key/value
      this.storage.remove(tokenIndex);
      this.storage.set(tokenIndex, payload.value);
      loader.dismiss();
      this.authentificationService.refreshPrincipal();
      const toast = this.toastCtrl.create({
        message: 'User was updated successfully',
        duration: 3000
      });
      toast.present();
    },(err)=> {
      loader.dismiss();
      throw err;
    });
  }
}
