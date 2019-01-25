import { Component } from '@angular/core';
import { BasketService } from '../../providers/basket.service';
import { LoadingController, ToastController, ModalController } from 'ionic-angular';
import { AssignmentPayload, Action, BasketDetails, ProductDetails } from '../../model/product.model';
import { ProductModal } from '../../pages/product/product-modal';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the ProductsListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'products-list',
  templateUrl: 'products-list.html'
})
export class ProductsListComponent {

  basket: BasketDetails = {};
  assignmentPayload:AssignmentPayload = {quantity: 1};

  constructor(private basketService:BasketService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController,
    private translate: TranslateService) {
      this.loadCurrentBasket();
  }

  async loadCurrentBasket(){

    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });
    loader.present();
    this.basketService.getCurrentBasket().subscribe(basket => {
      this.basket = basket;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    });
  }

  deleteProduct(product: ProductDetails){
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.DELETE, product , showSubmit: this.basket.products && this.basket.products.length - 1 > 0});
    profileModal.present();
    profileModal.onDidDismiss(data => {
      this.loadCurrentBasket();
    });
  }

  updateProduct(product: ProductDetails) {
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.UPDATE, product , showSubmit: true });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(data.loadData){
        this.loadCurrentBasket();
      }
    });
  }

  submitProducts(){
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.SUBMIT, showSubmit: true, productsCost: this.basket.totalCost , deliveryCost: this.basket.deliveryCost });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(data.loadData){
        this.loadCurrentBasket();
      }
    });
  }

}
