import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MonthlyReport } from './../interface/monthly-report';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Service http d'accèss à l'API des statistiques
 */
@Injectable()
export class StatisticService {
  private baseUrl = environment.baseUrl;

  constructor(private http : HttpClient) {}

  /**
   * Avoir le nombre des signalement par régions mensuelle de l'année dernière
   */
   getLastYearMonthlyReportsNumber(): Observable<MonthlyReport[]> {
    return this.http.get<MonthlyReport[]>( this.baseUrl + '/monthlyreports/last-year' );
  }

  /**
   * Avoir le top 5 des mots clés les plus fréquents
   */
   getTop5MostRepetitiveKeywords(): Observable<any> {
    return this.http.get<any>( this.baseUrl + '/reports/most-repetitive-keywords' );
  }

  /**
   * Avoir le top 6 des régions qui ont les plus des signalements
   */
   getTop6RegionWithMostReport(): Observable<any> {
    return this.http.get<any>( this.baseUrl + '/reports/top6-region-with-most-report' );
  }
}
