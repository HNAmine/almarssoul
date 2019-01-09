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
import { Storage } from '@ionic/storage';
import { tokenIndex } from '../../app/config';
import { BasketService } from '../../providers/basket.service';
import { BasketDetails } from '../../model/product.model';

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

  token = null;
  baskets:BasketDetails[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private basketService:BasketService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.storage.get(tokenIndex).then((token) => {
      this.token = token;
      this.loadOrders();
    });
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadOrders() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.getOrders(this.token).subscribe((baskets:BasketDetails[])=> {
        this.baskets = baskets;
        loader.dismiss();
    }, () => {
        loader.dismiss();
    })
  }

  goToProductsDetails(basket:BasketDetails){
    let orderModal = this.modalCtrl.create(OrderModal, { basket });
    orderModal.present()
  }

  addNote(basket : BasketDetails){

    let alert = this.alertCtrl.create();

    alert.setTitle('Note');

    alert.addInput({
      type: 'radio',
      label: 'VERY GOOD',
      value: '5',
      checked: basket.ownerRate === 5
    });

    alert.addInput({
      type: 'radio',
      label: 'GOOD',
      value: '4',
      checked: basket.ownerRate === 4
    });

    alert.addInput({
      type: 'radio',
      label: 'MOYEN',
      value: '3',
      checked: basket.ownerRate === 3
    });

    alert.addInput({
      type: 'radio',
      label: 'NOT BAD',
      value: '2',
      checked: basket.ownerRate === 2
    });

    alert.addInput({
      type: 'radio',
      label: 'BAD',
      value: '1',
      checked: basket.ownerRate === 1
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Submit',
      handler: data => {
        let loader = this.loadingCtrl.create({
          content: "Please wait..."
        });
        loader.present();
        this.basketService.addNote(basket.id, data, this.token).subscribe(succes => {
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