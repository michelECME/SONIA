import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRopa } from 'app/shared/model/ropa.model';

type EntityResponseType = HttpResponse<IRopa>;
type EntityArrayResponseType = HttpResponse<IRopa[]>;

@Injectable({ providedIn: 'root' })
export class RopaService {
  public resourceUrl = SERVER_API_URL + 'api/ropas';

  constructor(protected http: HttpClient) {}

  create(ropa: IRopa): Observable<EntityResponseType> {
    return this.http.post<IRopa>(this.resourceUrl, ropa, { observe: 'response' });
  }

  update(ropa: IRopa): Observable<EntityResponseType> {
    return this.http.put<IRopa>(this.resourceUrl, ropa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRopa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRopa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
