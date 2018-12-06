import { UserLogin } from './../user-login/user-login';
import { SponsorPage } from "./../sponsor/sponsor";
import { ProgramPage } from "./../program/program";
import { ContactPage } from "./../contact/contact";
import { WelcomePage } from "./../welcome/welcome";
import { CommitteePage } from "./../committee/committee";
import { SpeakerPage } from "./../speaker/speaker";
import { AddQuestions } from "./../add-questions/add-questions";

import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav, NavController } from "ionic-angular";
// import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from "../dashboard/dashboard";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { QuestionService } from "../../providers/question.service";

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

  // make HelloIonicPage the root (or first) page
  rootPage = Dashboard;
  pages: Array<{ title: string; icon: string; component: any }>;
  icons: {
    principal?: string;
    event?: string;
  } = {};
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public questionService: QuestionService,
    public navCtrl: NavController
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: "Accueil", icon: "home", component: Dashboard },
      { title: "Produits", icon: "md-list", component: AddQuestions },
      {
        title: "Mes paniers",
        icon: "ios-basket",
        component: WelcomePage
      }
      // ,
      // { title: "Program", icon: "list", component: ProgramPage },
      // { title: "Speakers", icon: "ios-people", component: SpeakerPage },
      // { title: "Committees", icon: "md-people", component: CommitteePage },
      // { title: "Sponsors", icon: "md-people", component: SponsorPage },
      // { title: "Contact us", icon: "call", component: ContactPage }
    ];

    this.questionService.getCurrentIcons().subscribe(icons => {
      this.icons = icons;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logout(){
    this.questionService.email = null;
    this.navCtrl.setRoot(UserLogin);
  }
}
