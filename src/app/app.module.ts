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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from '../providers/store.service';
import { CategoryPage } from '../pages/category/category';
import { ProductService } from '../providers/product.service';
import { ProductsListComponent } from '../components/products-list/products-list';
import { BasketService } from '../providers/basket.service';
import { ProductModal } from '../pages/product/product-modal';
import { InvitationPage } from '../pages/invitation/invitation';
import { SMS } from '@ionic-native/sms';
import { UserInvited } from '../pages/user-invited/user-invited';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { NotificationPage } from '../pages/notification/notification';
import { NotificationService } from '../providers/notification.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LangManagerComponent } from '../components/lang-manager/lang-manager';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    OrderModal,
    InvitationPage,
    UserInvited,
    NotificationPage,
    LangManagerComponent
  ],
  imports: [BrowserModule, HttpClientModule,FormsModule,IonicModule.forRoot(MyApp),TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
    }
  }),
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
    OrderModal,
    InvitationPage,
    UserInvited,
    NotificationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    AuthentificationService,
    StoreService,
    BasketService,
    SMS,
    Geolocation,
    ProductService,
    SocialSharing,
    LaunchNavigator,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    },
    LocationAccuracy,
    NotificationService
  ]
})
export class AppModule {}
