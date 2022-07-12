import {Component, HostListener, OnInit} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {CommonService} from "../../../services/common.service";
import {Router} from "@angular/router";
import {MasterService} from "../../master.service";
import {HttpParams} from "@angular/common/http";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-material-list-view',
  templateUrl: './material-list-view.component.html',
  styleUrls: ['./material-list-view.component.scss']
})
export class MaterialListViewComponent implements OnInit {

  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faTrash  = faTrash;
  faSearch = faSearch;
  faTimes = faTimes;
  faFilter = faFilter;
  innerWidth: any;
  receivedData: any;
  receivedGroupData: any;
  selectedItem: any;
  selectedRowId: any;
  selectedGroupItem: any;
  selectedGroupRowId: any;
  stopScrolling = false;
  stopScrollingGroup = false;
  timer: any;
  groupTimer: any;
  pageNumber = 2;
  groupPageNumber = 2;
  loadingObservable = this.commonServ.loadingObservable;
  filterObj = {
    name : ''
  };
  isMobFilterVisible = false;
  filterObjType = {
    material : null,
    hsnCode : null,
    sacCode : null
  }
  scrollTable!: HTMLCollectionOf<Element>;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  receivedAllBranches: any;
  constructor(
    private masterService: MasterService,
    private commonServ : CommonService,
    private router: Router,
    private modal: NzModalService
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
        tittle:"Add Material Type",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.gotoAddMaterialType();
        }
      } ,
      {
        tittle:"Edit Material Type",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateTo();
        }
      }  
     
      ,
        {
          tittle:"Delete Material Type",
          iconName:"fa-trash",
          isVisible:false,
          clickEventMethode:()=>{
            this.delete()
          }
        } 
      //uploadDocumentModel["Delete Material Type","Edit Material Type"]
    ];
   // showDeleteConfirm(this.selectedItem.name)
    this.commonServ.setNavTittleAndMenu("Material Type",_moreMenu);

    this.innerWidth = window.innerWidth;
    this.search();
    // this.searchGroup();
    // this.getDataOnScroll();
    // this.getGroupOnScroll();
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    this.commonServ.hideShowMenu(  ["Delete Material Type","Edit Material Type"],true);
  }

  selectGroupItem(item: any) {
    this.selectedGroupItem = item;
    this.selectedGroupRowId = item._id;
  }

  search () {
    let params = new HttpParams()
      .set('sort',-1)
      .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('validate','all');
     this.clean(this.filterObjType);
    this.masterService.getAllMaterial({...this.filterObjType}).subscribe((res: any) => {
      this.receivedData = res;
      if(res){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        // console.log("seracht" + this.scrollTable);
        this.scrollTable[0].addEventListener('scroll',() => {
          // console.log('scroll');
          this.getDataOnScroll();
        });
      }

    });
  }

  searchGroup(){
    let params = new HttpParams()
      .set('sort',-1)
      // .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('validate','all');
    this.masterService.getAllMaterialType({...this.filterObj}).subscribe((res: any) => {
      this.receivedGroupData = res;
      if(res){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0].addEventListener('scroll',() => {
          this.getGroupOnScroll();
        });
      }
    });
  }

  navigateTo() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/master/material/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

  navigateTo_Card(data:any){
    this.router.navigateByUrl("home/master/material/card/" + data._id,{state: data} );
  }

  navigateToGroup() {
    if (!this.selectedGroupRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/master/materialGroup/upsert/" + this.selectedGroupRowId,{state: this.selectedGroupItem});
  }

  gotoAddMaterialType(){
    this.router.navigateByUrl('/home/master/material/upsert');
  }

  delete() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }

    this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: '',
      nzOnOk: () => {
        this.masterService.deleteMaterial(this.selectedRowId,{'deleted':true,_id: this.selectedRowId}).subscribe((data: any) => {
          if (data) {
            this.search();
            this.router.navigateByUrl('home/master/material');
          }
        });
      }

    });



  }

  deleteGroup(){
    if (!this.selectedGroupRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }

    this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: '',
      nzOnOk: () => {
        this.masterService.deleteGroupMaterial(this.selectedGroupRowId,{'deleted':true,_id: this.selectedGroupRowId}).subscribe((data: any) => {
          if (data) {
            this.searchGroup();
            this.router.navigateByUrl('home/master/material');
          }
        });
      }

    });



  }

  // onSearch(value: any) {}
  reset(){
    this.filterObjType.material = null;
    this.filterObjType.hsnCode = null;
    this.filterObjType.sacCode = null;
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

  getDataOnScroll() {
    if (true) {
        let divElement: any = document.getElementsByClassName('ant-table-body')[0] ||document.getElementById('myDIVCard');
      // console.log('divElement', divElement);
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllMaterial({ no_of_docs: 10, skip: mContext.pageNumber,
               ...this.filterObjType }).subscribe(data => {
              if (data) {
                if (data.length=== 0) {
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

  getGroupOnScroll() {
    if (true) {
      let divElement: any = document.getElementById('myDIV');
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrollingGroup === false) {
          if (this.groupTimer) {
            clearTimeout(this.groupTimer);
          }
          const mContext = this;
          this.groupTimer = setTimeout( ()=> {
            mContext.masterService.getAllMaterialType({ no_of_docs: 10, skip: mContext.groupPageNumber,
              name: this.filterObj.name }).subscribe(data => {
              if (data) {
                if (data.length=== 0) {
                  mContext.stopScrollingGroup = true;
                } else {
                  mContext.receivedGroupData = [...mContext.receivedGroupData, ...data];
                  mContext.groupPageNumber = mContext.groupPageNumber + 1;
                }
              }
              return;
            });
          }, 400);
        }
      }
    }
  }

  gotoAddMaterialGroup(){
    this.router.navigateByUrl('/home/master/materialGroup/upsert');
  }
}
