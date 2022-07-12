import {Component, Input, OnInit} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {HttpParams} from "@angular/common/http";
import {MasterService} from "../../master.service";
import {FormBuilder} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
import { Modal } from 'ng-zorro-antd-mobile';

@Component({
  selector: 'app-traffic-manager',
  templateUrl: './traffic-manager.component.html',
  styleUrls: ['./traffic-manager.component.scss']
})
export class TrafficManagerComponent implements OnInit {
  @Input () InputData : any;
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  faSearch = faSearch;
  faTrash = faTrash;
  innerWidth: any;
  userData : any;
  tr_mgr:any;
  receivedAllUsers: any;
  tManagerForm: any;
  rawData : any;
  deleteMode: any;
  stopScrolling = false;
  timer: any;
  pageNumber = 2;
  receivedTMangrItem : any;
 selectedTMangrRowId : any;
 tMangListing: any = [];
  searchUser: any;
  filterObj: any = {
  };
  userObj :any = {};
  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private commonService: CommonService
  ) {
    this.tManagerForm = this.fb.group({
      user : [null]
    })
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    console.log(this.InputData);
    if(this.InputData.tr_mgr?.length > 0){
      this.tMangListing = this.InputData.tr_mgr;
    }
  }
  onSubmit(){
    if(!this.tMangListing.length) {
      this.commonService.error("Please select at least one Traffic Manager");
      return;
    }   
      this.masterService.updateTMang(this.InputData._id, {tr_mgr : this.tMangListing}).subscribe((data: any) => {
      });
  }

  searchUsers(value: any){
    if(value) {
      // this.receivedAllUsers = [];
      this.masterService.getUsers({full_name: value, user_type: 'Trip Manager'}).subscribe((res: any) => {
        this.receivedAllUsers = res;
      });
    }
  }
  searchTManager(){
    let params = new HttpParams()
      .set('sort',-1)
      // .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('no_of_docs',  10)
      .set('validate','all');
    // this.clean(this.filterObj);
    this.rawData = this.tManagerForm.get('user').value;
    if(this.rawData)
      this.filterObj._id = this.rawData;

    this.masterService.getUsers({...this.filterObj}).subscribe((res: any) => {
      // console.log('ritika');
      this.userData = res;
      this.userData.forEach((obj: { created_by_name: any; created_at: any; full_name: any; _id: any; }) => {
        this.userObj.assignBy = obj.created_by_name;
        this.userObj.date= obj.created_at ;
        this.userObj.name = obj.full_name ;
        this.userObj.user= obj._id ;
      })

    });
  }
  delete(userId:any , index: any){
    console.log(userId, index+1);
    this.InputData.tr_mgr.splice(index, 1);
    this.deleteMode = true;
  }

  selectTMangrItem(item: any) {
    this.receivedTMangrItem = item;
    this.selectedTMangrRowId = item._id;
  }

  getTmangDataOnScroll(){
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
                  mContext.receivedAllUsers = [...mContext.receivedAllUsers, ...data];
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

  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }

  onselectDropdown(value:any){
    let date=new Date();
    let obj={
      assignBy:value.created_by_name,
      date:date.toISOString(),
      name:value.full_name,
      contact_no:value.contact_no,
      user:value._id
    };
    this.clean(obj);
    this.tMangListing.push(obj);
    console.log(this.tMangListing);
  }

  deleteManager(index: number) {
    this.tMangListing.splice(index, 1);
  }

}
