import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Report } from '../interface/report';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReportService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  assignReport(reportId, regionId) :Observable<any> {
    return this.http.put(this.baseUrl + "/reports/" + reportId + "?regionId=" + regionId, {});
  }

  getAllRegions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + "/regions");
  }

  /**
   * Avoir les signalements pas encore attribué à une région
   */
  getNonAssignedReport(): Observable<Report[]> {
    return this.http.get<Report[]>(this.baseUrl + "/reports?region=null&page=0");
  }

  /**
   * Avoir le photo d'un signalement de problème
   * @param idReport ID du signalement
   * @returns Photo du signalement
   */
  getImage(idReport: string): Observable<Blob> {
    return this.http.get(this.baseUrl + "/reports/" + idReport + "/photo", { responseType: 'blob' });
  }
}
