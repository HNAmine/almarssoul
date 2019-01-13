import { NavParams, ViewController, LoadingController, ToastController, AlertController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { AssignmentPayload, Action, ProductDetails } from "../../model/product.model";
import { BasketService } from "../../providers/basket.service";
import { Storage } from '@ionic/storage';
import { tokenIndex } from "../../app/config";
import { Geolocation } from '@ionic-native/geolocation';
import { BasketPage } from "../basket/basket";

@Component({
    selector: 'product-modal',
    templateUrl: "product-modal.html"
  })
  export class ProductModal {
  
   product:ProductDetails = {};
   assignmentPayload:AssignmentPayload = {quantity: 1};
   token = null;
   showSubmit:boolean = true;
   useCurrentPosition:boolean = true;
   productsCost: number;
   deliveryCost: number;

   constructor(private basketService:BasketService, params: NavParams, private storage: Storage, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,     public navCtrl: NavController,
    private geolocation: Geolocation, private alertCtrl: AlertController) {
        this.product = params.get('product');
        this.assignmentPayload.action = params.get('mode');
        if(this.assignmentPayload.action !== Action.SUBMIT){
          this.assignmentPayload.idProduct = this.product.productId;
        }
        if(this.assignmentPayload.action === Action.UPDATE || this.assignmentPayload.action === Action.DELETE){
          this.assignmentPayload.quantity = this.product.quantity;
        }

        if(this.assignmentPayload.action === Action.SUBMIT){
          this.productsCost = params.get('productsCost');
          this.deliveryCost = params.get('deliveryCost');
        }

        this.showSubmit = params.get('showSubmit');
   }

   increment(){
     if(this.assignmentPayload.quantity < 1000) {
     this.assignmentPayload.quantity++;
     }
   }

   decrement() {
     if(this.assignmentPayload.quantity > 1) {
      this.assignmentPayload.quantity--;
    }
  }

  dismiss() {
    this.viewCtrl.dismiss({loadData: false});
  }

  action() {
    this.assignmentPayload.submit = false;
    this.assignCommit();
  }

  actionAndSubmit() {
    this.assignmentPayload.submit = true;
    this.assign();
  }

  submit() {
    this.assignmentPayload.submit = true;
    this.assignmentPayload.idProduct = null;
    this.assignmentPayload.quantity = null;
    this.assign();
  }

  assign(){
      this.geolocation.getCurrentPosition().then((position) => {
        this.assignmentPayload.address = {lat : position.coords.latitude , lng: position.coords.longitude};
        this.assignCommit();
       }).catch((err) => {
         let alert = this.alertCtrl.create({
          title: 'GPS not acitavted',
          subTitle: 'please activate GPS',
          buttons: ['Dismiss']
        });
        alert.present();
       });
  }

  assignCommit() {

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present();

    this.storage.get(tokenIndex).then((token) => {
    this.token = token;
    this.basketService.assign(this.assignmentPayload, this.token).subscribe(()=> {
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: 'Action was done successfully',
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss({loadData: true});
      }, (err)=> {
        loader.dismiss();
        this.viewCtrl.dismiss({loadData: false});
        throw err;
      });
    });
  }

  currentBasket(){
    this.navCtrl.push(BasketPage);
  }
}
