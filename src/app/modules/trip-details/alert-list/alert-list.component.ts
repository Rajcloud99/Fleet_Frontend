import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { FilterstringgetdatePipe } from 'src/app/shared/pips/filterstringgetdate.pipe';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent implements OnInit {
  filterObj: any = {};
  alertData: any = [];
  startDate: any;
  endDate: any;
  timer: any;
  stopScrolling = false;
  pageNumber = 2;
  innerWidth = window.innerWidth;
  scrollTable!: HTMLCollectionOf<Element>;
  selectedTrip: any;
  device: any;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService
  ) {
    this.route.params.subscribe((queryParam) => {
      if(queryParam) {
        const currentState = this.router.getCurrentNavigation();
        this.selectedTrip = currentState && currentState.extras.state;
        const pipe = new FilterstringgetdatePipe();
        this.startDate = pipe.transform(this.selectedTrip?.statuses,'Trip started') || this.selectedTrip.startDate;
        this.endDate = pipe.transform(this.selectedTrip?.statuses,'Trip ended') || this.selectedTrip.endDate;
      }
    });
   }

  ngOnInit(): void {
    this.getAlertList();
  }

  getAlertList() {
    let req: any = {};
    this.device = this.storageService
      .get('alldevices')
      .find(
        (item: any) => item.imei == this.selectedTrip?.vehicle?.device_imei
      );
    req.from = this.startDate;
    req.to = this.endDate;
    req.no_of_docs = 15;
    req.device_imei = this.selectedTrip?.device?.imei || this.device?.imei;
    req.imei = [];
    req.imei.push(Number(req.device_imei));
    this.filterObj.imei = [];
    this.filterObj.imei.push(Number(req.device_imei));
    this.filterObj.from = this.startDate;
    this.filterObj.to = this.endDate;
    delete req.device_imei;
    this.masterService.getAllAlerts(req).subscribe((res:any)=> {
      this.alertData = res;
      this.scrollTable = document.getElementsByClassName("ant-table-body");
      this.scrollTable[0]?.addEventListener("scroll",() => {
        this.getDataOnScroll();
      })
    });
  }

  getDataOnScroll() {
    let divElement: any = document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
    if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
      if (this.stopScrolling === false) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        const mContext = this;
        this.timer = window.setTimeout( ()=> {
          mContext.masterService.getAllAlerts({ no_of_docs: 15, skip: mContext.pageNumber, ...this.filterObj}).subscribe(data => {
            if (data) {
              data = data?.data || data;
              if (data.length=== 0) {
                mContext.stopScrolling = true;
              } else {
                mContext.alertData = [...mContext.alertData, ...data];
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
