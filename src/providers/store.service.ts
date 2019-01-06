import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';
import { Pageable } from '../model/shared.model';

@Injectable()
export class StoreService {
  private dns = dns + 'stores/';


  constructor(private _http: HttpClient) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * POST CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getStores(pageable : Pageable, tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + '?search=' + pageable.search + '&page=' + pageable.page + '&size=' + pageable.size, {
      headers
    });
  }

}
