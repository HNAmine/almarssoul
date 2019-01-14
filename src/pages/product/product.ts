import { BasketPage } from './../basket/basket';
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController, ModalController } from "ionic-angular";
import { Product, Action, ProductDetails } from "../../model/product.model";
import { Store } from '../../model/store.model';
import { Category } from '../../model/category.model';
import { Storage } from '@ionic/storage';
import { tokenIndex } from '../../app/config';
import { ProductService } from '../../providers/product.service';
import { ProductModal } from './product-modal';

@Component({
  selector: "product",
  templateUrl: "product.html"
})
export class ProductPage {

  store: Store = null;

  category: Category = null;

  products:Product[] = [];

  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });

  pageable = {search: '', page: 0, size: 10, sort: ''};

  totalPages: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    public modalCtrl: ModalController,
    private productService: ProductService
  ) {
    this.store = navParams.get("store");
    this.category = navParams.get("category");
  }

  ionViewDidLoad() {
      this.loadProductsOfCategory();
  }

  loadProductsOfCategory(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
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
    p.productLabel = product.label;
    p.productDescription = product.description; 
    p.productId = product.id;
    p.productCost = product.cost;
    let profileModal = this.modalCtrl.create(ProductModal, { mode: Action.ADD, product : p, showSubmit: true });
    profileModal.present()
  }
}
