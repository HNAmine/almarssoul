import { Component } from '@angular/core';
import { BasketService } from '../../providers/basket.service';
import { tokenIndex } from '../../app/config';
import { Storage } from '@ionic/storage';
import { LoadingController, ToastController, ModalController } from 'ionic-angular';
import { AssignmentGlobal, AssignmentPayload, Action, Assignment } from '../../model/product.model';
import { ProductModal } from '../../pages/product/product-modal';

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

  token = null;
  assignmentGlobal: AssignmentGlobal = {totalCost: 0, assignments : []};
  assignmentPayload:AssignmentPayload = {quantity: 1};

  constructor(private basketService:BasketService, private storage: Storage,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController) {
    this.storage.get(tokenIndex).then((token) => {
      this.token = token;
      this.loadCurrentBasket();
    });
  }

  loadCurrentBasket(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.getCurrentBasket(this.token).subscribe(assignmentGlobal => {
      this.assignmentGlobal = assignmentGlobal;
      loader.dismiss();
    }, ()=> {
      loader.dismiss();
    });
  }

  deleteProduct(assignment: Assignment){
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.DELETE, product: assignment.product , quantity : assignment.quantity , showSubmit: this.assignmentGlobal.assignments && this.assignmentGlobal.assignments.length - 1 > 0});
    profileModal.present();
    profileModal.onDidDismiss(data => {
      this.loadCurrentBasket();
    });
  }

  updateProduct(assignment: Assignment) {
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.UPDATE, product: assignment.product, quantity : assignment.quantity , showSubmit: true });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(data.loadData){
        this.loadCurrentBasket();
      }
    });
  }

  submitProducts(){
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.SUBMIT, showSubmit: true });
    profileModal.present();
    profileModal.onDidDismiss(data => {
      if(data.loadData){
        this.loadCurrentBasket();
      }
    });
  }

}
