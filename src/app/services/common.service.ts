import { Injectable } from '@angular/core';
import {Observable, Observer, Subject, BehaviorSubject} from 'rxjs';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {StorageService} from './storage.service';
import { Location } from '@angular/common';
import {MoreMenu} from '../shared/modal/moreMenu.modal';
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private isHttpRequestActive: boolean = false;
  private loadingSubject = new Subject();
  loadingObservable!: Observable<any>;
  commonUsed = new BehaviorSubject<Object>(''); // show module Name in header
 
  navbarTittle = new BehaviorSubject<string>(''); //navbar header tittle
  SetmoreMenu =new BehaviorSubject <MoreMenu[]>([]);
  constructor(private modalService: NzModalService,
              private message: NzMessageService,
              private location: Location,
              private store: StorageService) {
                this.loadingObservable = this.loadingSubject.asObservable();
               }

  hideShowMenu(titleName:string[],isVisible:boolean){
   let menuList=this.SetmoreMenu.getValue();
   console.log(menuList);
   let updatedMenuList=menuList.map((o)=>{
    if(titleName.includes(o.tittle)){
     o.isVisible=isVisible;
    }
    return o;
   });

   
   this.SetmoreMenu.next(updatedMenuList);
  }
  setNavTittleAndMenu(titleName:string='',menuList:MoreMenu[]=[]){
    this.navbarTittle.next(titleName);
    this.SetmoreMenu.next(menuList);

  }

  error(message: string): void{
    this.message.create('error', message, {nzDuration: 4000});
  }

  success(message: string): void{
    this.message.create('success', message, {nzDuration: 3000});
  }

  defautlMsg(message: string): void{
    this.message.create('info', message, {nzDuration: 2500});
  }

  warningModal(title: string, content: string = '', success: any = () => console.log('Info OK'), failure: any = () => console.log('Info Canceled')){
    this.modalService.warning({
      nzTitle: title,
      nzContent: content,
      nzOkText: "Yes",
      nzCancelText: "No",
      nzOnOk: success,
      nzOnCancel: failure
    });
  }

  errorModal(title: string, content: string = '', success: any = () => console.log('Info OK')) {
    this.modalService.error({
      nzTitle: title,
      nzCentered: true,
      nzContent: content,
      nzOkText: 'Ok',
      nzOnOk: success,
    });
  }

  isLoading(bool: boolean = false){
    this.isHttpRequestActive = bool;
    this.loadingSubject.next(bool);
  }

  isHttpActive(): boolean{
    return this.isHttpRequestActive;
  }
  // search(searchText: string){
  //   this.searchSubject.next(searchText);
  // }

  // clearSearch(){
  //   this.clearSearchSubject.next();
  // }

  goBack(){
    this.location.back();
  }

  loginUserInfo(){
    return this.store.get('userData', {});
  }
}
