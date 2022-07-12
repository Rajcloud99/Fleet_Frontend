import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders, HttpResponse
} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  constructor(private router: Router,
              private store: StorageService,
    private commonService: CommonService) {
  }

  handleError = (error: HttpErrorResponse) => {
    this.commonService.isLoading(false);
    console.error('Error => ', error);
    if(error.error.status === 'LOGGED_OUT') {
      this.store.clearAll();
      this.router.navigate(['/login']);
    }
    return throwError(error);
  };

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    // console.warn('Before Sending Error', req);

    this.commonService.isLoading(true);
    let loginToken = this.store.get('userData', {}).token;
    let randomNo = Date.now()+''+Math.round(Math.random()*100);

    let headers = new HttpHeaders();
    if (loginToken) {
      headers = headers.append('Authorization', loginToken);
    }
    headers = headers.append('request_id',randomNo);
    headers = headers.append('validate',"all");
    let authReq:any;
    if(req?.params?.get('type_url')==='trucku' || req?.body?.type_url === 'trucku'){
      authReq = req.clone({
        url: environment.trucku_url + req.url, headers
      });
    } else if(req?.body?.type_url === 'gps_url') {
      delete req.body.type_url;
      authReq = req.clone({
        url: environment.gps_url + req.url, headers
      });
    } else{
    authReq = req.clone({
      url: environment.url + req.url, headers
    });
   }
    
    this.commonService.isLoading(true);
    return next.handle(authReq)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.commonService.isLoading(false);
            // console.log('Is instance of http response');
            if (event.status == 200 && event.body.status === 'ERROR' && event.body.message === 'jwt expired') {
              this.store.clearAll();
              this.router.navigate(['/login']);
            }
          }
        }),
        catchError(this.handleError),
        finalize(() => {
          this.commonService.isLoading(false);
        })
      );
  }
}

