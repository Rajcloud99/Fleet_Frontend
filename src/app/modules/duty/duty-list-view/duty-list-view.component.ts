import {Component, HostListener, OnInit, ViewContainerRef} from '@angular/core';
import {faFilter, faPlusSquare, faPlusCircle, faEdit, faUser, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {HttpParams} from "@angular/common/http";
import {MasterService} from "../../master.service";
import { StorageService } from 'src/app/services/storage.service';
import {ActivatedRoute, Router} from "@angular/router"
import {CommonService} from "../../../services/common.service";
import {VehicleUpsertComponent} from "../../vehicle/vehicle-upsert/vehicle-upsert.component";
import {NzModalService} from "ng-zorro-antd/modal";
import {TrafficManagerComponent} from "../traffic-manager/traffic-manager.component";
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';


@Component({
  selector: 'app-duty-list-view',
  templateUrl: './duty-list-view.component.html',
  styleUrls: ['./duty-list-view.component.scss']
})
export class DutyListViewComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faPlusCircle = faPlusCircle;
  faEdit = faEdit;
  faUser = faUser;
  faSearch = faSearch;
  faTimes = faTimes;
  isMobFilterVisible = false;
  faFilter = faFilter;
  innerWidth: any;
  receivedDutyData : any;
  stopScrolling = false;
  receivedDutyItem: any;
  selectedDutyRowId:any;
  receivedAllCustomers: any;
  customer: any;
  timer: any;
  logInUser : any;
  pageNumber = 2;
  filterObj: any = {
    customer_id : null
  };

  scrollTable!: HTMLCollectionOf<Element>;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private router: Router,
    private storageService: StorageService,
    private commonServ : CommonService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) { }

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
        tittle:"Add Trip",
        iconName:"fa-plus-circle",
        isVisible:false,
        clickEventMethode:()=>{
          this.addTrip();
        }
      },{
        tittle:"Add Duty",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.addDuty();
        }
      },{
        tittle: "Edit Duty",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToDuty();
        }
      },
      { 
        tittle:"Edit User",
        iconName:"fa-user ",
        isVisible:false,
        clickEventMethode:()=>{
          this.gotoTrafficManager();
        }
      }
    ]; 
 

    this.commonServ.setNavTittleAndMenu("DUTY",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.logInUser = this.storageService.get('userData').user;
    this.searchDuty();
  }

  searchDuty(){
    let params = new HttpParams()
      .set('sort',-1)
      // .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('no_of_docs',  10)
      .set('validate','all');
    this.clean(this.filterObj);
    if(this.customer)
      this.filterObj.customer_id = this.customer._id;

    // if(this.logInUser && this.logInUser.user_type && this.logInUser.user_type.length){
    //   if(this.logInUser.user_type.indexOf('Trip Manager') + 1)
    //     this.filterObj.user = this.logInUser._id;
    // }

    this.masterService.getAllBooking({...this.filterObj}).subscribe((res: any) => {
      // console.log('ritika');
      this.receivedDutyData = res;
      if(res.length){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0].addEventListener('scroll',() => {
          this.getDataOnScroll();
        });
      }else{
        this.commonServ.error('No Duty Found For ' + this.logInUser.full_name);
      }
    });
  }

  reset(){
    this.filterObj. customer_id = null;
    delete this.customer;
    this.searchDuty();
  }

  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    // return obj
  }

  onSearchCustomer(value: any) {
    if(value.length < 2) return;
    if(value) {
      let params = new HttpParams()
        .set('name', value)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      this.masterService.getAllCustomers({params}).subscribe((res:any) => {
        this.receivedAllCustomers = res;
      });
    }
  }

  getDataOnScroll(){
    if (true) {
      let divElement: any = document.getElementById('myDIVCard');
      console.log('divElement', divElement);
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllBooking({ no_of_docs: 10, skip: mContext.pageNumber,
              ...this.filterObj }).subscribe(data => {
              if (data) {
                if (data.length=== 0) {
                  mContext.stopScrolling = true;
                } else {
                  mContext.receivedDutyData = [...mContext.receivedDutyData, ...data];
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

  selectBookingItem(item: any) {
    this.receivedDutyItem = item;
    this.selectedDutyRowId = item._id; 
    this.commonServ.hideShowMenu(["Edit User","Edit Duty","Add Trip"],true);
  }

  addTrip() {
    if (!this.selectedDutyRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    console.log('ID  ' + this.selectedDutyRowId);
    this.router.navigateByUrl('home/operation/tripGPS',{state: this.receivedDutyItem});
    console.log('ID2  ' + this.selectedDutyRowId);
  }

  addDuty(){
    this.router.navigateByUrl('home/operation/duty/dutyUpsert',{state: this.receivedDutyItem});
  }

  navigateToDuty() {
    if (!this.selectedDutyRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/operation/duty/dutyUpsert/" + this.selectedDutyRowId,{state: this.selectedDutyRowId});
  }

  gotoTrafficManager(){
    if (!this.selectedDutyRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    // this.router.navigateByUrl('home/operation/duty/trafficManager',{state: this.receivedDutyItem});

    const modal = this.modal.create({
      nzTitle: 'Add/Update Traffic Manager',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: TrafficManagerComponent,
      nzComponentParams: {
        InputData : this.receivedDutyItem
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            // modal.destroy();
          }
        }
      ]
    });
  }
}
