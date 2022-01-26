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
      const token = localStorage.getItem("token");

      if (token) {
          // Ajout du token dans l'entête
          const cloned = req.clone({
              headers: req.headers.set("Authorization", token)
          });

          return next.handle(cloned);
      }
      else {
          return next.handle(req);
      }
    }
}
