import {Component, HostListener, OnInit} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MasterService} from "../../master.service";
import {HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-customer-list-view',
  templateUrl: './customer-list-view.component.html',
  styleUrls: ['./customer-list-view.component.scss']
})
export class CustomerListViewComponent implements OnInit {
  isMobFilterVisible = false;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faTrash  = faTrash;
  faSearch = faSearch;
  faTimes = faTimes;
  faFilter = faFilter;
  innerWidth: any;
  receivedData: any;
  selectedItem: any;
  selectedRowId: any;
  stopScrolling = false;
  timer: any;
  pageNumber = 2;
  screenHeight:any;

  filterObjType = {
    category : null,
    name : null,
    city : null,
    state : null,
    type : null,
    address : null,
    gstin_no : null
  }
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  scrollTable!: HTMLCollectionOf<Element>;
  constructor(
    private masterService: MasterService,
    private commonServ : CommonService,
    private router: Router,
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
        tittle:"Add Customer",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.gotoAddCustomer();
        }
      } ,
      {
        tittle:"Edit Customer",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateTo();
        }
      } 
    ];
    this.commonServ.setNavTittleAndMenu("Customer",_moreMenu);

    
    this.search();
    this.innerWidth = window.innerWidth;
  }

  navigateTo() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/master/customer/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

  search () {
    this.clean(this.filterObjType);
    this.masterService.getAllCustomer({no_of_docs: 10, skip:1,...this.filterObjType}).subscribe((res: any) => {
      this.receivedData = res;
      if(res){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        // console.log("seracht" + this.scrollTable);
        this.scrollTable[0]?.addEventListener('scroll',() => {
          // console.log('scroll');
          this.getDataOnScroll();
        });
      }

    });
  }

  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    // return obj;
  }

  reset(){
    this.filterObjType.name = null;
    this.search();
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    this.commonServ.hideShowMenu(["Edit Customer"],true);
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any = document.getElementsByClassName('ant-table-body')[0] ||document.getElementById('myDIV');
      // console.log('divElement', divElement);
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllCustomer({ no_of_docs: 10, skip: mContext.pageNumber,
              ...this.filterObjType }).subscribe(data => {
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

  gotoAddCustomer(){
    this.router.navigateByUrl('/home/master/customer/add');
  }

  delete(){}
}
