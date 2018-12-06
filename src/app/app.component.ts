import { Authentification } from './../pages/authentification/authentification';
import { UserLogin } from './../pages/user-login/user-login';
import { ListQuestions } from './../pages/list-questions/list-questions';
import { AddQuestions } from './../pages/add-questions/add-questions';

import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { Dashboard } from '../pages/dashboard/dashboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { QuestionService } from '../providers/question.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Authentification;
  pages: Array<{title: string,icon:string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public questionService: QuestionService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [

      { title: 'Dashbaord', icon: 'home', component: Dashboard },
      { title: 'Ask a question', icon: 'md-help', component: AddQuestions },
      { title: 'View all questions', icon: 'list', component: ListQuestions }
    ];

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

}
