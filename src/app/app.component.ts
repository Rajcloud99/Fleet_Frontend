import { Component } from '@angular/core';
import { CommonService } from './services/common.service';
import { StorageService } from './services/storage.service';
import { WebsocketService } from './services/websocket.service';
import {Socket} from 'ngx-socket-io';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lmsapp';

  constructor (
    private commonService: CommonService,
    private store: StorageService,
    private ws: WebsocketService,
    private socket: Socket
    ) {
      if(true || this.store.get('userData')?.user?._id){
        // io.connect()
        let loginForm : any = {};
        loginForm.user_id = 'NAVKAR'; // || this.store.get('userData')?.client_config?.gpsId;
        loginForm.password = '123456'; // || this.store.get('userData')?.client_config?.gpsPwd;
        loginForm.request = 'authentication';
        let req : any = JSON.stringify(loginForm);
        this.socket.fromEvent('message').subscribe((msg: any)=>{
          if(msg.request != 'authentication') return;
              let res = JSON.parse(msg);
              console.log(res);
        });
        this.socket.emit('message',req);
        // this.socketResponse();
      }
    }

    socketResponse() {
      this.socket.on('connect',function (args:any) {
        console.log("successful connection",args);
      });
    }
  loadingObservable = this.commonService.loadingObservable;
}
