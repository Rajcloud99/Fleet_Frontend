import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {StorageService} from './storage.service';
import {CommonService} from './common.service';
import {catchError, map} from 'rxjs/operators';
import { WebsocketService } from './websocket.service';

const URL = {
  POST_LOGIN: 'auth/login',
  POST_USER: 'api/user/create',
  POST_SWITCH_CO: 'api/company/switchCompany',
  POST_COMPANY_CREATE: 'api/company/create',
  POST_DEVICES_GET: 'api/reports/devices'
};
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedInStatus = false;
  constructor(private http: HttpClient,
              private store: StorageService,
              private commonService: CommonService,
              private ws: WebsocketService) { }

  login(request?: any) : Observable<any> {
    return this.http.post(URL.POST_LOGIN, request).pipe(
      map((res : any) => {
        if(res.token) {
          let user = {
            token: res.token,
            user: res.user,
            client_config: res.client_config,
            access: res.access,
            tableAccess: res.tableAccess,
            configs: res.configs,
          };
          this.store.put('userData',user);
          this.store.put('loggedIn',true);
          this.store.put('gpsId',user.client_config.gpsId);
          this.store.put('user',request.userId);
          this.store.put('pwd',request.password);
          this.ws.connect2();
          return res;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && (err.error.error_message || err.error.message));
        return of(false);
      })
    )
  }

  get isLoggedIn () {
    return this.loggedInStatus;
  }

  getDevices(request?: any) {
    return this.http.post(URL.POST_DEVICES_GET,request).pipe(
      map((res: any)=>{
        if(res) {
          return res.data;
        }else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && (err.error.error_message || err.error.message));
        return of(false);
      })
    );
  }
}
