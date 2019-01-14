import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { Observable, BehaviorSubject } from 'rxjs';

import { Credentials, User, Token, Role } from '../model/authentification.model';
import { dns, tokenPrefix } from '../app/config';

@Injectable()
export class AuthentificationService {
  private dns = dns + 'users/';
  private jwtHelper: JwtHelper = new JwtHelper();
  token = null;

  activeUser = new BehaviorSubject({});

  constructor(private _http: HttpClient) {}

  public getInvitation(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.token);
    return this._http.get(this.dns + 'invitations', {
      headers
    });
  }

  public invite(phone): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.token);
    return this._http.get(this.dns + 'invite/' + phone, {
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

  public acceptInvitation(invited: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this._http.post(this.dns + 'accept-invitation', invited, {
      headers
    });}

  getCurrentUser(): User {
    if (this.token) {
      const token: Token = this.jwtHelper.decodeToken(this.token);
      return token.user;
    }
    return null;
  }

  isClient() {
    let user = this.getCurrentUser();
    return user && user.roles && this.haveRole(user.roles, Role.ROLE_CLIENT);
  }

  haveRole(roles: Role[], role:Role){
    let value = false;
    roles.forEach(r => {
      if(r === role) {
        value = true;
      }
    });
    return value;
  }

  refreshPrincipal() {
    this.activeUser.next(this.getCurrentUser());
  }

    /**
	 * --------------------------------------------------------------
	 *
	 * PUT CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public updateUserInfo(user: User): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.token);
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
