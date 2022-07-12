import {
  Component,
  OnInit,
  HostListener,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from '../../../services/common.service';
import { HttpParams } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  faPlusSquare,
  faEdit,
  faSearch,
  faTrash,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { StorageService } from 'src/app/services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';


@Component({
  selector: 'app-transport-route-list-view',
  templateUrl: './transport-route-list-view.component.html',
  styleUrls: ['./transport-route-list-view.component.scss']
})
export class TransportRouteListViewComponent implements OnInit {
  receivedData: any; // store the data
  parentName = 'transport-route';
  stopScrolling = false;
  pageNumber = 2;
  clickSearch = true;
  timer: any;
  selectedRowId: any;
  selectedItem: any;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faSearch = faSearch;
  faTrash = faTrash;
  faFilter= faFilter;
  innerWidth: any; // stores width of any screeen
  confirmModal?: NzModalRef;
  configs: any; 
  isMobFilterVisible=false;
  filterObj: { [index: string]: any } = {
    from: null,
    to: null,
    name:null
  };
  scrollTable!: HTMLCollectionOf<Element>;
  receivedDocument: any;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private router: Router,
    private http: HttpClient,
    private modalService: NzModalService,
    private masterService: MasterService,
    private storageServ: StorageService,
    private msg: NzMessageService,
    private commonServ: CommonService
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
        tittle:"Add Route",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAdd();
        }
      } ,
      {
        tittle:"Edit Route",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToEdit();
        }
      }  
     
      ,
       
      //uploadDocumentModel["Delete Material Type","Edit Material Type"]
    ];
   // showDeleteConfirm(this.selectedItem.name)
    this.commonServ.setNavTittleAndMenu("Transport Route",_moreMenu);

    this.innerWidth = window.innerWidth;
    this.configs = this.storageServ.get('userData').configs;
    this.search();
  }

  onChangeSearch(name:any){
    this.filterObj.name=name;
    this.search();
  }

  search () {
    let reqParam={
      deleted: false,
      from: this.filterObj.from,
      to: this.filterObj.to,
      no_of_docs: 15,
      name:this.filterObj.name,
      skip:1
    }
    this.clean(reqParam);

    this.masterService.getAllTransportRoutes(reqParam).subscribe((res: any) => {
      if(res) {
        this.receivedData = res;
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0]?.addEventListener('scroll',() => {
        this.onScroll();
      } )
      }

    });
}

  // showDeleteConfirm(value: any): void {
  //   this.modalService.confirm({
  //     nzTitle: `Are you sure you want to delete?`,
  //     nzContent: `Click Yes to delete <b>${value}</b>.`,
  //     nzOkText: 'Yes',
  //     nzOkType: 'primary',
  //     nzOkDanger: true,
  //     nzOnOk: () => this.delete(),
  //     nzCancelText: 'Cancel',
  //   });
  // }
  

  onScroll() {
    if (this.clickSearch) {
      let divElement: any =
        document.getElementsByClassName('ant-table-body')[0];
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
            
            let reqParam={
              deleted: false,
              from: mContext.filterObj.from,
              to: mContext.filterObj.to,
              no_of_docs: 15,
              skip:mContext.pageNumber
            }
            mContext.clean(reqParam);

            mContext.masterService
              .getAllTransportRoutes(reqParam)
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
    this.commonServ.hideShowMenu( ["Edit Route"],true);
  }

  navigateToEdit() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.router.navigateByUrl(
      'home/master/transportRoute/upsert/' + this.selectedRowId,
      { state: this.selectedItem }
    );
  }

  navigateToAdd() {
    this.router.navigateByUrl('home/master/transportRouteUpsert');
  }

}
