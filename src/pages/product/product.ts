import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { Product, Action, ProductDetails } from "../../model/product.model";
import { Store } from '../../model/store.model';
import { Category } from '../../model/category.model';
import { ProductService } from '../../providers/product.service';
import { ProductModal } from './product-modal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "product",
  templateUrl: "product.html"
})
export class ProductPage {

  store: Store = null;

  category: Category = null;

  products:Product[] = [];

  pageable = {search: '', page: 0, size: 10, sort: ''};

  totalPages: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private productService: ProductService,
    private translate: TranslateService
  ) {
    this.store = navParams.get("store");
    this.category = navParams.get("category");
  }

  ionViewDidLoad() {
      this.loadProductsOfCategory();
  }

  async loadProductsOfCategory(){

    const pleaseWaitLabel:any = await this.translate.get('please_wait');

    let loader = this.loadingCtrl.create({
      content: pleaseWaitLabel.value
    });

    loader.present();
    this.productService.getProductsByCategory(this.category.id, this.pageable).subscribe(payload => {
      this.products.push(...payload.content);
      loader.dismiss();
      this.totalPages = payload.totalPages;
    }, ()=> {
      loader.dismiss();
    });
  }

  doInfinite(infiniteScroll){
    if(this.totalPages == this.pageable.page) {
      infiniteScroll.enable(false);
    } else {
      infiniteScroll.enable(true);
      this.pageable.page++;
      this.loadProductsOfCategory();
      infiniteScroll.complete();
    }
  }

  onInput($event){
    this.pageable.page =0;
    this.products = [];
    this.loadProductsOfCategory();
  }

  onCancel($event){
    this.pageable.page =0;
    this.pageable.search = "";
    this.products = [];
    this.loadProductsOfCategory();
  }

  goToBasketPage(){
    this.navCtrl.push(BasketPage);
  }

  openProductModal(product: Product){
    const p = new ProductDetails();
    p.productLabelAr = product.labelAr;
    p.productLabelFr = product.labelFr;
    p.productDescriptionAr = product.descriptionAr; 
    p.productDescriptionFr = product.descriptionFr; 
    p.productId = product.id;
    p.productCost = product.cost;
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.ADD, product : p, showSubmit: true });
    profileModal.present()
  }
}
