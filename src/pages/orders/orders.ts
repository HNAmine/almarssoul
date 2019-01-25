import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  AlertController,
  ToastController,
  LoadingController,
  ModalController,
  ViewController
} from "ionic-angular";
import { BasketService } from '../../providers/basket.service';
import { BasketDetails } from '../../model/product.model';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-orders",
  templateUrl: "orders.html"
})
export class OrdersPage {

  baskets:BasketDetails[] = [];
  loading = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private basketService:BasketService,
    public modalCtrl: ModalController,
    private launchNavigator: LaunchNavigator,
    private translate: TranslateService
  ) {
  }

  ionViewDidLoad() {
      this.loadOrders();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadOrders() {
    this.loading = true;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.getOrders().subscribe((baskets:BasketDetails[])=> {
        this.baskets = baskets;
        loader.dismiss();
        this.loading = false;
    }, () => {
        loader.dismiss();
        this.loading = false;
    })
  }

  goToProductsDetails(basket:BasketDetails){
    let orderModal = this.modalCtrl.create(OrderModal, { basket });
    orderModal.present()
  }

  showInMap(basket: BasketDetails){
    let options: LaunchNavigatorOptions = {
      // app: LaunchNavigator.APPS.USER_SELECT
    };

    this.launchNavigator.navigate([basket.lat, basket.lng], options).then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
    );
  }

  async addNote(basket : BasketDetails){
    let alert = this.alertCtrl.create();

    const noteLabel:any = await this.translate.get('fields.note');

    alert.setTitle(noteLabel.value);

    const veryGoodLabel:any = await this.translate.get('fields.very_good');
    const goodLabel:any = await this.translate.get('fields.good');
    const moyenLabel:any = await this.translate.get('fields.moyen');
    const notBadLabel:any = await this.translate.get('fields.not_bad');
    const badLabel:any = await this.translate.get('fields.bad');

    alert.addInput({
      type: 'radio',
      label: veryGoodLabel.value,
      value: '5',
      checked: basket.ownerRate === 5
    });
    alert.addInput({
      type: 'radio',
      label: goodLabel.value,
      value: '4',
      checked: basket.ownerRate === 4
    });
    alert.addInput({
      type: 'radio',
      label: moyenLabel.value,
      value: '3',
      checked: basket.ownerRate === 3
    });
    alert.addInput({
      type: 'radio',
      label: notBadLabel.value,
      value: '2',
      checked: basket.ownerRate === 2
    });
    alert.addInput({
      type: 'radio',
      label: badLabel.value,
      value: '1',
      checked: basket.ownerRate === 1
    });

    const cancelLabel:any = await this.translate.get('fields.cancel');
    const submitLabel:any = await this.translate.get('fields.submit');
    alert.addButton(cancelLabel.value);
    
    alert.addButton({
      text: submitLabel.value,
      handler: data => {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.basketService.addNote(basket.id, data).subscribe(succes => {
          loader.dismiss();
          basket.ownerRate = data;
        }, (err)=> {
          loader.dismiss();
          throw err;
        })
      }
    });
    alert.present();
  }
}

@Component({
  selector: 'order-modal',
  templateUrl: "order-modal.html"
})
export class OrderModal {
  basket:BasketDetails = {};
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams, params: NavParams
  ) {
    this.basket = params.get('basket');
  }

  dismiss() {
    this.viewCtrl.dismiss({loadData: false});
  }

}