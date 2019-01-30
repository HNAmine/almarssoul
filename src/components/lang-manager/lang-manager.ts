import { Component } from '@angular/core';
import { LoadingController, ToastController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { langIndex } from '../../app/config';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'lang-manager',
  templateUrl: 'lang-manager.html'
})
export class LangManagerComponent {

  langs = [/*{label: "Anglais", value: "en"}, */{label: "Français", value: "fr"}, {label: "العربية", value: "ar"}];
  currentLang = "ar";

  constructor(public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private translate: TranslateService,
    private storage: Storage) {
      this.storage.get(langIndex).then((lang) => {
        if(!lang){
          this.storage.set(langIndex, this.currentLang);
          this.translate.use(this.currentLang);
        }
        else {
          this.translate.use(lang);
          this.currentLang = lang;
        }
      });
  }

  onSetLang(){
    this.storage.set(langIndex, this.currentLang);
    this.translate.use(this.currentLang);
  }
}
