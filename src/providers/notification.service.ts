import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class NotificationService {
  private dns = dns + 'notifications/';


  constructor(private _http: HttpClient, private authentificationService: AuthentificationService) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getNotifications(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.get(this.dns + 'list', {
      headers
    });
  }

  /**
	 * --------------------------------------------------------------
	 *
	 * PUT CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public readNotification(notificationId): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.put(this.dns + 'read/' + notificationId, null, {headers});
  }
}
