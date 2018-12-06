import { QuestionService } from './../../providers/question.service';
import { Program, ProgramItem } from "./../../model/program.model";
import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "program",
  templateUrl: "program.html"
})
export class ProgramPage {
  programs: Program[] = [];

  currentProgram: Program = null;
  currentDayIndex: number = null;
  loader = this.loadingCtrl.create({
    content: "Please wait..."
  });
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController,public questionService: QuestionService) {
      this.presentLoading();
      this.questionService.getPrograms().subscribe(
        programs => {
          this.programs = programs;
          this.dismissLoading();
        },
        err => {
          this.dismissLoading();
        }
      );
  }

  presentLoading() {
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismiss();
  }

  onSelect(program: Program) {
    this.currentProgram = program;
    if (this.currentProgram.days && this.currentProgram.days.length > 0) {
      this.currentDayIndex = 1;
    }
  }

  onCancel() {
    this.currentProgram = null;
    this.currentDayIndex = null;
  }
  onBack() {
    if (this.currentDayIndex === 1) {
      this.currentDayIndex = this.currentProgram.days.length;
    } else {
      this.currentDayIndex--;
    }
  }

  onNext() {
    if (this.currentDayIndex === this.currentProgram.days.length) {
      this.currentDayIndex = 1;
    } else {
      this.currentDayIndex++;
    }
  }

  onNavigate(url: string) {
    window.open(url, "_blank");
  }
}
