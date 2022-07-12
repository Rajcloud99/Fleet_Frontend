import {Component, HostListener, OnInit} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MasterService} from "../../master.service";
import {CommonService} from "../../../services/common.service";
import {Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";
import {HttpParams} from "@angular/common/http";
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

@Component({
  selector: 'app-material-group-list-view',
  templateUrl: './material-group-list-view.component.html',
  styleUrls: ['./material-group-list-view.component.scss']
})
export class MaterialGroupListViewComponent implements OnInit {

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
  isMobFilterVisible = false;
  loadingObservable = this.commonServ.loadingObservable;
  filterObj = {
    name : null,
    code: null
  };
  filterObjType = {
    material : ''
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
        tittle:"Add Material Group",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.gotoAddMaterialGroup();
        }
      } ,
      {
        tittle:"Edit Material Group",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateToGroup();
        }
      }  
     
      ,
        {
          tittle:"Delete Material Group",
          iconName:"fa-trash",
          isVisible:false,
          clickEventMethode:()=>{
            this.deleteGroup()
          }
        } 
      //uploadDocumentModel["Delete Material Type","Edit Material Type"]
    ];
   // showDeleteConfirm(this.selectedItem.name)
    this.commonServ.setNavTittleAndMenu("Material Group",_moreMenu);

    this.innerWidth = window.innerWidth;
    // this.search();
    this.searchGroup();
    // this.getDataOnScroll();
    // this.getGroupOnScroll();
  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
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
    this.masterService.getAllMaterial({...this.filterObjType}).subscribe((res: any) => {
      this.receivedData = res;
      if(res){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        console.log("seracht" + this.scrollTable);
        this.scrollTable[0].addEventListener('scroll',() => {
          console.log('scroll');
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
    this.clean(this.filterObj);
    this.masterService.getAllMaterialType({...this.filterObj}).subscribe((res: any) => {
      // console.log('ritika');
      this.receivedGroupData = res;
      if(res){
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0].addEventListener('scroll',() => {
          this.getGroupOnScroll();
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
    // return obj
  }

  navigateTo() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/master/material/upsert/" + this.selectedRowId,{state: this.selectedItem});
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
    this.filterObj.code = null;
    this.filterObj.name= null;
    this.searchGroup();
  }
  getDataOnScroll() {
    if (true) {
      let divElement: any = document.getElementById('myDIV11');
      console.log('divElement', divElement);
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
      let divElement: any = document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
      // console.log('some',divElement);
      // console.log(divElement.scrollTop, divElement.clientHeight, divElement.scrollHeight);
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrollingGroup === false) {
          if (this.groupTimer) {
            clearTimeout(this.groupTimer);
          }
          const mContext = this;
          this.groupTimer = setTimeout( ()=> {
            mContext.masterService.getAllMaterialType({ no_of_docs: 10, skip: mContext.groupPageNumber,
              ...this.filterObj }).subscribe(data => {
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
