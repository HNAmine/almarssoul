import { ProfilPage } from './../profil/profil';
import { BasketPage } from './../basket/basket';
import { OrdersPage } from './../orders/orders';
import { Authentification } from './../authentification/authentification';

import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav, NavController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { AuthentificationService } from '../../providers/authentification.service';
import { User } from '../../model/authentification.model';
import { InvitationPage } from '../invitation/invitation';
import { NotificationPage } from '../notification/notification';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class Home {
  @ViewChild(Nav) nav: Nav;

  rootPage = Dashboard;

  pages: Array<{ title: string; icon: string; component: any }>;

  currentUser: User = null;

  trigram = null;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public navCtrl: NavController,
    private authentificationService: AuthentificationService,
    private locationAccuracy: LocationAccuracy
  ) {
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: "modules.home", icon: "home", component: Dashboard },
      { title: "modules.orders", icon: "md-list", component: OrdersPage },
      {
        title: "modules.basket",
        icon: "ios-basket",
        component: BasketPage
      },
      { title: "modules.invite", icon: "md-mail", component: InvitationPage },
      { title: "modules.notification", icon: "md-notifications", component: NotificationPage },
      { title: "modules.profile", icon: "md-person", component: ProfilPage }
    ];
  }

  ionViewDidLoad() {
      this.currentUser = this.authentificationService.getCurrentUser();
      this.getTrigram(this.currentUser.firstName, this.currentUser.lastName);

    this.authentificationService.activeUser.subscribe((_user)=>{
      this.currentUser = _user;
      this.getTrigram(this.currentUser.firstName, this.currentUser.lastName);
    })
  }

  getTrigram(firstName, lastName) {
    this.trigram = firstName ? firstName.charAt(0) : null;
    if(lastName){
      this.trigram += lastName.charAt(0);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.locationAccuracy.canRequest().then((canRequest: boolean) => {

        if(canRequest) {
          // the accuracy option will be ignored by iOS
          this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
            () => console.log('Request successful'),
            error => console.log('Error requesting location permissions', error)
          );
        }
      
      });
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
    this.nav.insert(0,page.component);
    this.nav.popToRoot();
  }

  logout(){
    this.navCtrl.setRoot(Authentification);
  }

}
