import { Authentification } from './../pages/authentification/authentification';
import { Component } from '@angular/core';
import { Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { langIndex } from './config';

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
    private translate: TranslateService,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const langs = ["en", "fr", "ar"];
      const defaultLang = 'en';
      this.translate.addLangs(langs);

      this.storage.get(langIndex).then((lang) => {
        if(!lang){
          this.storage.set(langIndex, defaultLang);
          this.translate.use(defaultLang);
        }
        else {
          this.translate.use(lang);
        }
      });

    });
  }

}
