import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs';

import { Credentials, User, Token } from '../model/authentification.model';
import { dns, tokenPrefix } from '../app/config';

@Injectable()
export class AuthentificationService {
  private dns = dns + 'users/';
  private jwtHelper: JwtHelper = new JwtHelper();

  activeUser = new BehaviorSubject({});

  constructor(private _http: HttpClient) {}

  public getInvitation(tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + 'invitations', {
      headers
    });
  }
  /**
	 * --------------------------------------------------------------
	 *
	 * POST CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public signin(credentials: Credentials): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.dns + 'signin', credentials, {
      headers
    });
  }

  public signup(user: User): Observable<any> {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this._http.post(this.dns + 'signup', user, {
        headers
      });
  }

  getCurrentUser(tokenHash): User {
    if (tokenHash) {
      const token: Token = this.jwtHelper.decodeToken(tokenHash);
      return token.user;
    }
    return null;
  }

  refreshPrincipal(tokenHash) {
    this.activeUser.next(this.getCurrentUser(tokenHash));
  }

    /**
	 * --------------------------------------------------------------
	 *
	 * PUT CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public updateUserInfo(user: User, tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.put(this.dns + 'update/user-info', user, {headers});
  }

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  // public forgetCredentials(email: string): Observable<any> {
  //   let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   headers = createAcceptLanguageHeader(headers);
  //   return this._http.get(this.dns + 'forgetcredentials/' + email, {
  //      headers
  //   });
  // }





  // public updateUserPassword(payload: PasswordConfirmation): Observable<any> {
  //   return this._http.put(this.dns + 'update/user-password', payload);
  // }
  /**
	 * --------------------------------------------------------------
	 *
	 * DELETE CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  // public deleteDevice(id: number): Observable<any> {
  //   return this._http.delete(environment.dns + 'devices/' + id);
  // }
}
