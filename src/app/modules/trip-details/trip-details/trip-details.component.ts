import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faFilter, faSearch, faTimes, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ConstantService } from 'src/app/services/constant.service';
import { MasterService } from '../../master.service';
import { FilterstringgetdatePipe } from 'src/app/shared/pips/filterstringgetdate.pipe';
import {NzModalService} from "ng-zorro-antd/modal";
import {VendordealPopupComponent} from "../../vendordeal-popup/vendordeal-popup.component";
import { StorageService } from 'src/app/services/storage.service';
import {UploadAccordianComponent} from "../../../shared/components/upload-accordian/upload-accordian.component";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.scss']
})
export class TripDetailsComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  visible = false;
  pageNumber = 2;
  timer: any;
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
  faDotCircle = faDotCircle; // fontawesome icon
  faSearch = faSearch; // fontawesome icon
  faTimes = faTimes; // fontawesome icon
  innerWidth: any; // stores width of any screeen
  receivedAllTrips :any;
  scrollTable!: HTMLCollectionOf<Element>;
  selectedRowId: any;
  receivedAllGr: any;
  time: any;
  preparegrArr: any = [];
  receivedAllVehicles: any;
  aTripDocType: any;
  venderget: any;
  customerget: any;
  getCustomerdata: any;
  isMobFilterVisible = false;
  cfilterObj: any;
  selectedTrip: any;
  configs: any;
  isDisable = false;
  startRemark = '';
  endRemark = '';
  tripRemark: any;
  date: any;// trip start date
  startDate: any;
  endDate: any;
  allocationDate: any;
  showUpload: boolean = true;
  fileHolder = [];
  receivedDocument: any = [];
  pData: any;
  roles: any;

  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    private storageServ: StorageService,
    private commonService: CommonService,
    private constantService: ConstantService,
    private viewContainerRef: ViewContainerRef,
    private modal: NzModalService
  ) {
    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = [currentState && currentState.extras.state];
        this.selectedTrip = this.receivedData[0];
        const pipe = new FilterstringgetdatePipe();
        const mContext = this;
        this.allocationDate = pipe.transform(mContext.selectedTrip?.statuses,'Trip not started');
        this.startDate = pipe.transform(mContext.selectedTrip?.statuses,'Trip started');
        this.endDate = pipe.transform(mContext.selectedTrip?.statuses,'Trip ended');
      }
    })
  }

  ngOnInit(): void {
    this.commonService.navbarTittle.next('Trip Detail');

    
    this.time = new Date();
    this.date = new Date();
    this.configs = this.storageServ.get('userData').configs;
    this.roles = this.storageServ.get('userData').access;
    this.aTripDocType = this.constantService.constants.aTripDocType;
    this.innerWidth = window.innerWidth;
    this.preparegrArr = this.selectedTrip?.gr;
    this.showUpload = true;
  }

  navigateToDetails(i:any) {
    this.router.navigateByUrl("home/operation/gr/Upsert/" +'Preview',{state: this.preparegrArr[i]});
  }
  navigateToDetailTM(i:any) {
    this.router.navigateByUrl("home/operation/trip-memo/Upsert/" +'Preview',{state: this.preparegrArr[i]});
  }

  selectItem(item: any) {
    this.selectItem = item;
    this.selectedRowId = item._id;
  }

  aStatusChange = ['Trip not started', 'Trip started', 'Trip ended'];
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

  openStatuspoup () {
    this.tripRemark = '';
    this.visible = true;
  }

  handleCancel() {
    this.visible = false;
  }

  handleUplaodCancel() {
    this.showUpload = false;
  }

  uploadImagesPopUp(){
    this.getDocStatus(false);
  }
  uploadImagesPopUpV2(){
    this.getDocStatus(true);
  }
  getDocStatus(isV2: any) {
    if (this.selectedTrip) {
      let reqBody = {
        _id: this.selectedTrip && this.selectedTrip._id,
        modelName: 'trip',
      };
      this.masterService.getDocuments(reqBody).subscribe((data: any) => {
        if (data) {
          this.receivedDocument = data.data.files;
          this.selectedTrip.receivedDocument = this.receivedDocument;
          if(isV2)
          this.openUpload(this.selectedTrip);
          else
            this.openUploadImagesPopUp(this.receivedDocument);
          // this.categoryMerge(this.receivedDocument);
        }else{
          if(isV2)
            this.openUpload(this.selectedTrip);
          else
            this.openUploadImagesPopUp(this.receivedDocument);
        }
      });
    }
  }

  openUploadImagesPopUp(aAccordianData:any){
    const modal = this.modal.create({
      nzTitle: 'Upload Images',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: UploadAccordianComponent,
      nzComponentParams: {
        aParentCompData :  this.selectedTrip,
        aAccordian:aAccordianData
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }
  handleOk() {
    // write submit function here or simple call it from here
    this.updateTripInfo();
  }

  goToDetailView(d: any) : any {
    console.log(d);
  }

  VendorDealPopup() {
    const modal = this.modal.create({
      nzTitle: 'Vendor Deal',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: VendordealPopupComponent,
      nzComponentParams: {
        aTripData :  this.selectedTrip
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            setTimeout(() => {
              if(componentInstance?.updatetripdata){
                this.selectedTrip = componentInstance?.updatetripdata;
              }
              if(componentInstance?.formvalidation) {
                modal.destroy();
              }
            }, 2000);


          }
        }
      ]
    });
  }

  today = new Date();

  AdTMmodel(mod:string,grdata:any,idx:number){
    if(this.preparegrArr && this.preparegrArr[0] && this.preparegrArr[0].tMemo){

    }
  }

  upsertGrModal(mod:string,grdata:any,idx:number,e:any) {
    if(!e) return;
  }

  addvendordealModal(mod:string,dealdata:any,idx:number) {
    dealdata = dealdata || {};

  }

  openAnalytics(d: any) {
    if(!this.startDate || (!this.selectedTrip?.device?.imei && !this.selectedTrip?.vehicle?.device_imei)) {
      return this.commonService.errorModal('Error','Please check Trip start or device imei no are not found.');
    }
    this.router.navigateByUrl('home/operation/tripDetails/analytics',{state : d});
  }

  openPlayBack(d:any){
    console.log(d);
    this.router.navigateByUrl('home/operation/tripDetails/playback',{state : d});
  }
  openItinerary(d:any){
      this.router.navigateByUrl('home/operation/tripDetails/itinerary', {state: d});
  }

  openUpload(d:any){
      this.router.navigateByUrl('home/operation/tripDetails/upload', {state: d});
  }

  updateTripInfo  (): void {
    let oSend : any = {};
    oSend.date  = this.date;
    oSend.date.setHours(this.time.getHours());
    oSend.date.setMinutes(this.time.getMinutes());
    oSend.date.setMilliseconds(0);
    if(new Date(this.date).getTime() < new Date(this.allocationDate).getTime()) {
      return this.commonService.errorModal('Error','Start date can not be before the allocation date');
    }
    if(new Date(this.date).getTime() < new Date(this.startDate).getTime()) {
      return this.commonService.errorModal('Error','Start date can not be after than end date');
    }
    oSend.status = this.selectedTrip.updatedStatus || this.aStatusChange[this.aStatusChange.indexOf(this.selectedTrip.status)+1];
    oSend.remark = this.tripRemark || this.selectedTrip.remark;
    oSend.updated_status = this.selectedTrip.updated_status || {};

    if (this.selectedTrip.updatedStatus === 'Trip started') {
      if (this.selectedTrip.route) {
        oSend.route_name = this.selectedTrip.route.name;
        oSend.route = this.selectedTrip.route._id;
      }
      oSend.trip = {};
      oSend.trip.gr = this.selectedTrip.gr.map((curr:any) => ({
        _id: curr._id,
        consignee: curr.consignee,
        consignor: curr.consignor,
        status: 'GR Assigned'
      }));
    }
    this.isDisable = true;
    this.masterService.updateTripStatus(this.selectedTrip._id,oSend).subscribe((data: any) => {
      if(data)
        this.router.navigateByUrl('home/operation/tripDetails');
      this.visible = false;
    });
  }
}

