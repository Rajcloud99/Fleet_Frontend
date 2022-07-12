import { HttpParams, HttpClient } from '@angular/common/http';
import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEye,
  faFilter,
  faSearch,
  faChevronCircleLeft,
  faPlusSquare,
  faTimes,
  faTruck,
  faUpload,
  faCircle,
  faFolderOpen,
  faFolderMinus,
  faAngleDoubleDown,
  faAngleDoubleUp,
  faTrash,
  faFileDownload,
} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ConstantService } from 'src/app/services/constant.service';
import { MasterService } from '../../master.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EmptyTripComponent } from '../empty-trip/empty-trip.component';
import { StorageService } from '../../../services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-trip-list-view',
  templateUrl: './trip-list-view.component.html',
  styleUrls: ['./trip-list-view.component.scss'],
})
export class TripListViewComponent implements OnInit {
  receivedData: any;
  uploadVisible = false;
  privewVisible = false;
  imagePreviewPath: any;
  isConfirmLoading = false;
  receivedDocType: any[] = [];
  hideSavedDoc = false;
  docType:any;
  fromTime:any;
  toTime:any;
  selectedDocType:any;
  receivedDocument: any[] = [];
  uploadFiles: any[] = [];
  fileList: any[] = [];
  errorList: any[] = [];
  isFileError = true;
  acceptFileType: any;
  stopScrolling = false;
  configs: any;
  docConfig: any;
  envUrl: any;
  baseUrl: any;
  maxLimit: any;
  remCount: any;
  pageNumber = 2;
  timer: any;
  logInUser: any;
  filterObj: any = {
    trip_no: null,
    _id: null,
    'vendorDeal.loading_slip': null,
    vendor: null,
    from: null,
    to: null,
    customer_id: null,
    tripDocType: null,
    vehicle: null,
  };
  vehicle_no: any;
  faFilter = faFilter; // fontawesome icon
  faSearch = faSearch; // fontawesome icon
  faTimes = faTimes; // fontawesome icon
  faEye = faEye; // fontawesome icon
  faTruck = faTruck;
  faFileDownload = faFileDownload;
  faAngleDoubleDown = faAngleDoubleDown;
  faAngleDoubleUp = faAngleDoubleUp;
  faFolderMinus = faFolderMinus;
  faPlusSquare = faPlusSquare;
  faTrash = faTrash;
  faCircle = faCircle;
  showSavedDoc = false;
  faUpload = faUpload;
  faFolderOpen = faFolderOpen;
  faChevronCircleLeft = faChevronCircleLeft;
  innerWidth: any; // stores width of any screeen
  receivedAllTrips: any;
  scrollTable!: HTMLCollectionOf<Element>;
  selectedRowId: any;
  selectedItem: any;
  receivedAllGr: any;
  receivedAllVehicles: any;
  aTripDocType: any;
  venderget: any;
  customerget: any;
  getCustomerdata: any;
  isMobFilterVisible = false;
  cfilterObj: any;
  redirectGR: any;
  emptyTripModal: any;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private constantService: ConstantService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
    this.envUrl = environment && environment.url;
    this.route.params.subscribe((queryParam) => {
      if (queryParam._id) {
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = [currentState && currentState.extras.state];
        this.redirectGR = this.receivedData[0];
        if (
          this.redirectGR &&
          this.redirectGR.trip &&
          this.redirectGR.trip.trip_no
        ) {
          this.filterObj = { trip_no: this.redirectGR.trip.trip_no };
          this.search();
        }
      }
    });
  }

  ngOnInit(): void {
    let _moreMenu: MoreMenu[] = [
      {
        tittle: 'fiter',
        iconName: 'fa-filter',
        isVisible: true,
        clickEventMethode: () => {
          this.isMobFilterVisible = !this.isMobFilterVisible;
        },
      },
      {
        tittle: 'View',
        iconName: 'fa-eye',
        isVisible: false,
        clickEventMethode: () => {
          this.detailView();
        },
      },
      {
        tittle: 'Create Empty Trip',
        iconName: 'fa-truck',
        isVisible: false,
        clickEventMethode: () => {
          this.goToEmptyTrip();
        },
      },
      {
        tittle: 'Upload Document',
        iconName: 'fa-upload',
        isVisible: false,
        clickEventMethode: () => {
          this.getDocStatus();
        },
      },
    ];
    this.fromTime=new Date();
    this.toTime=new Date();
    this.commonService.setNavTittleAndMenu('All Trip', _moreMenu);
    this.aTripDocType = this.constantService.constants.aTripDocType;
    this.innerWidth = window.innerWidth;
    this.logInUser = this.storageService.get('userData').user;
    this.configs = this.storageService.get('userData').configs;
    this.docConfig = this.configs.Doc;
    this.docTypeArray(this.docConfig.trip);
    // this.maxLimit = this.docConfig.trip.misc.max;
    // this.selectedDocType=this.receivedDocType[0];
    this.acceptFileType = this.docConfig.trip.misc.ext.join();
    this.search();
  }

  docTypeArray(obj: any) {
    let arr = [];
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        let newobj = { type: prop, ...obj[prop] };
        this.receivedDocType.push(newobj);
      }
    }
  }

  onSearchGR(value: any) {
    if (value) {
      this.masterService
        .getTripGr({ skip: 1, no_of_docs: 10, grNumber: value })
        .subscribe((res: any) => {
          this.receivedAllGr = [];
          this.receivedAllGr = res;
        });
    }
  }

  onSearchVeh(value: any) {
    if (value) {
      this.masterService
        .getAllVehicles({ vehicle_no: value })
        .subscribe((res: any) => {
          this.receivedAllVehicles = res;
        });
    }
  }

  // goToDetailView (d: any) {
  //   this.selectedItem = d;
  //   this.selectedRowId = d._id;
  //   // this.router.navigateByUrl('home/operation/trip/view/'+d._id, {state : d});
  //   // this.commonService.commonUsed.next({ name: 'backButton', value: true });
  // }

  detailView() {
    this.router.navigateByUrl(
      'home/operation/trip/view/' + this.selectedRowId,
      { state: this.selectedItem }
    );
  }
  onSearchvender(value: any) {
    this.venderget = null;
    if (value) {
      let req = {
        name: value,
        no_of_docs: 5,
        deleted: false,
      };
      this.masterService.getAllvender(req).subscribe((res: any) => {
        this.venderget = res;
      });
    }
  }

  // get customer
  getCustomer(value: any): any {
    if (value.length > 2) {
      let params = new HttpParams()
        .set('name', value)
        .set('no_of_docs', 5)
        .set('status', 'Active')
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all')
        .set('all', true);
      this.masterService.getAllCustomers({ params }).subscribe((data: any) => {
        if (data) {
          this.getCustomerdata = data;
        }
      });
    }
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
    this.commonService.hideShowMenu(
      ['View', 'Create Empty Trip', 'Upload Document'],
      true
    );
  }
  reset() {
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    this.search();
    console.log('reset');
  }
  seprateRoute() {
    if(this.receivedData && this.receivedData.length){
      for (const data of this.receivedData) {
        if (data && data.rName) {
          let src, dest;
          [src, dest] = data.rName.split(' to ');
          data.src = src;
          data.dest = dest;
        } else if (data && data.route_name) {
          let src, dest;
          [src, dest] = data.route_name.split(' to ');
          data.src = src;
          data.dest = dest;
        }
      }
    }
    
  }
  search(): void {
    if(this.filterObj.from){
      this.filterObj.from.setHours(this.fromTime.getHours());
      this.filterObj.from.setMinutes(this.fromTime.getMinutes());
      this.filterObj.from.setMilliseconds(0);
    }
    if(this.filterObj.to){
      this.filterObj.to.setHours(this.toTime.getHours());
      this.filterObj.to.setMinutes(this.toTime.getMinutes());
      this.filterObj.to.setMilliseconds(0);
    }
    this.clean(this.filterObj);
    if (
      this.logInUser &&
      this.logInUser.user_type &&
      this.logInUser.user_type.length
    ) {
      if (this.logInUser.user_type.indexOf('Broker') + 1)
        this.filterObj.createdBy = this.logInUser._id;
    }
    // this.cfilterObj = JSON.parse(JSON.stringify(this.filterObj));
    this.masterService
      .getAllTrip({ ...this.filterObj })
      .subscribe((res: any) => {
        if (res) {
          this.receivedData = res?.data;
          this.seprateRoute();
          this.scrollTable = document.getElementsByClassName('ant-table-body');
          this.scrollTable[0]?.addEventListener('scroll', () => {
            this.getDataOnScroll();
          });
        }
      });
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any =
        document.getElementsByClassName('ant-table-body')[0] ||
        document.getElementById('myDIV');
      if (
        divElement.scrollTop + divElement.clientHeight >=
        divElement.scrollHeight
      ) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout(() => {
            mContext.masterService
              .getAllTrip({
                no_of_docs: 10,
                skip: mContext.pageNumber,
                ...this.filterObj,
              })
              .subscribe((data) => {
                if (data) {
                  data = data?.data || data;
                  if (data.length === 0) {
                    mContext.stopScrolling = true;
                  } else {
                    mContext.receivedData = [...mContext.receivedData, ...data];
                    this.seprateRoute();
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

  goToCreateTrip() {
    this.router.navigateByUrl('home/operation/createTrip', {});
    this.commonService.commonUsed.next({ name: 'backButton', value: true });
  }

  goToEmptyTrip() {
    if (!this.selectedRowId) {
      this.commonService.errorModal('Error', 'Please select any one row');
      return;
    }

    const modal = this.modal.create({
      nzTitle: 'Create Empty Trip',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: EmptyTripComponent,
      nzComponentParams: {
        InputData: 'modal',
        RowInfo: this.selectedItem,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise((resolve) => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: (componentInstance: any) => {
            console.log(componentInstance);
            let formValue = componentInstance?.emptyTripForm?.value;
            if (formValue.tripStartDate > formValue.tripEndDate) {
              return this.commonService.errorModal(
                'Error',
                'Trip start Date should not be greater than Trip End Date'
              );
            }
            componentInstance?.onSubmit();
            modal.destroy();
          },
        },
      ],
    });
  }

  getDocStatus() {
    if (!this.selectedRowId) {
      this.commonService.errorModal('Error', 'Please select any one row');
      return;
    }
    if (this.selectedRowId) {
      this.receivedDocument = [];
      this.fileList = [];
      let reqBody = {
        _id: this.selectedRowId,
        modelName: 'trip',
      };
      this.masterService.getDocuments(reqBody).subscribe((data: any) => {
        this.uploadVisible = true;
        if (data) {
          this.prepareDocView(data);
        }
        this.isFileError = true;
        let type=this.selectedDocType||this.receivedDocType[0];
        this.onDocTypeChange(type);
        this.docType=type;
        this.selectedDocType='';
      });
    }
  }

  prepareDocView(data: any) {
    this.hideSavedDoc = false;
    this.showSavedDoc=true;
    this.receivedDocument = [];
    const files = data.data.files;
    const img_url =
      environment.img_url ||
      'http://lmstest.umbrellaprotectionsystems.com:7653/';
    let url = '';
    for (let file of files) {
      this.baseUrl = img_url + file.name;
      url = this.baseUrl;
      this.receivedDocument.push({
        category: file.category,
        url: url,
        name: file.name,
      });
    }
  }

  checkUpload() {
    if(!this.remCount){
      this.commonService.error('Max upload limit reached.');
      return;
    }
    if(!this.docType){
      this.commonService.error('Please Select Doc Type First.');
      return;
    }
    
  }

  onDocTypeChange(event: any) {
    const result = this.receivedDocType.filter(doc => doc.type === event.type);
    const docresult = this.receivedDocument.filter(doc => doc.category === event.type);
    let doccount=docresult?.length||0;
    let maxcount=result[0].max||0;
    this.maxLimit = maxcount;
    this.remCount = this.maxLimit - doccount;
    this.selectedDocType=event;
  }

  onDocChange(event: any) {
    this.hideSavedDoc = true;
    this.uploadFiles = [];
    this.fileList = [];
    this.errorList = [];
    let files = event.target.files;    
    for (let i = 0; i < this.remCount; i++) {
      if (files[i]) {
        this.uploadFiles.push(files[i]);
      }
    }
    this.validateDocBeforeSave(this.uploadFiles);
  }

  validateDocBeforeSave(files: any) {
    let maxSize = this.docConfig.trip.misc.size;
    if (!files.length) {
      this.commonService.error('No file(s) to Validate');
      return;
    }
    for (let file of files) {
      let errors = '';
      let error1 = '';
      let error2 = '';
      let url = '';
      const fileExtension = file.name.replace(/^.*\./, '');
      const fileSize = Math.round(file.size / 1024);
      if (
        !(
          fileExtension === 'png' ||
          fileExtension === 'jpg' ||
          fileExtension === 'jpeg'
        )
      ) {
        error1 = 'Only image file(s) alloud';
      }
      if (fileSize > maxSize) {
        error2 = `Max file size is ${maxSize}Kb `;
      }
      if (error1 && error2) {
        error2 = ' & ' + error2;
      }
      errors = error1 + error2;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        url = e.target.result;
        this.fileList.push({ file: file, error: errors, path: url });
        this.fileErrorCheck(this.fileList);
      };
    }
  }

  fileErrorCheck(fileList: any) {
    if (fileList) {
      this.errorList = [];
      for (let item of fileList) {
        if (item.error) {
          this.errorList.push(item.error);
        }
      }
      this.isFileError =
        this.errorList && this.errorList?.length ? true : false;
    }
  }

  removeFile(index: number) {
    if (this.fileList.length) {
      this.fileList.splice(index, 1);
      this.fileErrorCheck(this.fileList);
    }
  }

  deleteDoc(event: any, index: number) {
    if (event) {
      let reqBody = {
        _id: this.selectedRowId,
        modelName: 'trip',
        name: event,
      };
      this.masterService.deleteDocument(reqBody).subscribe((data: any) => {
        if (data.status === 'OK') {
          this.receivedDocument.splice(index, 1);
          let type=this.selectedDocType||this.receivedDocType[0];
          this.onDocTypeChange(type);
          //this.remCount = this.maxLimit - this.receivedDocument.length;
        }
      });
    }
  }

  showDocDeleteConfirm(event: any, index: number): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete?`,
      //nzContent: `Click Yes to delete <b>${event}</b>.`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteDoc(event, index),
      nzCancelText: 'Cancel',
    });
  }

  saveDocAfterValidate() {
    if (!this.docType) {
      this.commonService.error('Please Select Doc Type first.');
      return;
    }
    if (!(this.fileList.length > 0)) {
      this.commonService.error('No file(s) to Upload');
      return;
    }
    if (this.isFileError) {
      this.commonService.error('Please check file errors.');
      return;
    } else {
      this.isConfirmLoading = true;
      const fd = new FormData();
      for (let file of this.fileList) {
        fd.append('uploadfile', file.file);
      }
      fd.append('bodyKey', this.docType.type);
      fd.append('modelName', 'trip');
      this.masterService
        .saveDocument(this.selectedRowId, fd)
        .subscribe((data: any) => {
          if (data) {
            this.prepareDocView(data);
            this.isConfirmLoading = false;
            this.uploadFiles = [];
            this.fileList = [];
            this.errorList = [];
          }
          this.hideSavedDoc = false;
          this.showSavedDoc = false;
          let type=this.selectedDocType||this.receivedDocType[0];
          this.onDocTypeChange(type);
          //this.remCount = this.maxLimit - this.receivedDocument.length;
          this.isConfirmLoading = false;
        });
    }
  }

  docDownload(path: any) {
    window.open(path, '_new');
  }

  docPreview(path: any) {
    this.privewVisible = true;
    this.imagePreviewPath = path;
  }

  handleCancel(): void {
    this.uploadVisible = false;
  }

  previewCancel(): void {
    this.privewVisible = false;
  }
}
