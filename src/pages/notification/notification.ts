import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ToastController } from "ionic-angular";
import { User } from '../../model/authentification.model';
import { NotificationService } from '../../providers/notification.service';
import { Notification } from '../../model/notification.model';

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
    private notificationService: NotificationService
  ) {
    this.loadNotification();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadNotification(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.notificationService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    });
  }

  readNotification(notification: Notification){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
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
