import { HttpParams } from '@angular/common/http';
import {Component, HostListener, ElementRef,OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faEye, faFilter, faSearch,faChevronCircleLeft ,faTimes,faTruck,faCircle, faDotCircle, faFileDownload} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ConstantService } from 'src/app/services/constant.service';
import { MasterService } from '../../master.service';
import {NzModalService} from "ng-zorro-antd/modal";
import { StorageService } from 'src/app/services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';



@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit,OnDestroy {
  receivedData: any;
  @ViewChild("donwload", { static: false })
  donwloadAnchor!: ElementRef;
  stopScrolling = false;
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
  fromTime:any;
  toTime:any;
  vehicle_no: any;
  faFilter = faFilter; // fontawesome icon
  faSearch = faSearch; // fontawesome icon
  faTimes = faTimes; // fontawesome icon
  faEye = faEye; // fontawesome icon
  faDotCircle = faDotCircle;
  faTruck = faTruck;
  faCircle = faCircle;
  faChevronCircleLeft = faChevronCircleLeft;
  faFileDownload = faFileDownload;
  innerWidth: any; // stores width of any screeen
  receivedAllTrips :any;
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
  config: any;

  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    private commonService: CommonService,
    private constantService: ConstantService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private storageService: StorageService
  ) {

    this.commonService.navbarTittle.next("All GPS TRIPS");
    
    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = [currentState && currentState.extras.state];
        this.redirectGR = this.receivedData[0];
        if(this.redirectGR && this.redirectGR.trip && this.redirectGR.trip.trip_no) {
          this.filterObj = {'trip_no':this.redirectGR.trip.trip_no}
          this.search();
        }
      }
    })
  }

  ngOnInit(): void {

    let _moreMenu:MoreMenu[]=[
      {
        tittle:"filter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.showFilter();
        }
      },
      {
        tittle:"Today",
        iconName:"fa-calendar",
        isVisible:true,
        clickEventMethode:()=>{
          this.fillDateTime(0);
        }
      },
      {
        tittle:"Yesterday",
        iconName:"fa-calendar",
        isVisible:true,
        clickEventMethode:()=>{
          this.fillDateTime(-1);
        }
      },
      {
        tittle:"View",
        iconName:"fa-eye",
        isVisible:false,
        clickEventMethode:()=>{
          this.detailView();
        }
      },{
        tittle:"Job Risky Report",
        iconName:"fa-file",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadJobRiskyReport();
        }
      },{
        tittle:"Job Order Report",
        iconName:"fa-file",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadJobOrderReport();
        }
      },
      {
        tittle:"Job Order Power Connect Report",
        iconName:"fa-file",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadJobPowerConnectReport();
        }
      }
    ]; 
    this.fromTime=new Date();
    this.toTime=new Date();
    this.commonService.setNavTittleAndMenu("All GPS TRIPS",_moreMenu);
    this.aTripDocType = this.constantService.constants.aTripDocType;
    this.innerWidth = window.innerWidth;
    this.config = this.storageService.get('userData').configs;
    if(this?.config?.searchToday) {
      this.fillDateTime(0);
    } else this.search();
  }

  showFilter(){
    this.isMobFilterVisible=true;
  }

  onSearchGR(value: any) {
    if(value) {
      this.masterService.getTripGr({'skip':1,'no_of_docs':10,'grNumber': value}).subscribe((res:any)=> {
        this.receivedAllGr = [];
        this.receivedAllGr = res;
      });
    }
  }

  fillDateTime(days: number) {
    let start_date = new Date();
    let end_date = new Date ();
    if(days === 0) {
      this.filterObj.from = start_date;
      this.filterObj.from.setHours(0, 0, 0, 0);
      this.filterObj.to = end_date;
    } else if(days === -1) { 
      start_date.setDate(start_date.getDate() - 1);
      this.filterObj.from = start_date;
      this.filterObj.from.setHours(0, 0, 0, 0);
      end_date.setDate(end_date.getDate() - 1);
      this.filterObj.to = end_date;
      this.filterObj.to.setHours(23, 59, 0, 0);
    }
    this.receivedData = [];
    this.search(); 
  }

  onSearchVeh(value: any) {
    if(value) {
      this.masterService.getAllVehicles({vehicle_no: value}).subscribe((res: any) => {
        this.receivedAllVehicles = res;
      });
    }
  }

  detailView() {
    this.router.navigateByUrl('home/operation/tripDetails/view/'+this.selectedRowId, {state : this.selectedItem});
  }
  onSearchvender (value: any) {
    this.venderget = null;
    if(value) {
      let req = {
        name: value,
        no_of_docs: 5,
        deleted: false

      }
      this.masterService.getAllvender(req).subscribe((res: any) => {
        this.venderget = res;
      });
    }
  }

  downloadJobRiskyReport() {
    let req: any = {};
    req.download = true;
    req.all = true;
    req.from = this.filterObj.from;
    req.to = this.filterObj.to;
    if(this.filterObj.vehicle) req.vehicle = this.filterObj.vehicle;
    if(this.filterObj.trip_no) req.trip_no = this.filterObj.trip_no;
    this.masterService.downloadJobRiskyReport(req).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
          this.donwloadAnchor.nativeElement.click();
      }
    })
  }

  downloadJobOrderReport() {
    let req: any = {};
    req.download = true;
    req.all = true;
    req.from = this.filterObj.from;
    req.to = this.filterObj.to;
    if(this.filterObj.vehicle) req.vehicle = this.filterObj.vehicle;
    if(this.filterObj.trip_no) req.trip_no = this.filterObj.trip_no;
    this.masterService.downloadJobOrderReport(req).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
          this.donwloadAnchor.nativeElement.click();
      }
    })
  }

  downloadJobPowerConnectReport() {
    let req: any = {};
    req.download = true;
    req.all = true;
    req.from = this.filterObj.from;
    req.to = this.filterObj.to;
    if(this.filterObj.vehicle) req.vehicle = this.filterObj.vehicle;
    if(this.filterObj.trip_no) req.trip_no = this.filterObj.trip_no;
    this.masterService.downloadJobPowerConnectReport(req).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
          this.donwloadAnchor.nativeElement.click();
      }
    })
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
  ngOnDestroy(){
    this.commonService.setNavTittleAndMenu(); 
  }
  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    this.commonService.hideShowMenu(['View'],true);
  }
  reset () {
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    this.search();
    console.log("reset");
  }
  seprateRoute () {
    for(const data of this.receivedData) {
      if(data && data.rName) {
        let src,dest;
        [src,dest] = data.rName.split(" to ");
        data.src = src;
        data.dest = dest;
      } else if(data && data.route_name) {
        let src,dest;
        [src,dest] = data.route_name.split(" to ");
        data.src = src;
        data.dest = dest;
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
    // this.cfilterObj = JSON.parse(JSON.stringify(this.filterObj));
    this.masterService.getAllTrip({...this.filterObj}).subscribe((res: any) => {
      if(res) {
        this.receivedData = res?.data;
        this.seprateRoute();
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0]?.addEventListener("scroll",() => {
          this.getDataOnScroll();
        })
      }
    })
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any = document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllTrip({ no_of_docs: 10, skip: mContext.pageNumber, ...this.filterObj}).subscribe(data => {
              if (data) {
                data = data?.data || data;
                if (data.length=== 0) {
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
    this.router.navigateByUrl("home/operation/tripGPS" ,{});
    this.commonService.commonUsed.next({ name: 'backButton', value: true });
  }

}

