import {Component, OnInit, ChangeDetectionStrategy, HostListener} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder,ReactiveFormsModule,FormGroup,Validators} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {StorageService} from '../services/storage.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  hide = true;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  loginForm = this.fb.group({
    userId: [null,[Validators.required]],
    password: [null,[Validators.required]]
  });
  configs: any;
  innerWidth:any;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: LoginService,
    private store: StorageService,
    private router: Router,
    private socket: Socket) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.configs = this.store.get('userData')?.configs;
    if(this.store.get('loggedIn')) {
      this.router.navigate(['./home']);
    }
    if(this?.configs?.loginPath) {
      this.router.navigateByUrl(this.configs.loginPath);
    }
  }

  submitForm():void {
    let formData = this.loginForm.getRawValue();
    if(this.store.get('loggedIn')) {
      formData.userId = this.store.get('user');
      formData.password = this.store.get('pwd');
      this.router.navigate(['./home']);
    }
    if(this?.configs?.loginPath) {
      this.router.navigateByUrl(this.configs.loginPath);
    }
    let randomNo = Date.now()+''+Math.round(Math.random()*100);
		formData.request_id = Date.now()+''+Math.round(Math.random()*100);
		formData.validate = 'all';
    this.service.login(formData)
    .subscribe(isOK =>  {
      console.log(isOK);
      if(isOK) {
        this.getAllDevices();
        this.router.navigate(['./home']);
        if(isOK?.configs?.loginPath) {
          this.router.navigateByUrl(isOK?.configs?.loginPath);
        }
        // alert('you are sucessfully loggedIN');
      }
    })
  }

  getAllDevices(): void {
    let req: any = {};
    req.request = "gpsgaadi_by_uid";
    req.version = 2;
    req.type_url = 'trucku';
    req.selected_uid = this.store.get('userData').client_config.gpsId;
    req.login_uid = this.store.get('userData').client_config.gpsId;
    this.service.getDevices(req).subscribe((res: any)=>{
      this.store.put('alldevices',res);
    });
  }
}
