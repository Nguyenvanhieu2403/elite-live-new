import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ResponseResult } from 'src/app/untils/response-result';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  serviceUri: any;
  _http: HttpClient;

  constructor(http: HttpClient, injector: Injector) {
    this.serviceUri =  `${environment.EnpointUrl}/Authenticate`;
    this._http = http;

  }

  login(model: any) {
    const apiUrl = `${this.serviceUri}/login`;
    return this._http.post<ResponseResult>(apiUrl, model)
      .pipe(
        catchError((error: any) => {
          throw error;
        })
      );
  }

}
