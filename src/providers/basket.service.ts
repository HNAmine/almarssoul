import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';
import { AssignmentPayload } from '../model/product.model';

@Injectable()
export class BasketService {
  private dns = dns + 'baskets/';


  constructor(private _http: HttpClient) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getCurrentBasket(tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + 'current-basket', {
      headers
    });
  }

  public getCommandes(tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + 'commandes', {
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
  public assign(assignmentPayload: AssignmentPayload, tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.post(this.dns + 'assign', assignmentPayload, {headers});
  }

}
