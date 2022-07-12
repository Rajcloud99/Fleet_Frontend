
import {
  Component,
  HostListener,
  OnInit,
  ViewContainerRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEye,
  faFilter,
  faSearch,
  faChevronCircleLeft,
  faPlusSquare,
  faTimes,
  faUpload,
  faCircle,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { ConstantService } from 'src/app/services/constant.service';
import { MasterService } from '../../master.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { StorageService } from '../../../services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';
@Component({
  selector: 'app-geofence-list-view',
  templateUrl: './geofence-list-view.component.html',
  styleUrls: ['./geofence-list-view.component.scss']
})
export class GeofenceListViewComponent implements OnInit {
  receivedData: any;
  isConfirmLoading = false;
  stopScrolling = false;
  configs: any;
  pageNumber = 2;
  timer: any;
  logInUser: any;
  filterObj: any = {
    name: null,
  };
  vehicle_no: any;
  name:any;
  description:any;
  visible :boolean = false;
  faFilter = faFilter; // fontawesome icon
  faSearch = faSearch; // fontawesome icon
  faTimes = faTimes; // fontawesome icon
  faEye = faEye; // fontawesome icon
  faPlusSquare = faPlusSquare;
  faTrash = faTrash;
  faCircle = faCircle;
  faChevronCircleLeft = faChevronCircleLeft;
  innerWidth: any; // stores width of any screeen
  scrollTable!: HTMLCollectionOf<Element>;
  selectedRowId: any;
  selectedItem: any;
  isMobFilterVisible = false;
  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private masterService: MasterService,
    private router: Router,
    private storageService: StorageService,
    private commonService: CommonService,
    private constantService: ConstantService,
    private modalService: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngOnInit(): void {
    let _moreMenu: MoreMenu[] = [
      {
        tittle: 'fiter',
        iconName: 'fa-filter',
        isVisible: true,
        clickEventMethode: () => {
          this.isMobFilterVisible = !this.isMobFilterVisible;
        },
      },
      {
        tittle: 'Create Geofence',
        iconName: 'fa-plus-circle',
        isVisible: true,
        clickEventMethode: () => {
          this.navigateToAdd();
        },
      },
      {
        tittle: 'Edit Geofence',
        iconName: 'fa-edit',
        isVisible: false,
        clickEventMethode: () => {
          this.navigateToEdit();
        },
      },
      {
        tittle: 'View Geofence',
        iconName: 'fa-eye',
        isVisible: false,
        clickEventMethode: () => {
          this.navigateToDetails();
        },
      },
      {
        tittle: 'Delete Geofence',
        iconName: 'fa-trash',
        isVisible: false,
        clickEventMethode: () => {
          this.deleteGeofence();
        },
      },
    ];

    this.commonService.setNavTittleAndMenu('Geofence', _moreMenu);
    this.innerWidth = window.innerWidth;
    this.configs = this.storageService.get('userData').configs;
    this.visible = false;
    this.search();
  }

  navigateToAdd() {
    this.router.navigateByUrl("home/tracking/geofence/Upsert/" + 'Add', {state: this.receivedData});
  }
  // go to the edit  page
  navigateToEdit() {
    // this.router.navigateByUrl("home/tracking/geofence/Upsert/" + 'Edit', {state: this.selectedItem});
    if(!this.selectedItem){
      this.commonService.error('Please Select any Geozone');
      return;
    }
    this.visible = true;
    this.name = this.selectedItem.name;
    this.description = this.selectedItem.description;
  }
  navigateToDetails() {
    this.router.navigateByUrl("home/tracking/geofence/Upsert/" +'Preview',{state: this.selectedItem});
  }
  deleteGeofence(){
    if(!this.selectedItem){
      this.commonService.error('Please Select any Row');
      return;
    }
      this.modalService.confirm({
        nzTitle: `Are you sure you want to delete?`,
        nzContent: `<b>${this.selectedItem.name}</b> Geofence`,
        nzOkText: 'Yes',
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => this.delete(),

      });

  }
  delete(){
    this.masterService
      .DeleteGeofence(this.selectedItem)
      .subscribe((data: any) => {
        if (data) {
          this.selectedItem = undefined;
          this.search();

        }
      });

  }

  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item.gid;
    this.commonService.hideShowMenu(
      ['Edit Geofence', 'View Geofence', 'Delete Geofence'],
      true
    );
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
  handleEditSubmit(){
    if(this.selectedItem) {
      if(this.name) {
        this.selectedItem.name = this.name;
      }
      if(this.description) {
        this.selectedItem.description = this.description;
      }

      this.masterService
        .EditGeofence(this.selectedItem)
        .subscribe((data: any) => {
          if (data) {
            this.visible = false;
            this.name = undefined;
            this.description=undefined;
            this.search();

          }
        });

    }

  }
  handleEditCancelView(){
     this.visible = false;
  }
  reset() {
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    this.search();
  }
  search(): void {
    this.clean(this.filterObj);
    this.masterService
      .getGeofence({ ...this.filterObj })
      .subscribe((res: any) => {
        if (res) {
          this.receivedData = res?.data;
          this.scrollTable = document.getElementsByClassName('ant-table-body');
          this.scrollTable[0]?.addEventListener('scroll', () => {
            this.getDataOnScroll();
          });
        }
      });
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any =
        document.getElementsByClassName('ant-table-body')[0] ||
        document.getElementById('myDIV');
      if (
        divElement.scrollTop + divElement.clientHeight >=
        divElement.scrollHeight
      ) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout(() => {
            mContext.masterService
              .getGeofence({
                no_of_docs: 10,
                skip: mContext.pageNumber,
                ...this.filterObj,
              })
              .subscribe((data) => {
                if (data) {
                  data = data?.data || data;
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

}
