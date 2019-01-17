import { Authentification } from './../pages/authentification/authentification';
import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationAccuracy } from '@ionic-native/location-accuracy';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // make HelloIonicPage the root (or first) page
  rootPage = Authentification;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private locationAccuracy: LocationAccuracy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
