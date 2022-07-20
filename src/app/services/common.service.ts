import { Injectable } from '@angular/core';
import {Observable, Observer, Subject, BehaviorSubject} from 'rxjs';
import {NzModalService} from 'ng-zorro-antd/modal';
import {NzMessageService} from 'ng-zorro-antd/message';
import {StorageService} from './storage.service';
import { Location } from '@angular/common';
import {MoreMenu} from '../shared/modal/moreMenu.modal';

declare let device: any;
declare let FileTransfer: any;
declare let cordova: any;
declare let navigator: any;

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

  toBase64(file:any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  isBase64(string: string): boolean{
    return !!string.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  }
  downloadFileWithUrl(url:any){
    let fileName= url.substr(url.lastIndexOf("/")+1);
    fileName=fileName.replaceAll(':','_');
    this.downloadFile(url,fileName);

  }
  downloadFile(fileurl:any, filename:any): void {
    if (typeof cordova != 'undefined' && typeof device != 'undefined') {
      let blob = null;
      let xhr = new XMLHttpRequest();
      xhr.open('GET', fileurl);
      xhr.responseType = 'blob';//force the HTTP response, response-type header to be blob

      xhr.onprogress = (evt) => {
        if (evt.lengthComputable) {
          let percent = (evt.loaded / evt.total) * 100;
          percent = Math.round((percent * 100) / 100);
          this.success(`Downloaded ${percent}%`);
        }
      };

      xhr.onload = function () {
        blob = xhr.response;//xhr.response is now a blob object
        console.log(blob);
        let storageLocation = '';
        switch (device.platform) {
          case 'Android':
            storageLocation = 'file:///storage/emulated/0/';
            break;
          case 'iOS':
            storageLocation = cordova.file.documentsDirectory;
            break;
        }
        let folderpath = storageLocation + 'Download';
        let DataBlob = blob;
        (<any>window).resolveLocalFileSystemURL(folderpath, function (dir:any) {
          dir.getFile(filename, {create: true}, function (file:any) {
            file.createWriter(function (fileWriter:any) {
              fileWriter.write(DataBlob);
              alert(`${filename} saved to Download folder`)
            }, function (err:any) {
              alert(`${err} Failed to download`);
              console.log(err);
            });
          });
        });
      };
      xhr.send();
    } else {
      let a = document.createElement('a');
      a.href = fileurl;
      a.download = filename;
      a.target = '_blank';
      a.click();
    }
  }



}
