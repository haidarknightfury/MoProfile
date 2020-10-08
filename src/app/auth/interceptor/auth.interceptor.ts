import { take, takeLast, switchMap, merge, mergeMap, tap } from 'rxjs/operators';
import { AuthState } from './../store/auth.reducer';
import { Store } from '@ngrx/store';

import {HttpInterceptor, HttpRequest,HttpHandler,HttpEvent,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = 'Authorization';
  constructor(private store: Store<{ auth: AuthState }>) {}

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    if (( !req.url.includes('login') || !req.url.includes('register'))) {
        return this.store.select('auth').pipe(
            tap((authState)=> console.log(`intercepting request ${req.url} and user authenticated ${authState.loggedIn}` )),
            take(1),
            switchMap((authState)=>{
                let clonedReq = req.clone({headers: req.headers.set(this.AUTH_HEADER, "Bearer " + authState.jwtToken) });
                return next.handle(clonedReq);
            }
        ));
    } else {
      return next.handle(req);
    }
  }
}
