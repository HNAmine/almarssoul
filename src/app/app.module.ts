import { ProfilPage } from './../pages/profil/profil';
import { BasketPage } from './../pages/basket/basket';
import { OrdersPage } from './../pages/orders/orders';
import { ProductPage, ProductModal } from './../pages/product/product';
import { GooglePlus} from '@ionic-native/google-plus';
import { Authentification } from './../pages/authentification/authentification';
import { UserSignup } from "./../pages/user-signup/user-signup";
import { Home } from "./../pages/home/home";
import { QuestionService } from "./../providers/question.service";
import { Dashboard } from "./../pages/dashboard/dashboard";
import { UserLogin } from "./../pages/user-login/user-login";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    OrdersPage,
    Home,
    ProductPage,
    Authentification,
    BasketPage,
    ProfilPage,
    ProductModal
  ],
  imports: [BrowserModule, HttpModule, FormsModule,IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    OrdersPage,
    Home,
    Authentification,
    ProductPage,
    BasketPage,
    ProfilPage,
    ProductModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    QuestionService,
    GooglePlus
  ]
})
export class AppModule {}
