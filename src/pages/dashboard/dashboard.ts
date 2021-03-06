import { BasketPage } from './../basket/basket';
import { Authentification } from './../authentification/authentification';
import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { StoreService } from '../../providers/store.service';
import { Store } from '../../model/store.model';
import { Category } from '../../model/category.model';
import { CategoryPage } from '../category/category';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class Dashboard {

  pageable = {search: '', page: 0, size: 5, sort: ''};
  stores :Store[] = [];
  totalPages: number = 0;
  loading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storeService: StoreService,
    private translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
      this.loadStores();
  }

  async loadStores(){
    this.loading = true;

    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });

    loader.present();
    this.storeService.getStores(this.pageable).subscribe(payload => {
      this.stores.push(...payload.content);
      loader.dismiss();
      this.totalPages = payload.totalPages;
      this.loading = false;
    }, ()=> {
      loader.dismiss();
      this.loading = false;
    });
  }

  onInput($event){
    this.pageable.page =0;
    this.stores = [];
    this.loadStores();
  }

  onCancel($event){
    this.pageable.page =0;
    this.pageable.search = "";
    this.stores = [];
    this.loadStores();
  }

  getCategoriesLabel(categories:Category[]) {
    let prefix = '';
    let label = '';
    for(let i = 0 ;i < categories.length; i++){
      label += prefix + categories[i].labelAr + ' ' +categories[i].labelFr;
      prefix = ', '
    }
    if(label.length > 30) {
      label = label.slice(0, 30) + '...';
    }
    return label;
  }

  goToStoreDetails(store: Store){
    this.navCtrl.push(CategoryPage, {
      data: store
    });
  }

  logout(){
    this.navCtrl.setRoot(Authentification);
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  doInfinite(infiniteScroll){
    if(this.totalPages == this.pageable.page) {
      // infiniteScroll.enable(false);
      infiniteScroll.complete();
    } else {
      infiniteScroll.enable(true);
      this.pageable.page++;
      this.loadStores();
      infiniteScroll.complete();
    }
  }
}
