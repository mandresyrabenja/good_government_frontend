import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Region } from '../interface/region';

@Injectable()
export class RegionService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPageNumber() : Observable<any> {
    return this.http.get(this.baseUrl + "/regions/page_nb");
  }

  deleteRegion(id) : Observable<any> {
    return this.http.delete(this.baseUrl + "/regions/" + id);
  }

  modifyRegion(id: any, region_name: string) : Observable<any> {
    return this.http.put(this.baseUrl + "/regions/" + id, {}, { params: {"name" : region_name} });
  }

  getAllRegions(pageNumber: number): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/regions?page=" + pageNumber);
  }

  createRegion(region: Region) : Observable<any>  {
    return this.http.post(this.baseUrl + "/regions", region);
  }

}
