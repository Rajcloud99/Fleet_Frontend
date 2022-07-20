import {Component, HostListener, OnInit} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {MasterService} from "../../master.service";
import {CommonService} from "../../../services/common.service";
import {StorageService} from "../../../services/storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-sensor-list-view',
  templateUrl: './sensor-list-view.component.html',
  styleUrls: ['./sensor-list-view.component.scss']
})
export class SensorListViewComponent implements OnInit {
  faFilter = faFilter;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  faTrash = faTrash;
  faSearch = faSearch;
  innerWidth: any;
  isMobFilterVisible = false;
  stopScrolling = false;
  timer: any;
  pageNumber = 2;
  receivedData: any;
  selectedItem: any;
  selectedRowId: any;
  filterObjType = {

  }
  loadingObservable = this.commonServ.loadingObservable;
  scrollTable!: HTMLCollectionOf<Element>;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private masterService: MasterService,
    private commonServ : CommonService,
    private storageService: StorageService,
    private router: Router,
    private modal: NzModalService,
  ) { }

  ngOnInit(): void {
    this.search();
    this.innerWidth = window.innerWidth;
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
            mContext.masterService.getAllSensorData({ no_of_docs: 10, skip: mContext.pageNumber,
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

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    this.commonServ.hideShowMenu(  ["Delete Material Type","Edit Material Type"],true);
  }

  addSensor(){
    this.router.navigateByUrl('/home/tracking/sensor/upsert');
  }

  navigateTo(){
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("/home/tracking/sensor/upsert/" + this.selectedRowId,{state: this.selectedItem});
    // this.router.navigateByUrl('/home/tracking/sensor/upsert');
  }
  delete(){
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.modal.confirm({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: '',
      nzOnOk: () => {
        this.masterService.deleteSensor(this.selectedRowId,{'deleted':true,_id: this.selectedRowId}).subscribe((data: any) => {
          if (data) {
            this.search();
            this.router.navigateByUrl('home/tracking/sensor');
          }
        });
      }

    });
  }
  search(formData?: any){
   let request = {}
    // formData = formData || {};
    // formData.type_url = 'gps_url';
    // formData.user_id = this.storageService.get('userData').client_config.gpsId;
    this.masterService.getAllSensorData(request).subscribe((data: any) => {
      console.log(data);
      this.receivedData = data;
      if (data) {
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0].addEventListener('scroll',() => {
          this.getDataOnScroll();
        });

        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/tracking/sensor');
      }
    });
  }

  reset(){}
}
