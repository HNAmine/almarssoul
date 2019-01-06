import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';
import { Pageable } from '../model/shared.model';

@Injectable()
export class ProductService {
  private dns = dns + 'products/';


  constructor(private _http: HttpClient) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * POST CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getProductsByCategory(id:number, pageable : Pageable, tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + id+ '?page=' + pageable.page + '&size=' + pageable.size+ '&search=' + pageable.search, {
      headers
    });
  }

}
