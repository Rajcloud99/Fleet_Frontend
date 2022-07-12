import { Component, HostListener, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MasterService } from '../../master.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';
import { faEdit, faPlusSquare, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-alarm-list-view',
  templateUrl: './alarm-list-view.component.html',
  styleUrls: ['./alarm-list-view.component.scss']
})
export class AlarmListViewComponent implements OnInit {
  innerWidth: any;
  receivedData: any;
  scrollTable!: HTMLCollectionOf<Element>;
  stopScrolling = false;
  timer: any;
  filterObj: any = {};
  pageNumber = 1;
  selectedRowId : any;
  vehData: any;
  vehDataCopy: any;
  faTimes = faTimes;
  faSearch = faSearch;
  faPlusSquare = faPlusSquare;
  faEdit = faEdit;
  typeList = [ 
  {
    "label": 'All Alerts',
    "value": ''
  },{
    "label": 'Geofence Alerts',
    "value": 'geofence'
  },{
    "label": 'Overspeed Alert',
    "value": 'over_speed'
  },{
    "label": 'Halt Alert',
    "value": 'halt'
  }
]; 
  aStatus = [
    {
      "label": 'All Alerts',
      "value": null
    },{
      "label": 'Active',
      "value": 1
    },{
      "label": 'Inactive',
      "value": 0
    }];
  isMobFilterVisible = false;
  selectedItem: any;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private commonService: CommonService,
    private router: Router,
    private modalService: NzModalService
  ) { }

  ngOnInit(): void {
    let _moreMenu: MoreMenu[] = [
      {
        tittle: "filter",
        iconName: "fa-filter",
        isVisible: true,
        clickEventMethode:()=> {
          this.showFilter();
        },
      },
      {
        tittle: "Create Alarm",
        iconName: "fa-plus-square",
        isVisible: true,
        clickEventMethode:() => {
          this.navigateToAddPage();
        },
      },
      {
        tittle: "Edit Alarm",
        iconName: "fa-edit",
        isVisible: false,
        clickEventMethode:() => {
          this.navigateTo();
        }
      },
      {
        tittle: "Delete Alarm",
        iconName: "fa-trash",
        isVisible: true,
        clickEventMethode: () => {
         this.deleteAlarm(); 
        }
      }
    ];
    this.commonService.setNavTittleAndMenu("All Alarms",_moreMenu);
    this.innerWidth = window.innerWidth;
    this.getVehicles();
    this.search();
  }

  navigateTo() {
    if (!this.selectedRowId) {
      this.commonService.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/tracking/alarm/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

  navigateToAddPage() {
    this.router.navigateByUrl("home/tracking/alarmUpsert");
  }

  showFilter() {
    this.isMobFilterVisible = true;
  }

  deleteAlarm(){
    if(!this.selectedItem){
      return this.commonService.error('Please Select any Row');
    }
      this.modalService.confirm({
        nzTitle: `Are you sure you want to delete?`,
        nzContent: `<b>${this.selectedItem.name|| ''} (${this.selectedItem.atype})</b> Alarm`,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.remove(),

      });

  }
  remove(){
    this.masterService
      .removeAlarm(this.selectedItem)
      .subscribe((data: any) => {
        if (data) {
          this.selectedItem = undefined;
          this.search();

        }
      });

  }

  search () {
    this.clean(this.filterObj);
    this.masterService.getAllAlarms({...this.filterObj}).subscribe((res: any) => {
      if(res) {
        this.receivedData = res.data || [];
        this.scrollTable = document.getElementsByClassName("ant-table-body");
        this.scrollTable[0]?.addEventListener('scroll',() => {
        this.getDataOnScroll();
      } )
      }

    });
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any = document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllAlarms({ no_of_docs: 10, skip: mContext.pageNumber}).subscribe(data => {
              data = data.data;
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
    this.selectedRowId = item.aid;
    
    this.commonService.hideShowMenu(["Edit Alarm"],true);
  }

  updateAlertToggle (alert: any) {
    let uAlert: any = {};
    uAlert.aid = alert.aid;
    uAlert.created_at = alert.created_at;
    uAlert.atype = alert.atype;
    if (alert.enabled === true) {
        uAlert.enabled = 1;
    } else {
        uAlert.enabled = 0;
    }
    this.masterService.updateAlarm(uAlert).subscribe((res: any)=>{
      console.log(res);
    });
  };

  getVehicles() {
    let req: any = {
      all: 'true',
			device_imei: {
				$exists: true,
				$ne: null
			},
			project: {
				device_imei: 1,
				vehicle_reg_no: 1,
				status: 1,
				segment_type: 1
			}
    };
    this.masterService.getAllVehicle(req).subscribe((data: any)=>{
      if(data){
        this.vehData = data;
        this.vehDataCopy = this.vehData;
      }
    })
  }

  searchVehicle(e:any) {
    let exp = String(e?.target?.value);
    this.vehDataCopy = this.vehData.filter((veh: any) => {return veh?.vehicle_reg_no?.toLowerCase().includes(exp.toLowerCase())});
  }
  
  reset(){
    this.filterObj = {};
    this.search();
  }

  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  }
}
