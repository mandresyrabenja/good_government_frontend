import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Region } from '../interface/region';

@Injectable()
export class RegionService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/regions");
  }

  createRegion(region: Region) : Observable<any>  {
    return this.http.post(this.baseUrl + "/regions", region);
  }

}
