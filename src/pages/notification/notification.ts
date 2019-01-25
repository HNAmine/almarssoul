import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { User } from '../../model/authentification.model';
import { NotificationService } from '../../providers/notification.service';
import { Notification } from '../../model/notification.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "notification",
  templateUrl: "notification.html"
})
export class NotificationPage {
  principal = {};
  currentUser: User = {};
  token = null;
  notifications:Notification[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private notificationService: NotificationService,
    private translate: TranslateService
  ) {
    this.loadNotification();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  async loadNotification(){

    const pleaseWaitLabel:any = await this.translate.get('please_wait');
    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });
    loader.present();
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    });
  }

  async readNotification(notification: Notification){
    const pleaseWaitLabel:any = await this.translate.get('please_wait');
    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });
    loader.present();
    this.notificationService.readNotification(notification.id).subscribe(() => {
      notification.readed = true;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    });
  }
}
