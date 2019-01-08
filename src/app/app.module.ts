import { ProfilPage } from './../pages/profil/profil';
import { BasketPage } from './../pages/basket/basket';
import { OrdersPage, OrderModal } from './../pages/orders/orders';
import { ProductPage } from './../pages/product/product';
import { GooglePlus} from '@ionic-native/google-plus';
import { Authentification } from './../pages/authentification/authentification';
import { UserSignup } from "./../pages/user-signup/user-signup";
import { Home } from "./../pages/home/home";
import { Dashboard } from "./../pages/dashboard/dashboard";
import { UserLogin } from "./../pages/user-login/user-login";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FormsModule } from "@angular/forms";
import { AuthentificationService } from '../providers/authentification.service';
import { ErrorsHandler } from './errors.handler';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from '../providers/store.service';
import { CategoryPage } from '../pages/category/category';
import { ProductService } from '../providers/product.service';
import { ProductsListComponent } from '../components/products-list/products-list';
import { BasketService } from '../providers/basket.service';
import { ProductModal } from '../pages/product/product-modal';

@NgModule({
  declarations: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    OrdersPage,
    Home,
    CategoryPage,
    ProductPage,
    Authentification,
    BasketPage,
    ProfilPage,
    ProductModal,
    ProductsListComponent,
    OrderModal
  ],
  imports: [BrowserModule, HttpClientModule,FormsModule,IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    OrdersPage,
    Home,
    Authentification,
    CategoryPage,
    ProductPage,
    BasketPage,
    ProfilPage,
    ProductModal,
    OrderModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    AuthentificationService,
    StoreService,
    BasketService,
    ProductService,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class AppModule {}
