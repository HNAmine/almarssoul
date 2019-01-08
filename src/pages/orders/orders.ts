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
import { AssignmentGlobal } from '../../model/product.model';

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
  assignmentGlobals:AssignmentGlobal[] = [];

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
      this.loadCommandes();
    });
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  loadCommandes() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.getCommandes(this.token).subscribe((assignmentGlobals:AssignmentGlobal[])=> {
        this.assignmentGlobals = assignmentGlobals;
        loader.dismiss();
    }, () => {
        loader.dismiss();
    })
  }

  goToProductsDetails(assignmentGlobal:AssignmentGlobal){
    let orderModal = this.modalCtrl.create(OrderModal, { assignment: assignmentGlobal });
    orderModal.present()
  }

  addNote(){

    let alert = this.alertCtrl.create();

    alert.setTitle('Note');

    alert.addInput({
      type: 'radio',
      label: 'VERY GOOD',
      value: '5',
      checked: true
    });

    alert.addInput({
      type: 'radio',
      label: 'GOOD',
      value: '4'
    });

    alert.addInput({
      type: 'radio',
      label: 'MOYEN',
      value: '3'
    });

    alert.addInput({
      type: 'radio',
      label: 'NOT BAD',
      value: '2'
    });

    alert.addInput({
      type: 'radio',
      label: 'BAD',
      value: '1'
    });
    alert.addButton('Cancel');
    alert.addButton({
      text: 'Submit',
      handler: data => {
        console.log('Checkbox data:', data);
      }
    });
    // let alert = this.alertCtrl.create({
    //   title: 'Note',
    //   inputs: [
    //     {
    //       name: 'comment',
    //       placeholder: 'Please Leave a comment'
    //     },
    //     {
    //       name: 'password',
    //       placeholder: 'Password',
    //       type: 'radio'
    //     }
    //   ],
    //   buttons: ['Dismiss']
    // });
    alert.present();
  }
}

@Component({
  selector: 'order-modal',
  templateUrl: "order-modal.html"
})
export class OrderModal {
  assignmentGlobal:AssignmentGlobal = {};
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams, params: NavParams
  ) {
    this.assignmentGlobal = params.get('assignment');
  }

  dismiss() {
    this.viewCtrl.dismiss({loadData: false});
  }

}