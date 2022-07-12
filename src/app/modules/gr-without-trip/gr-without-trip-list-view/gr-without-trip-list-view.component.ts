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
  faMap,
  faMapMarked,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-gr-without-trip-list-view',
  templateUrl: './gr-without-trip-list-view.component.html',
  styleUrls: ['./gr-without-trip-list-view.component.scss'],
})
export class GrWithoutTripListViewComponent implements OnInit {
  receivedData: any; // store the data
  receivedGrWithOutTrip: any;
  parentName = 'grWithOutTrip';
  stopScrolling = false;
  pageNumber = 2;
  clickSearch = true;
  timer: any;
  selectedRowId: any;
  selectedItem: any;
  faMapMarked = faMapMarked;
  faPlusSquare = faPlusSquare;
  faEye = faEye;
  faEdit = faEdit;
  faSearch = faSearch;
  faTrash = faTrash;
  faTimes = faTimes;
  faFilter = faFilter;
  faMap = faMap;
  innerWidth: any;
  isMobFilterVisible = false;
  showMapGrWithTrip = false;
  receivedTrips: any;
  selectedTripId:any;

  // filter obj
  filterObj: { [index: string]: any } = {
    billingParty: null,
    grNumber: null,
    trip_no: null,
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
  ) {}

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    let reqBody = {
      dateType: 'grDate',
      sort: { grNumber: 1 },
      gr_type: { $ne: 'Trip Memo' },
      no_of_docs: 7,
      source: 'GR',
      tableId: false,
      trip: { $exists: false },
      skip: 1,
    };

    this.masterService.getAllGrWithOutTrip(reqBody).subscribe((data: any) => {
      if (data) {
        this.receivedData = data.data;
        this.scrollTable = document.getElementsByClassName('ant-table-body');
        this.scrollTable[0].addEventListener('scroll', () => {
          console.log('scroll');
          this.onScroll();
        });
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
      this.masterService
        .getAllBillingParty({ params })
        .subscribe((data: any) => {
          if (data) {
            this.receivedGrWithOutTrip = data;
          }
        });
    }
  }

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
            mContext.clean(mContext.filterObj);
            let req = { ...mContext.filterObj };
            (req.skip = mContext.pageNumber),
              (req.dateType = 'grDate'),
              (req.sort = { grNumber: 1 }),
              (req.gr_type = { $ne: 'Trip Memo' }),
              (req.deleted = false),
              (req.source = 'GR'),
              (req.trip = { $exists: false }),
              (req.tableId = false),
              (req.no_of_docs = 5);

            mContext.masterService
              .getAllGrWithOutTrip(req)
              .subscribe((data) => {
                if (data) {
                  if (data.data.length === 0) {
                    mContext.stopScrolling = true;
                  } else {
                    mContext.receivedData = [
                      ...mContext.receivedData,
                      ...data.data,
                    ];
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
      nzContent: `Click Yes to delete <b>${value}</b>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.delete(),
      nzCancelText: 'Cancel',
    });
  }

  mapGr() {
    let reqBody = {
      tripId: this.selectedTripId,
      grId: this.selectedRowId,
    };
    this.masterService.mapGrWithTrip(reqBody).subscribe((data: any) => {
      if (data) {
        this.tripReset();
        this.showMapGrWithTrip = false;
      }
    });
  }

  showMapConfirm() {
    this.modal.confirm({
      nzTitle: `Are you sure you want to Map GR?`,
      nzContent: `Click Yes to Map`,
      nzOkText: 'Map',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.mapGr(),
      nzCancelText: 'Cancel',
    });
  }

  searchTrip(): void {
    this.clean(this.filterObj);
    let reqBody = {
      ...this.filterObj,
      category: 'Loaded',
      isCancelled: false,
      no_of_docs: 5,
      skip: 1,
      sort: {
        _id: -1,
      },
    };
    this.masterService.getTrip(reqBody).subscribe((res: any) => {
      if (res) {
        this.receivedTrips = res?.data;
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
              .getTrip({
                category: 'Loaded',
                isCancelled: false,
                no_of_docs: 5,
                sort: { _id: -1 },
                skip: mContext.pageNumber,
                ...this.filterObj,
              })
              .subscribe((data) => {
                if (data) {
                  data = data?.data || data;
                  if (data.length === 0) {
                    mContext.stopScrolling = true;
                  } else {
                    mContext.receivedTrips = [
                      ...mContext.receivedTrips,
                      ...data,
                    ];
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

  search(): any {
    delete this.selectedRowId;
    this.clean(this.filterObj);
    let req = { ...this.filterObj };
    (req.skip = 1),
      (req.dateType = 'grDate'),
      (req.sort = { grNumber: 1 }),
      (req.gr_type = { $ne: 'Trip Memo' }),
      (req.deleted = false),
      (req.source = 'GR'),
      (req.trip = { $exists: false }),
      (req.tableId = false),
      (req.no_of_docs = 7);
    this.masterService.getAllGrWithOutTrip(req).subscribe((data: any) => {
      if (data.data.length) {
        this.receivedData = data.data;
        this.clickSearch = false;
      } else {
        this.receivedData = null;
      }
    });
  }

  delete() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.masterService
      .deleteGrWithOutTrip(this.selectedRowId, {
        deleted: true,
        _id: this.selectedRowId,
      })
      .subscribe((data: any) => {
        if (data) {
          this.search();
          this.router.navigateByUrl('home/operation/grWithOutTrip');
        }
      });
  }

  reset() {
    this.clickSearch = true;
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
      delete this.selectedItem;
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
  }

  selectedTripItem(item: any) {
    this.selectedTripId = item._id;
  }

  navigateToEdit() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.router.navigateByUrl(
      'home/operation/grWithOutTrip/upsert/' + this.selectedRowId,
      { state: this.selectedItem }
    );
    // this.commonServ.commonUsed.next({ name: "backButton", value: true });
  }

  navigateToTripMap() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal('Error', 'Please select any one row');
      return;
    }
    this.receivedTrips=[];
    this.showMapGrWithTrip = true;
  }

  tripReset(){
    this.receivedTrips=[];
    delete this.selectedTripId;
    for (let propName in this.filterObj) {
      delete this.filterObj[propName];
    }
    
  }

  handleCancel() {
    this.tripReset();
    this.showMapGrWithTrip = false;
  }

  navigateToAdd() {
    this.router.navigateByUrl('home/operation/grWithOutTripUpsert');
  }

  navigateToDetailView() {
    this.router.navigateByUrl('home/operation/grWithOutTrip/view');
  }
}
