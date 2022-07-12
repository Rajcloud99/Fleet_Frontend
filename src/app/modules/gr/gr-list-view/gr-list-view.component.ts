import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import {faBan, faEdit, faEye, faFilter, faPlusSquare} from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {StorageService} from "../../../services/storage.service";
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-gr-list-view',
  templateUrl: './gr-list-view.component.html',
  styleUrls: ['./gr-list-view.component.scss']
})
export class GrListViewComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  pageNumber = 2;
  grConfigs:any;
  faPlusSquare = faPlusSquare; // font awesome icons
  faEye = faEye;  // font awesome icons
  faEdit = faEdit; // font awesome icons
  faBan = faBan; // font awesome icons
  faFilter= faFilter;
  timer: any;
  selectedRowId: any;
  vehicleget:any;
  isMobFilterVisible=false;
  venderget:any;
  billingpartydata: any;
  selectedTrip:any;
  innerWidth: any;// stores width of any screeen
  screenHeight :any;
  getCustomerdata:any;
  // Ownershipfilter = [
  //   {
  //     name: "own",
  //     value: "Own",
  //   },
  //   {
  //     name:"market",
  //     value:"Market"
  //   }
  // ];
  filterObj: { [index: string]: any } = {
    vehicle: null,
    // vendor_id:null,
    grNumber:null,
    trip_no:null,
    from:null,
    to:null,
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
    let _moreMenu:MoreMenu[]=[
      {
        tittle:"fiter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.isMobFilterVisible=!this.isMobFilterVisible;
        }
      },
      {
        tittle:"View",
        iconName:"fa-eye",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToDetails();
        }
      },{
        tittle:"Cancel GR",
        iconName:"fa-ban",
        isVisible:false,
        clickEventMethode:()=>{
          this.showDeleteConfirm(this.selectedTrip);
        }
      },
      {
        tittle:"Add GR",
        iconName:"fa-plus-circle",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      }
    ]; 

    this.commonService.setNavTittleAndMenu("All GR",_moreMenu);
	
	
	
    this.grConfigs = this.storageServ.get('userData').configs.GR.config;
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.search();

  }
  selectItem(item: any) {
    this.selectedTrip = item;
    this.selectedRowId = item._id;
   // ["View","Cancel GR","Add GR"]
   
   this.commonService.hideShowMenu( ["Cancel GR","Add GR"],true);
  }
  // go to the edit  page
  navigateToAdd() {
    this.router.navigateByUrl("home/operation/gr/Upsert/" +'Add',{state: this.selectedTrip});
  }
  navigateToEdit() {
    this.router.navigateByUrl("home/operation/gr/Upsert/" + 'Edit',{state: this.selectedTrip});
  }
  navigateToDetails() {
    this.router.navigateByUrl("home/operation/gr/Upsert/" +'Preview',{state: this.selectedTrip});
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

  redirectTrip(d: any) {
    this.router.navigateByUrl("home/operation/trip/" +d._id,{state: d});
    this.commonService.commonUsed.next({ name: 'backButton', value: true });
  }
  
  search() {
    this.clean(this.filterObj);
    let request = {...this.filterObj}
      request.dateType = 'grDate',
      request.no_of_docs= 10,
      request.gr_type= {$nin: ["Trip Memo","Covering Builty"]}
      request.populate= ["provisionalBill"],
      request.skip= 1,
      request.sort= {grDate: -1},
      request.source= 'GR',
      request.tableId= false,
    this.masterService.getAllGr(request)
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
  onSearchvender(value: any) {
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

  reset() {
    // this.clickSearch = true;
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
              req.dateType = 'grDate',
              req.no_of_docs= 10,
              req.populate= ["provisionalBill"],
              req.sort= {grNumber: 1},
              req.source= 'GR',
              req.tableId= false,
            mContext.masterService
              .getAllGr(req)
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
// cancel gr
  cancelGR(selectedtrip:any) {
    let isCancelledGr = false;
    if (selectedtrip && selectedtrip.moneyReceipt) {
      selectedtrip.moneyReceipt.collection.forEach((obj: any)=> {
        if (obj.paymentId)
          isCancelledGr = true;
      });
    }
    if (isCancelledGr) {
      this.commonService.error("Can`t Cancel Payment link to MR");
      return
    } else {
      this.masterService.CancelGr(selectedtrip._id).subscribe((data: any) => {
        if (data) {
          this.billingpartydata = data;
          this.router.navigateByUrl('home/operation/gr');
          this.search();
        }

      });
    }
  }

  showDeleteConfirm(trip:any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to Cancel this Gr?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>this.cancelGR(trip),
      nzCancelText: 'Cancel'
    });
  }

}
