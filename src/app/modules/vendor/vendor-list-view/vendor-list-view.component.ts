import { HttpParams } from '@angular/common/http';
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {faDownload, faEdit, faEye, faFilter, faPlusSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-vendor-list-view',
  templateUrl: './vendor-list-view.component.html',
  styleUrls: ['./vendor-list-view.component.scss']
})
export class VendorListViewComponent implements OnInit {
  receivedData: any;
  stopScrolling = false;
  pageNumber = 2;
  // clickSearch = true;
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
  isMobFilterVisible = false;
  faFilter = faFilter;
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
    }
  ];
  filterObj: { [index: string]: any } = {
    name: null,
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
        tittle:"Add Vendor",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Vendor",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
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
          tittle:"Delete Vendor",
          iconName:"fa-trash",
          isVisible:false,
          clickEventMethode:()=>{
            this.showDeleteConfirm(this.selectedItem.name)
          }
        } 
      //uploadDocumentModel["Delete Vendor",Edit Vendor]
    ];
   // showDeleteConfirm(this.selectedItem.name)
    this.commonServ.setNavTittleAndMenu("All Vendors",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.search();

  }
  // fetchdata(){
  //   let req = {
  //     no_of_docs:15,
  //     skip:1
  //   }
  //
  //   this.masterService.getAllVehicle(req).subscribe((data: any) => {
  //     if (data) {
  //       this.receivedData = data;
  //       this.scrollTable = document.getElementsByClassName("ant-table-body");
  //       this.scrollTable[0].addEventListener('scroll',() => {
  //         console.log('scroll');
  //         this.onScroll();
  //       } )
  //     }
  //   });
  // }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    this.commonServ.hideShowMenu(  ["Delete Vendor",'Edit Vendor'],true);
   
  }
  navigateToAdd() {
    this.router.navigateByUrl("home/master/vendor/upsert/");
  }
  search() {
    this.clean(this.filterObj);
    this.masterService.getAllvender({...this.filterObj,no_of_docs:15,skip:1})
      .subscribe((data: any) => {
        if (data) {
          this.receivedData = data;
          this.scrollTable = document.getElementsByClassName("ant-table-body");
          this.scrollTable[0]?.addEventListener('scroll',() => {
            console.log('scroll');
            this.onScroll();
          } )
        }
      });
  }
  downloadReport() {
    this.clean(this.filterObj);
    this.masterService.getAllvender({...this.filterObj,download: true,sort: {name: 1}}).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
        this.donwloadAnchor.nativeElement.click();
      }
    })
  }

  // onSearchvehicle(value: any) {
  //   this.vehicleget =null;
  //   if(value) {
  //     let req = {
  //       vehicle_no: value,
  //       no_of_docs: 5,
  //     }
  //     this.masterService.getAllVehicle(req).subscribe((res: any) => {
  //       this.vehicleget = res;
  //     });
  //   }
  // }
  // onSearchvender(value: any) {
  //   this.venderget =null;
  //   if(value) {
  //     let req = {
  //       name: value,
  //       no_of_docs: 5,
  //       deleted: false
  //
  //     }
  //     this.masterService.getAllvender(req).subscribe((res: any) => {
  //       this.venderget = res;
  //     });
  //   }
  // }

  reset() {
    // this.clickSearch = true;
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    this.search();
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
              .getAllvender(req)
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
    this.router.navigateByUrl("home/master/vendor/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

  // delete api
  delete() {
    this.masterService.deletevendor( this.selectedRowId).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/vendor');
        this.search();
      }
    });
  }
  showDeleteConfirm(value: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to Delete<br><b>${value}</b> Vendor?`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>this.delete(),
      nzCancelText: 'Cancel'
    });
  }

}

