import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { UserSignup } from "../user-signup/user-signup";
import { QuestionService } from "./../../providers/question.service";
import { Home } from "./../home/home";

@Component({
  selector: "page-user-login",
  templateUrl: "user-login.html"
})
export class UserLogin {
  credential: any = {};
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private questionService: QuestionService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad UserLogin");
  }

  homePage() {
    this.navCtrl.push(Home);
  }
  signupPage() {
    this.navCtrl.push(UserSignup);
  }

  signin() {
    this.presentLoading();

    this.homePage();

    this.dismissLoading();
    // this.questionService.login(this.credential).subscribe(
    //   res => {
    //     const toast = this.toastCtrl.create({
    //       message: "Welcome",
    //       duration: 3000
    //     });
    //     toast.present();
    //     this.questionService.email = this.credential.email;
    //     this.homePage();
    //     this.dismissLoading();
    //   },
    //   err => {
    //     if (err.status == 300) {
    //       const toast = this.toastCtrl.create({
    //         message: "Login or Password not valid",
    //         duration: 3000
    //       });
    //       toast.present();
    //     }

    //     this.dismissLoading();
    //   }
    // );
  }


  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }
}
