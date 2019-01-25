import { Component } from "@angular/core";
import { NavController, LoadingController, ToastController } from "ionic-angular";
import { BasketPage } from "../basket/basket";
import { AuthentificationService } from "../../providers/authentification.service";
import { Invitation } from "../../model/authentification.model";
// import { SMS } from '@ionic-native/sms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "invitation",
  templateUrl: "invitation.html"
})
export class InvitationPage {
  mode: string = "ADD";
  invitations:Invitation[] = [];
  phone: string;
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private authentificationService: AuthentificationService,
    public toastCtrl: ToastController,
    // private sms: SMS,
    private socialSharing: SocialSharing,
    private translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
      this.loadInvitation();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  async loadInvitation(){
    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });

    loader.present();
    this.authentificationService.getInvitation().subscribe(invitations => {
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

  async invite() {

    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });
    loader.present();
      this.authentificationService.invite(this.phone).subscribe((invitation: Invitation) => {
        loader.dismiss();
        this.phone = null;
        const toast = this.toastCtrl.create({
          message: 'well sent invitation',
          duration: 3000
        });
        // this.sms.send(invitation.phone, this.getMessageFromInvitation(invitation));
        this.whatsAppNotify(invitation);
        toast.present();
        this.loadInvitation();
      }, err => {
        loader.dismiss();
        throw err;
      })
  }

  getMessageFromInvitation(invitation: Invitation){
    return 'Hello My friend, please subscribe to almarssoul application, your activation code is :'+ invitation.validationCode + ' your phone (login) is : '+ invitation.phone
  }
  
  whatsAppNotify(invitation: Invitation){
    this.socialSharing.shareViaWhatsAppToReceiver(invitation.phone, this.getMessageFromInvitation(invitation));
  }
}
