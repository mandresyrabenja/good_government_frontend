import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Intercepteur de requete HTTP pour ajouter le token actuel
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
      // Token actuel
      const token : string = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJjaXRpemVuOnJlYWQifSx7ImF1dGhvcml0eSI6IlJPTEVfR09WRVJOTUVOVCJ9LHsiYXV0aG9yaXR5IjoiY2l0aXplbjpkZWxldGUifSx7ImF1dGhvcml0eSI6Im5vdGlmaWNhdGlvbjpjcmVhdGUifSx7ImF1dGhvcml0eSI6InJlZ2lvbjp1cGRhdGUifSx7ImF1dGhvcml0eSI6InJlcG9ydDpkZWxldGUifSx7ImF1dGhvcml0eSI6InJlZ2lvbjpyZWFkIn0seyJhdXRob3JpdHkiOiJyZWdpb246Y3JlYXRlIn0seyJhdXRob3JpdHkiOiJyZWdpb246ZGVsZXRlIn0seyJhdXRob3JpdHkiOiJyZXBvcnQ6cmVhZCJ9LHsiYXV0aG9yaXR5IjoicmVwb3J0OnVwZGF0ZSJ9XSwiaWF0IjoxNjQyMjY0NzUyLCJleHAiOjE2NDM0MDM2MDB9.p2MVcuYexMuvOuvND5ado3A3WZ_imW_7dVRzVNJMrF9KcITYF4Pb538Lc7b5aAO-Uxm9ZJo3qpv54lB5_5XBrA';

      // Ajout de l'entête http Authorization contenant le token actuel
      const cloned = req.clone(
        { headers: req.headers.set('Authorization', token) }
      );

      return next.handle(cloned);
    }
}
