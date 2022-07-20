import {
  Component,
  OnInit,
  HostListener,
  HostBinding,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from '../../../services/common.service';
import { HttpParams } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { concat, Observable, Observer } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '../../../../environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  faPlusSquare,
  faEye,
  faEdit,
  faSearch,
  faTrash,
  faTimes,
  faFileExcel,
  faDownload,
  faUpload,
  faFileUpload,
  faFilter,
  faFolderOpen,
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-driver-list-view',
  templateUrl: './driver-list-view.component.html',
  styleUrls: ['./driver-list-view.component.scss'],
})
export class DriverListViewComponent implements OnInit {
  receivedData: any; // store the data
  receivedDriver: any;
  parentName = 'driver';
  stopScrolling = false;
  pageNumber = 2;
  clickSearch = true;
  timer: any;
  selectedRowId: any;
  selectedItem: any;
  selectedFile: any;
  faPlusSquare = faPlusSquare;
  faEye = faEye;
  faEdit = faEdit;
  faSearch = faSearch;
  faTrash = faTrash;
  faTimes = faTimes;
  faFilter= faFilter;
  faFileExcel = faFileExcel;
  faFolderOpen = faFolderOpen;
  faDownload = faDownload;
  faUpload = faUpload;
  faFileUpload = faFileUpload;
  innerWidth: any; // stores width of any screeen
  confirmModal?: NzModalRef;
  isVisible = false;
  isConfirmLoading = false;
  tplModalButtonLoading = false;
  isPrefillDataInTable = false;
  configs: any;
  driverDocument: any;
  loading = false;
  avatarUrl?: string;
  docType: any;
  photo = 0;
  address_proof_front_copy = 0;
  address_proof_back_copy = 0;
  license_front_copy = 0;
  license_back_copy = 0;
  other = 0;
  docConfig: any;
  bodyKey: any;
  isVisiblePreview= false;
  uploadVisible = false;
  uploadTableVisible = false;
  uploadStatusMessage: any;
  maxAlloud = 0;
  addDocVisible = false;
  docTableVisible= true;
  docTablePreviewVisible=false;
  uploadDocVisible=false;
  receivedDvrDocuments: any[]=[];
  fileError : any;
  maxFileSize = 0;
  files: any[]=[];
  previewFiles: any[]=[];
  errorList: any;
  filePath: any;
  envUrl: any;
  baseUrl: any;
  isMobFilterVisible=false;
  filterObj: { [index: string]: any } = {
    name: null,
    license_no: null,
    from: null,
    to: null,
  };
  scrollTable!: HTMLCollectionOf<Element>;
  receivedDocument: any;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalService: NzModalService,
    private masterService: MasterService,
    private storageServ: StorageService,
    private msg: NzMessageService,
    public sanitizer: DomSanitizer,
    private commonServ: CommonService
  ) {this.envUrl = environment && environment.url;}

  documetView() {
    this.receivedDvrDocuments=[];
    if (this.selectedRowId) {
      let reqBody = {
        _id: this.selectedRowId,
        modelName: 'driver',
      };
      this.masterService.getDocuments(reqBody).subscribe((data: any) => {
        if (data) {
          const files = data.data.files;
          const base_Url = new URL(this.envUrl);
          base_Url.port = '7652';
          let safeUrl:SafeResourceUrl; 
          for(let file of files) {
            this.baseUrl= base_Url + file.name;
            safeUrl=this.sanitizer.bypassSecurityTrustResourceUrl(this.baseUrl);
            this.receivedDvrDocuments.push({category:file.category,safeUrl:safeUrl,name:file.name});
            this.docTablePreviewVisible=true;
          }
          this.isVisiblePreview=true;
        }
      });
    }      
  }

  viewDoc(event: any){
    const base_Url = new URL(this.envUrl);
    base_Url.port = '7652';
    event=base_Url+event;
    window.open(event, "_new");
  }

  printDoc(event: any){
    // const base_Url = new URL(this.envUrl);
    // base_Url.port = '7653';
    // event=base_Url+event;
    // window.open(event, "_new");
    // window.print();
  }

  deleteDoc(event:any,index:number){
    if(event){
      let reqBody = {
        _id: this.selectedRowId,
        modelName: 'driver',
        name:event,
      };
      this.masterService.deleteDocument(reqBody).subscribe((data: any) => {
        if (data.status==='OK') {
          this.receivedDvrDocuments.slice(index,1);
          this.docTablePreviewVisible=true;
          this.documetView();    
        }
      });
    }
  }

  uploadDocumentModel(): void {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.photo = 0;
    this.address_proof_front_copy = 0;
    this.address_proof_back_copy = 0;
    this.license_front_copy = 0;
    this.license_back_copy = 0;
    this.other = 0;
    this.getDocStatus();
    this.docType = '';
    this.isVisible = true;
    this.uploadVisible = false;
    this.uploadStatusMessage = '';
    this.uploadTableVisible = false;
    this.isConfirmLoading = false;
    this.receivedDocument=[];
  }

  getDocStatus() {
    if (this.selectedRowId) {
      let reqBody = {
        _id: this.selectedRowId,
        modelName: 'driver',
      };
      this.masterService.getDocuments(reqBody).subscribe((data: any) => {
        if (data) {
          this.receivedDocument = data.data.files;
          this.categoryMerge(this.receivedDocument);
        }
      });
    }
  }

  categoryMerge(items: any) {
        this.photo = 0;
        this.address_proof_front_copy = 0;
        this.address_proof_back_copy = 0;
        this.license_front_copy = 0;
        this.license_back_copy = 0;
        this.other = 0;
    for (let item of items) {
      if (item && item.category == 'photo') {
        this.photo = this.photo + 1;
      } else if (item && item.category == 'address_proof_front_copy') {
        this.address_proof_front_copy = this.address_proof_front_copy + 1;
      } else if (item && item.category == 'address_proof_back_copy') {
        this.address_proof_back_copy = this.address_proof_back_copy + 1;
      } else if (item && item.category == 'license_front_copy') {
        this.license_front_copy = this.license_front_copy + 1;
      } else if (item && item.category == 'license_back_copy') {
        this.license_back_copy = this.license_back_copy + 1;
      } else if (item && item.category == 'other') {
        this.other = this.other + 1;
      }
    }
  }

  onDocTypeChange(event: any) {
    this.addDocVisible= false;
    this.uploadStatusMessage = '';
    this.files = [];
    this.previewFiles=[];
    this.uploadDocVisible= false;
    this.fileError= false;
    this.maxFileAlloud(event);
    if (this.maxAlloud > 0) {
      this.uploadVisible = true;
    }
  }

  maxFileAlloud(category: any) {
    if (category === 'photo') {
      this.maxAlloud = this.docConfig?.photo?.max - this.photo;
      this.maxFileSize=this.docConfig?.photo?.size;
    } else if (category === 'address_proof_front_copy') {
      this.maxAlloud =
        this.docConfig?.address_proof_front_copy?.max -
        this.address_proof_front_copy;
        this.maxFileSize=this.docConfig?.address_proof_front_copy?.size;
    } else if (category === 'address_proof_back_copy') {
      this.maxAlloud =
        this.docConfig?.address_proof_back_copy?.max -
        this.address_proof_back_copy;
        this.maxFileSize=this.docConfig?.address_proof_back_copy?.size;
    } else if (category === 'license_front_copy') {
      this.maxAlloud =
        this.docConfig?.license_front_copy?.max - this.license_front_copy;
        this.maxFileSize=this.docConfig?.license_front_copy?.size;
    } else if (category === 'license_back_copy') {
      this.maxAlloud =
        this.docConfig?.license_back_copy?.max - this.license_back_copy;
        this.maxFileSize=this.docConfig?.license_back_copy?.size;
    } else if (category === 'other') {
      this.maxAlloud = this.docConfig?.other?.max - this.other;
      this.maxFileSize=this.docConfig?.other?.size;
    }
  }

  fileErrorCheck(fileList: any){
    if(fileList){
      for (let item of fileList){
        if(item.error){
          const error=[];
          error.push(item.error);
          this.errorList=error;
        }
      }
      this.fileError=this.errorList && this.errorList?.length?false:true;
    }
    
  }
  

  validateDocBeforeSave(event: any) {
    this.fileError=false;
    this.addDocVisible= true;
    this.files = [];
    this.errorList=[];
    this.previewFiles=[];
    this.maxFileAlloud(this.docType);
    this.uploadDocVisible= false;
    this.uploadTableVisible = false;
    this.uploadStatusMessage='';
    let fileList:any;
    fileList=[];
    for(let file of event.target.files){
    let errors='';
    let error1='';
    let error2='';
    let url='';
    this.files.push(file);
    let safeUrl:SafeResourceUrl;
     const fileExtension=file.name.replace(/^.*\./, '');
     const fileSize = Math.round((file.size / 1024));
     if(!(fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg')){
      this.commonServ.error('Only image file alloud');
      return;
      // error1='only image file alloud,';
    }
     if(fileSize > this.maxFileSize){
      error2=`Max file size is ${this.maxFileSize}Kb `;
     }
     errors=error1+error2;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e:any)=>{
      url = e.target.result;
      safeUrl= this.sanitizer.bypassSecurityTrustResourceUrl(url);
      fileList.push({file:file,error:errors,path:url,ext:fileExtension});
      this.previewFiles=fileList;
      this.fileErrorCheck(fileList);
    };
    }
    const fd = new FormData();
    this.maxFileAlloud(this.docType);
    if (this.maxAlloud >= this.files.length) {
      this.addDocVisible = true;
      for (let data of event.target.files) {
        fd.append('uploadfile', data);
      }
      fd.append('bodyKey', this.docType);
      fd.append('modelName', 'driver');
      this.masterService
        .validateDocument(this.selectedRowId, fd)
        .subscribe((data: any) => {
          if (data) {
            this.uploadStatusMessage = data.data[0].fileError;
          }
        });
    } else {
      this.uploadStatusMessage = `Max limit to upload is ${this.maxAlloud}`;
      this.addDocVisible = false;
      return;
    }
  }

  addDocuments() {
    this.uploadTableVisible = true;
    this.uploadDocVisible= true;
  }

  removeFile(index: number): void {
    if (this.previewFiles.length) {
      this.previewFiles.splice(index, 1);
      this.files.splice(index, 1);
      this.errorList=[];
      if(this.previewFiles.length){
        for (let item of this.previewFiles){
          if(item.error!=""){
            const error=[];
            error.push(item.error);
            this.errorList=error;
          }
        }
        this.fileError=this.errorList && this.errorList?.length?true:false;
        this.uploadStatusMessage=this.fileError?'':this.uploadStatusMessage;
      }
    }else{
      this.fileError=this.errorList && this.errorList?.length?true:false;
    }
  }

  saveDocAfterValidate() {
    if(this.errorList?.length){
      this.commonServ.error('Please check file errors.');
    return;
    }else{
      this.isConfirmLoading = true;
    const fd = new FormData();
    for (let file of this.files) {
      fd.append('uploadfile', file);
    }
    fd.append('bodyKey', this.docType);
    fd.append('modelName', 'driver');
    this.masterService
      .saveDocument(this.selectedRowId, fd)
      .subscribe((data: any) => {
        if (data) {
          this.receivedDocument = data.data.files;
          this.categoryMerge(this.receivedDocument);
          this.isConfirmLoading = false;
          this.files=[];
          this.previewFiles=[];
          this.docType='';
        }
      });
    }
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisiblePreview=false;
  }


  
 
  ngOnInit(): void {
    
    let _moreMenu:MoreMenu[]=[
      {
        tittle:"fiter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.isMobFilterVisible = !this.isMobFilterVisible;
        }
      },
      {
        tittle:"Add Driver",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Driver",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
        }
      } ,  
      {
        tittle:"View Document",
        iconName:"fa-eye",
        isVisible:false,
        clickEventMethode:()=>{
          this.documetView();
        }
      } 
      ,
      {
        tittle:"Download Document",
        iconName:"fa-download",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadReport();
        }
      } 
      ,
      {
        tittle:"Upload Document",
        iconName:"fa-upload",
        isVisible:true,
        clickEventMethode:()=>{
          this.uploadDocumentModel();
        }
      }  
        ,
        {
          tittle:"Delete Driver",
          iconName:"fa-trash",
          isVisible:false,
          clickEventMethode:()=>{
            this.showDeleteConfirm(this.selectedItem.name)
          }
        } 
      //uploadDocumentModel
    ];
   // showDeleteConfirm(this.selectedItem.name)
    this.commonServ.setNavTittleAndMenu("All Drivers",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.configs = this.storageServ.get('userData').configs;
    this.docConfig = this.configs.Doc.driver;
    let params = new HttpParams()
      .set('sort', -1)
      .set('user_type', 'Driver')
      .set('deleted', false)
      .set('no_of_docs', 15)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all');
    this.masterService.getAllDriver({ params }).subscribe((data: any) => {
      if (data) {
        this.receivedData = data;
        this.scrollTable = document.getElementsByClassName('ant-table-body');
        this.scrollTable[0]?.addEventListener('scroll', () => {
          console.log('scroll');
          this.onScroll();
        });
      }
    });
  }

  showDeleteConfirm(value: any): void {
    this.modalService.confirm({
      nzTitle: `Are you sure you want to delete?`,
      nzContent: `Click Yes to delete <b>${value}</b>.`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(),
      nzCancelText: 'Cancel',
    });
  }

  onChangeSearch(value: any, type: string): any {
    if (value) {
      let params = new HttpParams()
        .set('user_type', 'Driver')
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      params = params.append(type, value);
      this.masterService.getAllDriver({ params }).subscribe((data: any) => {
        if (data) {
          this.receivedDriver = data;
        }
      });
    }
  }

  onScroll() {
    if (this.clickSearch) {
      let divElement: any =
        document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
      if (
        divElement.scrollTop + divElement.clientHeight >=
        divElement.scrollHeight
      ) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout(function () {
            let params = new HttpParams()
              .set('sort', -1)
              .set('user_type', 'Driver')
              .set('skip', mContext.pageNumber)
              .set('deleted', false)
              .set('no_of_docs', 15)
              .set(
                'request_id',
                Date.now() + '' + Math.round(Math.random() * 100)
              )
              .set('validate', 'all');
            mContext.masterService
              .getAllDriver({ params })
              .subscribe((data) => {
                if (data) {
                  if (data.length === 0) {
                    mContext.stopScrolling = true;
                  } else {
                    mContext.receivedData = [...mContext.receivedData, ...data];
                    mContext.pageNumber = mContext.pageNumber + 1;
                  }
                }
                return;
              });
          }, 400);
        }
      }
    }
  }

  search(): any {
    delete this.selectedRowId;
    this.clickSearch = false;
    let params = new HttpParams()
      .set('sort', -1)
      .set('no_of_docs', 15)
      .set('user_type', 'Driver')
      .set('deleted', false)
      .set('skip', 1)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all');
    this.clean(this.filterObj);
    for (let propName in this.filterObj) {
      params = params.append(propName, this.filterObj[propName]);
    }
    this.masterService.getAllDriver({ params }).subscribe((data: any) => {
      if (data) {
        this.receivedData = data;
      }
    });
  }

  downloadReport(): any {
    let params = new HttpParams()
      .set('no_of_docs', 15)
      .set('user_type', 'Driver')
      .set('deleted', false)
      .set('skip', 1)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all')
      .set('download', true)
      .set('all', true);
    this.clean(this.filterObj);
    if (!(this.filterObj.from && this.filterObj.to)) {
      this.commonServ.error('Please Provide Date range');
      return false;
    } else {
      for (let propName in this.filterObj) {
        params = params.append(propName, this.filterObj[propName]);
      }
      this.masterService
        .downloadDvrReport({ params })
        .subscribe((data: any) => {
          if (data) {
            let link = document.createElement('a');
            link.href = data;
            link.click();
            link.remove();
          }
        });
    }
  }

  delete() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.masterService
      .deleteDriver(this.selectedRowId, {
        deleted: true,
        _id: this.selectedRowId,
      })
      .subscribe((data: any) => {
        if (data) {
          this.search();
          this.router.navigateByUrl('home/master/driver');
        }
      });
  }

  reset() {
    this.clickSearch = true;
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
      delete this.selectedRowId;
    }
    this.search();
  }

  clean(obj: any) {
    for (let propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    
    this.commonServ.hideShowMenu( ["View Document","Edit Driver",'Delete Driver'],true);
  }

  navigateToEdit() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.router.navigateByUrl(
      'home/master/driver/upsert/' + this.selectedRowId,
      { state: this.selectedItem }
    );
    // this.commonServ.commonUsed.next({ name: "backButton", value: true });
  }

  navigateToAdd() {
    this.router.navigateByUrl('home/master/driverUpsert');
  }

  navigateToDetailView() {
    this.router.navigateByUrl('home/master/driver/view');
  }
}
