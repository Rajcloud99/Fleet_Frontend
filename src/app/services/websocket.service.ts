import { Injectable } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { catchError, delay, map, retryWhen,switchMap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Socket } from 'ngx-socket-io';
import { StorageService } from './storage.service';

  @Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  
  connection$ = webSocket(environment.ws);
  RETRY_SECONDS: number = 120000;

  constructor(private socket: Socket,
              private storageService: StorageService) { }
  
  connect(data: any): Observable<any>{
      this.send(data);
      return of(environment.ws)
        .pipe(
          switchMap(wsUrl => {
            if (this.connection$) {
              return this.connection$;
            } else {
              // this.commonService.infoMsg('connection etablishing');
              this.connection$ = webSocket(wsUrl);
              return this.connection$;
            }
          }),
          retryWhen((errors) => errors.pipe(delay(this.RETRY_SECONDS))),
          // catchError((err) => {
          //   console.error(err);
            
          // })
        );
  }
    // catch (e) {
    //   console.error('[error]', e);
    // }

  send(data: any) {
    // this.commonService.infoMsg('sending data');
    if (this.connection$) {
      this.connection$.next(data);
    } else {
      console.error('Did not send data, open a connection first');
    }
  }

  sendMessage(data: any) {
    let msg: string = JSON.stringify(data);
    this.socket.emit('message',msg);
  }

  getMessage(): Observable<any> {
    return this.socket.fromEvent('message').pipe(
      map((res: any) => {
        if(res) {
          return JSON.parse(res);
        } else {
          console.log('some error found');
        }
    }));
  }

  connect2() {
    setTimeout(()=> {
      let loginForm: any = {};
      loginForm.user_id = this.storageService.get('userData')?.client_config?.gpsId;
      loginForm.password = this.storageService.get('userData')?.client_config?.gpsPwd;
      loginForm.request = 'authentication';
      if(!loginForm.user_id || !loginForm.password) return;
      let req : any = JSON.stringify(loginForm);
      this.sendMessage(req);
      this.getMessage();
    });
  }
  
  getMap(data: any) {
    this.sendMessage(data);
    return this.getMessage();
  }
  closeConnection() {
    if (this.connection$) {
      this.connection$.complete();
      this.connection$ = webSocket('');
    }
    this.socket.removeListener('message');
  }

  ngOnDestroy() {
    // this.disableTracking();
    this.closeConnection();
    this.socket.removeListener('message');
  }

}



