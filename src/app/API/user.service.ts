import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractApiService } from '@core/interceptors/jsonrpc';


@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractApiService<any> {

  constructor(
    http: HttpClient
  ) {
    super(http, '');
  }


  get_user(endpoint?: string): Promise<any> {
    return this.get(
      endpoint ? endpoint : '/api/users'
    );
  }



}
