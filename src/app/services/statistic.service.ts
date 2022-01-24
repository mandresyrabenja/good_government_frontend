import { MonthlyReport } from './../interface/monthly-report';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service http d'accèss à l'API des statistiques
 */
@Injectable()
export class StatisticService {

  constructor(private httpService : HttpService) {}

  /**
   * Avoir le nombre des signalement par régions mensuelle de l'année dernière
   */
  getLastYearMonthlyReportsNumber(): Observable<MonthlyReport[]> {
    return this.httpService.http.get<MonthlyReport[]>( this.httpService.baseUrl + '/reports/last-year-monthly-report-nb' );
  }

}
