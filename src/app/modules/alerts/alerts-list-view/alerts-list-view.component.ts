import { Component, OnInit, HostListener } from '@angular/core';
import {MasterService} from "../../master.service";
import {faFilter, faPlusSquare, faPlusCircle, faEdit, faUser, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {HttpParams} from "@angular/common/http";
import { CommonService } from 'src/app/services/common.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';


@Component({
  selector: 'app-alerts-list-view',
  templateUrl: './alerts-list-view.component.html',
  styleUrls: ['./alerts-list-view.component.scss']
})
export class AlertsListViewComponent implements OnInit {
  faPlusSquare = faPlusSquare;
  faTimes = faTimes;
  faSearch = faSearch;
  faFilter = faFilter;
  stopScrolling = false;
  isMobFilterVisible = false;
  timer: any;
  receivedAlertsData: any;
  pageNumber = 1;
  receivedAlerts : any;
  selectedAlertsRowId : any;
  innerWidth: any;
  filterObj: any = {
    reg_no : null,
    datetime : null,
    'location.address' : null
  };
  scrollTable!: HTMLCollectionOf<Element>;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private masterService: MasterService,
    private commonService:CommonService
  ) {

  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    let _moreMenu:MoreMenu[]=[
      {
        tittle:"fiter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.isMobFilterVisible = true;
        }
      },
    ];

    this.commonService.setNavTittleAndMenu("Alerts",_moreMenu);
    this.search();
  }

  search () {
      this.filterObj.skip = 1;
      this.filterObj.no_of_docs = 15;
      this.filterObj.row_count = 8;
    this.clean(this.filterObj);
    this.masterService.getAllAlerts({...this.filterObj}).subscribe((res: any) => {
      if(res){
        this.receivedAlertsData = res;
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0]?.addEventListener('scroll',() => {
        this.getDataOnScroll();
      });
      }

    });
  }

  getDataOnScroll(){
    if (true) {
      let divElement: any = document.getElementsByClassName('ant-table-body')[0];
      // console.log('divElement', divElement);
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllAlerts({ no_of_docs: 15, skip: mContext.pageNumber,
              ...this.filterObj }).subscribe(data => {
              if (data) {
                if (data.length=== 0) {
                  mContext.stopScrolling = true;
                } else {
                  mContext.receivedAlertsData = [...mContext.receivedAlertsData, ...data];
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

  selectAlerts(item: any) {
    this.receivedAlerts = item;
    this.selectedAlertsRowId = item._id;
  }

  reset(){
    this.filterObj.reg_no = null;
    this.filterObj.datetime = null;
    this.filterObj.location = {
      address : null
    }
    this.search();
  }
  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
    // return obj;
  }


  addTrip(){}
}
