import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import {faBan, faEdit, faEye, faFilter, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {StorageService} from "../../../services/storage.service";

@Component({
  selector: 'app-trip-memo-list-view',
  templateUrl: './trip-memo-list-view.component.html',
  styleUrls: ['./trip-memo-list-view.component.scss']
})
  export class TripMemoListViewComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  logInUser : any;
  pageNumber = 2;
  grConfigs:any;
  faEye = faEye;  // font awesome icons
  faEdit = faEdit; // font awesome icons
  faFilter= faFilter;
  timer: any;
  selectedRowId: any;
  vehicleget:any;
  isMobFilterVisible=false;
  billingpartydata: any;
  selectedTrip:any;
  innerWidth: any;// stores width of any screeen
  screenHeight :any;
  getCustomerdata:any;
  filterObj: { [index: string]: any } = {
    vehicle: null,
    grNumber:null,
    trip_no:null,
    tMNo:null,
    tMemoFromDate:null,
    tMemoToDate:null,
    billingParty:null,
    customer : null
  };
  scrollTable!: HTMLCollectionOf<Element>;

  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  constructor(
    private router: Router,
    private commonServ: CommonService,
    private masterService: MasterService,
    private modal: NzModalService,
    private storageServ: StorageService,
    private commonService:CommonService
  ) {}

  ngOnInit(): void {
    this.grConfigs = this.storageServ.get('userData').configs.GR.config;
    this.logInUser = this.storageServ.get('userData').user;
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.search();

  }
  selectItem(item: any) {
    this.selectedTrip = item;
    this.selectedRowId = item._id;
  }
  // go to the edit  page
  navigateToEdit() {
    this.router.navigateByUrl("home/operation/trip-memo/Upsert/" + 'Edit', {state: this.selectedTrip});
  }
  navigateToDetails() {
    this.router.navigateByUrl("home/operation/trip-memo/Upsert/" +'Preview',{state: this.selectedTrip});
  }
  // get customer
  getcustomer(value: any): any {
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

  search() {
    this.clean(this.filterObj);
    let request = {...this.filterObj}
      request.no_of_docs= 10;
      request.skip= 1;

    if(this.logInUser && this.logInUser.user_type && this.logInUser.user_type.length){
      if(this.logInUser.user_type.indexOf('Broker') + 1)
        request.createdBy = this.logInUser._id;
    }
      this.masterService.getAllTripMemo(request)
        .subscribe((data: any) => {
          if (data) {
            this.receivedData = data.data;
            this.scrollTable = document.getElementsByClassName("ant-table-body");
            this.scrollTable[0].addEventListener('scroll',() => {
              console.log('scroll');
              this.onScroll();
            } )

          }
        });
  }

  onSearchvehicle(value: any) {
    if(value) {
      let req = {
        vehicle_no: value,
        no_of_docs: 5,
      }
      this.masterService.getAllVehicle(req).subscribe((res: any) => {
        this.vehicleget = res;
      });
    }
  }
  reset() {
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    this.search();
  }

  onScroll() {

    if (true) {
      let divElement: any = document.getElementsByClassName("ant-table-body")[0];
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
            mContext.clean(mContext.filterObj);
            let req = {...mContext.filterObj};
            req.skip = mContext.pageNumber,
              req.no_of_docs= 10,
              mContext.masterService
                .getAllTripMemo(req)
                .subscribe((data) => {
                  if (data) {
                    if ( data && data.data.length === 0) {
                      mContext.stopScrolling = true;
                    } else {
                      mContext.receivedData = [...mContext.receivedData, ...data.data];
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

  onSearchBillingparty(value: any, type: string): any {
    if (value) {
      let params = new HttpParams()
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      params = params.append(type, value);
      this.masterService.getAllBillingParty({ params }).subscribe((data: any) => {
        if (data) {
          this.billingpartydata = data;
        }
      });
    }
  }
}

