import { NavParams, ViewController, LoadingController, ToastController, AlertController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { AssignmentPayload, Action, ProductDetails } from "../../model/product.model";
import { BasketService } from "../../providers/basket.service";
import { Geolocation } from '@ionic-native/geolocation';
import { BasketPage } from "../basket/basket";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'product-modal',
    templateUrl: "product-modal.html"
  })
  export class ProductModal {
  
   product:ProductDetails = {};
   assignmentPayload:AssignmentPayload = {quantity: 1};
   showSubmit:boolean = true;
   useCurrentPosition:boolean = true;
   productsCost: number;
   deliveryCost: number;

   constructor(private basketService:BasketService, params: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,     public navCtrl: NavController,
    private geolocation: Geolocation, private alertCtrl: AlertController,
    private translate: TranslateService) {
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

  async assignCommit() {

    const pleaseWaitLabel:any = await this.translate.get('please_wait');
    const actionDoneLabel:any = await this.translate.get('basket.action_success');
    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });

    loader.present();
    this.basketService.assign(this.assignmentPayload).subscribe(()=> {
      loader.dismiss();

      
      const toast = this.toastCtrl.create({
        message: actionDoneLabel.value,
        duration: 3000
      });
      toast.present();
      this.viewCtrl.dismiss({loadData: true});
      }, (err)=> {
        loader.dismiss();
        this.viewCtrl.dismiss({loadData: false});
        throw err;
      });
  }

  currentBasket(){
    this.navCtrl.push(BasketPage);
  }
}
