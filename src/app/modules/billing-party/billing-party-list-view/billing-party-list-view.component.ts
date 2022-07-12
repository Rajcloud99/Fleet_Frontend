import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from '../../../services/common.service';
import { HttpParams } from '@angular/common/http';
import { MasterService } from '../../master.service';
import {
  faPlusSquare,
  faEye,
  faEdit,
  faSearch,
  faTrash,
  faTimes,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { ConstantService } from 'src/app/services/constant.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';


@Component({
  selector: 'app-billing-party-list-view',
  templateUrl: './billing-party-list-view.component.html',
  styleUrls: ['./billing-party-list-view.component.scss']
})
export class BillingPartyListViewComponent implements OnInit {

  receivedData: any; // store the data
  receivedBillingParty: any;
  parentName = 'billingParty';
  stopScrolling = false;
  pageNumber = 2;
  clickSearch = true;
  timer: any;
  selectedRowId: any;
  selectedItem: any;
  faPlusSquare = faPlusSquare;
  faEye = faEye;
  faEdit = faEdit;
  faSearch = faSearch;
  faTrash = faTrash;
  faTimes = faTimes;
  faFilter= faFilter;
  innerWidth: any; 
  aGSTstates: any;
  isMobFilterVisible=false;

  filterObj: { [index: string]: any } = {
    // filter obj
    name: null,
    address: null,
    state_name: null,
    from: null,
    to: null,
  };
  

  scrollTable!: HTMLCollectionOf<Element>;
  

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private modal: NzModalService,
    private masterService: MasterService,
    private constantService: ConstantService,
    private commonServ: CommonService
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
        tittle:"Add Billing Party",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Billing Party",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
        }
      } ,  
      {
        tittle:"Delete Billing Party",
        iconName:"fa-trash",
        isVisible:false,
        clickEventMethode:()=>{
          this.showDeleteConfirm(this.selectedItem.vehicle_reg_no);
        }
      }, 
       
    ];
    this.commonServ.setNavTittleAndMenu("All Billing Party",_moreMenu);



    this.aGSTstates = this.constantService.constants.aGSTstates;
    this.innerWidth = window.innerWidth;
    let params = new HttpParams()
      .set('sort', -1)
      .set('deleted', false)
      .set('no_of_docs', 15)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all');
    this.masterService.getAllBillingParty({ params }).subscribe((data: any) => {
      if (data) {
        this.receivedData = data;
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0].addEventListener('scroll',() => {
          console.log('scroll');
          this.onScroll();
        } )
      }
    });
  }

  onChangeSearch(value: any, type: string): any {
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
          this.receivedBillingParty = data;
        }
      });
    }
  }

  onScroll() {
    if (this.clickSearch) {
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
            let params = new HttpParams()
              .set('sort', -1)
              .set('skip', mContext.pageNumber)
              .set('deleted', false)
              .set('no_of_docs', 15)
              .set(
                'request_id',
                Date.now() + '' + Math.round(Math.random() * 100)
              )
              .set('validate', 'all');
            mContext.masterService
              .getAllBillingParty({ params })
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


  showDeleteConfirm(value: any): void {
    this.modal.confirm({
      nzTitle: `Are you sure you want to delete?`,
      nzContent: `Click Yes to delete <b>${value}</b>.`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>this.delete(),
      nzCancelText: 'Cancel'
    });
  }

  search(): any {
    delete this.selectedRowId;
    let params = new HttpParams()
      .set('sort', -1)
      .set('no_of_docs', 15)
      .set('deleted', false)
      .set('skip', 1)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all');
    this.clean(this.filterObj);
    for (let propName in this.filterObj) {
      params = params.append(propName, this.filterObj[propName]);
    }
    this.masterService.getAllBillingParty({ params }).subscribe((data: any) => {
      if (data.length) {
        this.receivedData = data;
        this.clickSearch = false;
      }else {this.receivedData = null;}
    });
  }

  delete() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.masterService
      .deleteBillingParty(this.selectedRowId, {
        deleted: true,
        _id: this.selectedRowId,
      })
      .subscribe((data: any) => {
        if (data) {
          this.search();
          this.router.navigateByUrl('home/master/billingParty');
        }
      });
  }

  reset() {
    this.clickSearch = true;
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
      delete this.selectedRowId;
    }
    this.search();
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

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
   
   this.commonServ.hideShowMenu( ["Delete Billing Party","Edit Billing Party"],true);
  }

  navigateToEdit() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.router.navigateByUrl(
      'home/master/billingParty/upsert/' + this.selectedRowId,
      { state: this.selectedItem }
    );
    // this.commonServ.commonUsed.next({ name: "backButton", value: true });
  }

  navigateToAdd() {
    this.router.navigateByUrl('home/master/billingPartyUpsert');
  }

  navigateToDetailView() {
    this.router.navigateByUrl('home/master/billingParty/view');
  }

}
