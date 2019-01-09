import { Component } from "@angular/core";
import { NavController, LoadingController } from "ionic-angular";
import { BasketPage } from "../basket/basket";
import { AuthentificationService } from "../../providers/authentification.service";
import { Invitation } from "../../model/authentification.model";
import { Storage } from '@ionic/storage';
import { tokenIndex } from "../../app/config";

@Component({
  selector: "invitation",
  templateUrl: "invitation.html"
})
export class InvitationPage {
  mode: string = "ADD";
  token = null;
  invitations:Invitation[] = [];
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private storage: Storage,

    private authentificationService: AuthentificationService
  ) {
  }

  ionViewDidLoad() {
    this.storage.get(tokenIndex).then((token) => {
      this.token = token;
      this.loadInvitation();
    });
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadInvitation(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.authentificationService.getInvitation(this.token).subscribe(invitations => {
        this.invitations = invitations;
        loader.dismiss();
    }, () => {
      loader.dismiss();
    })
  }

  getTrigram(firstName, lastName) {
    let trigram = firstName ? firstName.charAt(0) : null;
    if(lastName){
      trigram += lastName.charAt(0);
    }
    return trigram;
  }
}
