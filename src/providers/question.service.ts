import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Http, Headers } from "@angular/http";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class QuestionService {
  uri: string = "http://event.livepresentation.net/api/";

  currentIcons$ = new Subject<any>();

  email = null;

  constructor(private _http: Http) {}

  sendCurrentIcons(icon: any) {
    this.currentIcons$.next(icon);
  }

  getCurrentIcons(): Observable<any> {
    return this.currentIcons$.asObservable();
  }

  login(credential) {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .post(this.uri + "login/user", credential ,{
        headers: headers
      });
  }

  register(principal) {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .post(this.uri + "login/registration", principal ,{
        headers: headers
      });
  }

  getConfig() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "dashboard/getDashboard", {
        headers: headers
      })
      .map(res => res.json());
  }

  getPrograms() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "programme/getprogramme", {
        headers: headers
      })
      .map(res => res.json());
  }

  getCommittees() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "committee/getCommittee", {
        headers: headers
      })
      .map(res => res.json());
  }

  getSponsors() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "Sponsor/getSponsor", {
        headers: headers
      })
      .map(res => res.json());
  }

  getWelcomeMessage() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "Welcome/getWelcome", {
        headers: headers
      })
      .map(res => res.json());
  }

  getContacts() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "contact/getContact", {
        headers: headers
      })
      .map(res => res.json());
  }

  getSpeackers() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "Speackers/getSpeackers", {
        headers: headers
      })
      .map(res => res.json());
  }

  getSections() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "section/getSection", {
        headers: headers
      })
      .map(res => res.json());
  }

  addQuestion(request){
    let headers = new Headers({ Accept: "application/json" });
    request.email = this.email;
    return this._http
      .post(this.uri + "Question/addQuestion", request ,{
        headers: headers
      })
  }

  getTopics() {
    let headers = new Headers({ Accept: "application/json" });
    return this._http
      .get(this.uri + "/listQuestions.php", {
        headers: headers
      })
      .map(res => res.json());
  }

}
