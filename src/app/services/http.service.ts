import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable()
export class HttpService {

  public baseUrl = 'http://localhost:8080/api/v1'

  constructor(public http : HttpClient){}

  testGet() {
    return this.http.get<any[]>(this.baseUrl + '/reports/last-year-monthly-report-nb');
  }
}
