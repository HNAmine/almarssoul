import { GooglePlus} from '@ionic-native/google-plus';
import { Authentification } from './../pages/authentification/authentification';
import { SponsorPage } from './../pages/sponsor/sponsor';
import { ProgramPage } from "./../pages/program/program";
import { ContactPage } from "./../pages/contact/contact";
import { WelcomePage } from "./../pages/welcome/welcome";
import { CommitteePage } from "./../pages/committee/committee";
import { SpeakerPage } from "./../pages/speaker/speaker";
import { UserSignup } from "./../pages/user-signup/user-signup";
import { Home } from "./../pages/home/home";
import { ListQuestions } from "./../pages/list-questions/list-questions";
import { QuestionService } from "./../providers/question.service";
import { AddQuestions } from "./../pages/add-questions/add-questions";
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
import { DetailQuestion } from "../pages/detail-question/detail-question";

@NgModule({
  declarations: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    AddQuestions,
    ListQuestions,
    DetailQuestion,
    Home,
    SpeakerPage,
    CommitteePage,
    WelcomePage,
    ContactPage,
    ProgramPage,
    SponsorPage,
    Authentification,
  ],
  imports: [BrowserModule, HttpModule, FormsModule,IonicModule.forRoot(MyApp)],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    UserLogin,
    UserSignup,
    Dashboard,
    AddQuestions,
    ListQuestions,
    DetailQuestion,
    Home,
    SpeakerPage,
    CommitteePage,
    WelcomePage,
    ContactPage,
    ProgramPage,
    SponsorPage,
    Authentification
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
