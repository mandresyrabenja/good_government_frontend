import { HttpService } from './http.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';

describe(`AuthInterceptor`, () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    service = TestBed.get(HttpService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should add an Authorization header', () => {
    service.testGet().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const httpRequest = httpMock.expectOne(service.baseUrl + '/reports/last-year-monthly-report-nb');

    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);

    expect(httpRequest.request.headers.get('Authorization')).toBe(
      'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJjaXRpemVuOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfR09WRVJOTUVOVCJ9LHsiYXV0aG9yaXR5IjoiY2l0aXplbjpkZWxldGUifSx7ImF1dGhvcml0eSI6Im5vdGlmaWNhdGlvbjpjcmVhdGUifSx7ImF1dGhvcml0eSI6InJlZ2lvbjp1cGRhdGUifSx7ImF1dGhvcml0eSI6InJlcG9ydDpkZWxldGUifSx7ImF1dGhvcml0eSI6InJlZ2lvbjpyZWFkIn0seyJhdXRob3JpdHkiOiJyZWdpb246Y3JlYXRlIn0seyJhdXRob3JpdHkiOiJyZWdpb246ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJyZXBvcnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoicmVwb3J0OnVwZGF0ZSJ9XSwiaWF0IjoxNjQyMjY0NzUyLCJleHAiOjE2NDM0MDM2MDB9.p2MVcuYexMuvOuvND5ado3A3WZ_imW_7dVRzVNJMrF9KcITYF4Pb538Lc7b5aAO-Uxm9ZJo3qpv54lB5_5XBrA',
    );
  });

});
