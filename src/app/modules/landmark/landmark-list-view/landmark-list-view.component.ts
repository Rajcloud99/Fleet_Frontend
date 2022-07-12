import { HttpParams } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import {faBan, faEdit, faEye, faFilter, faPlusSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import {StorageService} from "../../../services/storage.service";
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-landmark-list-view',
  templateUrl: './landmark-list-view.component.html',
  styleUrls: ['./landmark-list-view.component.scss']
})
export class LandmarkListViewComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  pageNumber = 2;
  grConfigs:any;
  faEye = faEye;  // font awesome icons
  faEdit = faEdit; // font awesome icons
  faPlusSquare = faPlusSquare;
  faFilter= faFilter;
  faTrash =faTrash;
  timer: any;
  selectedRowId: any;
  vehicleget:any;
  isMobFilterVisible=false;
  billingpartydata: any;
  selectedData:any;
  innerWidth: any;// stores width of any screeen
  screenHeight :any;
  getCustomerdata:any;
  filterObj: { [index: string]: any } = {
    name:null,
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
          this.isMobFilterVisible = !this.isMobFilterVisible;
        }
      },
      {
        tittle:"Add Landmark",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Landmark",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
        }
      } ,
      {
        tittle:"View Landmark",
        iconName:"fa-eye",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToDetails();
        }
      }
      ,
      {
        tittle:"Delete Landmark",
        iconName:"fa-trash",
        isVisible:false,
        clickEventMethode:()=>{
          this.deletelandMark(this.selectedData);
        }
      }
    ];

    this.commonService.setNavTittleAndMenu("All Landmark",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.search();

  }
  selectItem(item: any) {
    this.selectedData = item;
    this.selectedRowId = item._id;
    this.commonService.hideShowMenu(["Edit Landmark","View Landmark","Delete Landmark"],true);
  }
  // go to add landmark page
  navigateToAdd() {
    this.router.navigateByUrl("home/tracking/landmark/Upsert/" + 'Add', {state: this.selectedData});
  }
  // go to the edit  page
  navigateToEdit() {
    this.router.navigateByUrl("home/tracking/landmark/Upsert/" + 'Edit', {state: this.selectedData});
  }
  navigateToDetails() {
    this.router.navigateByUrl("home/tracking/landmark/Upsert/" +'Preview',{state: this.selectedData});
  }
  deletelandMark(data:any){
   if(!data){
     this.commonService.error('Please Select any Row');
     return;
   }else{
     this.masterService
       .DeleteLandMark(data)
       .subscribe((data: any) => {
         if (data) {
           this.search();

         }
       });

   }

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
    request.no_of_docs= 20,
      request.row_count= 20,
      this.masterService.getAllLandmark(request)
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
                .getAllLandmark(req)
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

