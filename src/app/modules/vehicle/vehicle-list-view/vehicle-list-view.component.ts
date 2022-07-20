import { HttpParams } from '@angular/common/http';
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {faDownload, faEdit, faEye, faFilter, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-vehicle-list-view',
  templateUrl: './vehicle-list-view.component.html',
  styleUrls: ['./vehicle-list-view.component.scss']
})
export class VehicleListViewComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  pageNumber = 2;
  // clickSearch = true;
  faFilter = faFilter;
  isMobFilterVisible = false;
  faPlusSquare = faPlusSquare; // font awesome icons
  faEye = faEye;  // font awesome icons
  faEdit = faEdit; // font awesome icons
  faTrash = faTrash; // font awesome icons
  faDownload = faDownload; // fontawesome icon
  timer: any;
  selectedRowId: any;
  vehicleget:any;
  venderget:any;
  selectedItem:any;
  innerWidth: any;// stores width of any screeen
  screenHeight :any;
  @ViewChild("donwload", { static: false })
  donwloadAnchor!: ElementRef;
  Ownershipfilter = [
    {
      name: "own",
      value: "Own",
    },
    {
      name:"market",
      value:"Market"
    },
    {
      name:"sold",
      value:"Sold"
    }
  ];
  filterObj: { [index: string]: any } = {
    vehicle_reg_no: null,
    ownershipType: null
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
    private modal: NzModalService
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
        tittle:"Add Vehicle",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Details",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
        }
      } ,  
      { 
        tittle:"Delete Vehicle",
        iconName:"fa-trash",
        isVisible:false,
        clickEventMethode:()=>{
          this.showDeleteConfirm(this.selectedItem.vehicle_reg_no);
        }
      }, 
      {
        tittle:"Download",
        iconName:"fa-download",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadReport();
        }
      } 
    ];
    this.commonServ.setNavTittleAndMenu("All Registered Vehicle",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.fetchdata();

  }
  fetchdata(){
    let req = {
      no_of_docs:15,
      skip:1
    }

    this.masterService.getAllVehicle(req).subscribe((data: any) => {
      if (data) {
        this.receivedData = data;
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0]?.addEventListener('scroll',() => {
          this.onScroll();
        } )
      }
    });
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id; 
    this.commonServ.hideShowMenu( ["Delete Vehicle","Edit Details"],true);
  }
  navigateToAdd() {
    this.router.navigateByUrl("home/master/vehicle/upsert/");
  }
  search() {
    this.clean(this.filterObj);
    this.masterService.getAllVehicle({...this.filterObj})
      .subscribe((data: any) => {
        if (data) {
          this.receivedData = data;
        }
      });
  }
  downloadReport() {
    this.clean(this.filterObj);
    this.masterService.getAllVehiclereport({...this.filterObj,download: true}).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
        this.donwloadAnchor.nativeElement.click();
      }
    })
  }

  onSearchvehicle(value: any) {
    this.vehicleget =null;
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
    this.venderget =null;
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
    this.fetchdata();
  }

  onScroll() {

    if (true) {
      let divElement: any = document.getElementsByClassName("ant-table-body")[0] || document.getElementById('myDIV');
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
              req.deleted = false,
              req.no_of_docs = 5
            mContext.masterService
              .getAllVehicle(req)
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
  // go to the edit  page
  navigateToEdit() {
    if (!this.selectedRowId) {
      this.modal.error({
        nzTitle: 'Error',
        nzContent: 'Please select any one row'
      });
      return;
    }
    this.router.navigateByUrl("home/master/vehicle/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

  // delete api
  delete() {
    this.masterService.deletevehicle( this.selectedRowId).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/vehicle');
        this.fetchdata();
      }
    });
  }
  showDeleteConfirm(value: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to Disable<br><b>${value}</b> Registered Vehicle?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>this.delete(),
      nzCancelText: 'Cancel'
    });
  }

}
