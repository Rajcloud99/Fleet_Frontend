import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartService } from 'src/app/services/chart.service';
import { ConstantService } from 'src/app/services/constant.service';
import { StorageService } from 'src/app/services/storage.service';
import { FilterstringgetdatePipe } from 'src/app/shared/pips/filterstringgetdate.pipe';
import { MasterService } from '../../master.service';
import { faFilter, faList , faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import { CommonService } from 'src/app/services/common.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';

declare let d3: any;// it is used in html(nvd3) internally so don't remove.
@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss','../../../../../node_modules/nvd3/build/nv.d3.css'],
  encapsulation: ViewEncapsulation.None
})
export class AnalyticsComponent implements OnInit {

  innerWidth = window.innerWidth;
  faFilter = faFilter;
  faList = faList;
  faSearch = faSearch;
  faTimes = faTimes;
  selectedTrip: any;
  startDate: any;
  selectedVehicle:any;// for seprate analytics
  endDate: any;
  e_options: any;
  p_options: any;
  playData: any = [];
  group = 'exception';
  exceptionData: any = [];
  daywiseData: any = [];
  pData: any;
  start_date: any;// for seprate analytics
  end_date: any; // for seprate analytics
  d_options: any;
  vehData: any = [];
  vehDataCopy: any = [];
  isMobFilterVisible = false;
  config: any;
  
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService,
    private storageService: StorageService,
    private commonService: CommonService,
    private chartService: ChartService,
    private constantService: ConstantService,
  ) {
    this.route.params.subscribe((queryParam) => {
      if (queryParam) {
        const currentState = this.router.getCurrentNavigation();
        this.selectedTrip = currentState && currentState.extras.state;
        const pipe = new FilterstringgetdatePipe();
        this.startDate = pipe.transform(this.selectedTrip?.statuses,'Trip started');
        this.endDate = pipe.transform(this.selectedTrip?.statuses,'Trip ended');
      }
      // for exceptionData
      this.e_options = this.chartService.getOptions({type: 'pieChart'});
      this.e_options.name = 'Exceptions report';
      // for playback
      this.p_options = this.chartService.getOptions({type: 'pieChart'});
      this.p_options.chart.color = function (d: any) { return d.color; };
      this.p_options.name = 'Running and Stopped Duration';

      // for daywiseData
      this.d_options = this.chartService.getOptions({type:'multiBarChart'});
    });
   }

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
        tittle:"List View",
        iconName:"fa-th-list",
        isVisible:true,
        clickEventMethode:()=>{
          this.gotoAlertList();
        }
      } 
    ]; 

    this.commonService.setNavTittleAndMenu("Analytics",_moreMenu);
    if(this.selectedTrip) {
      this.playB();
      this.getAlert();
    } else {
      this.getVehicles();
    }
   //this.dayWiseAlerts();
  }

  groupChange () {
    if(this.group === 'exception'){
      this.getAlert();
    } else if(this.group === 'day') {
      this.dayWiseAlerts();
    }
  }

  searchVehicle(e:any) {
    let exp = String(e);
    this.vehDataCopy = this.vehData.filter((veh: any) => {return veh?.vehicle_reg_no?.toLowerCase().includes(exp.toLowerCase())});
  }

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
        this.vehDataCopy = data;
      }
    })
  }

  search() {
    if(this.group === 'exception'){
      this.getAlert();
    } else if(this.group === 'day' || this.group === 'month') {
      this.dayWiseAlerts();
    }
  }

  reset() {
    this.startDate = null;
    this.endDate = null;
    this.selectedVehicle = null;
  }

  gotoAlertList() {
    if(!this.startDate) {
      return this.commonService.errorModal('Error','Please select start date');
    } else if(!this.selectedTrip?.device?.imei && !this.selectedTrip?.vehicle?.device_imei && !this.selectedVehicle?.device_imei) {
      return this.commonService.errorModal('Error','Please select Vehicle');
    }
    let imei = this.selectedTrip?.device?.imei ||this.selectedTrip?.vehicle?.device_imei || this.selectedVehicle?.device_imei;
    this.selectedTrip = {};
    this.selectedTrip.startDate = this.startDate;
    this.selectedTrip.endDate = this.endDate || new Date();
    this.selectedTrip.device = {};
    this.selectedTrip.device.imei  = imei;
    this.router.navigateByUrl('home/operation/alert-list',{state: this.selectedTrip});
  }

  getAlert() {
    let req: any =  {};
    req.from = this.startDate;
    req.to = this.endDate || new Date();
    req.imei = [];
    req.device_imei = this.selectedTrip?.device?.imei || this.selectedTrip?.vehicle?.device_imei || this.selectedVehicle?.device_imei;
    req.imei.push(req.device_imei);
    delete req.device_imei;
    req.groupBy = 'exception';
    this.masterService.getGroupAlerts(req).subscribe((data: any) => {
      if(data) {
        this.exceptionData = data;
        this.exceptionData.forEach((item: any)=>{
          // technique to acess dynamic property in typescript of any data type;
          const obj = this.constantService.constants.alertCodes;
          type ObjectKey = keyof typeof obj;
          const code = item.code as ObjectKey;
          if(obj[code])
            item.code = obj[code];
        });
      }
    });
    this.daywiseData = null;
  }

  playB() {
    let req: any =  {};
    req.start_time = this.startDate;
    req.end_time = this.endDate || new Date();
    req.device_id = this.selectedTrip?.device?.imei || this.selectedTrip?.vehicle?.device_imei;
    this.masterService.getplayData(req).subscribe((res: any) => {
      if(res) {
        this.playData = res;
        let running_percent = res.dur_wo_stop/res.dur_total;
		    let stoppage_percent = res.dur_stop/res.dur_total;
        let data = [
          {"code":"Running (%)","count": running_percent*100, "color":'green'},
          {"code":'Stopped (%)',"count": stoppage_percent*100, "color": 'red'}
        ];

        running_percent = running_percent*100;
        let run_prcnt = running_percent.toFixed(2);
        stoppage_percent = stoppage_percent*100;
        let stop_prcnt = stoppage_percent.toFixed(2);
        data[0].code = `Running ${run_prcnt} (%)`;
        data[1].code = `Stopped ${stop_prcnt}(%)`;
        this.pData = data;
      }
    })
  }

  dayWiseAlerts() {
    let req: any =  {};
    req.from = this.startDate;
    req.to = this.endDate || new Date();
    req.imei = [];
    req.device_imei = this.selectedTrip?.device?.imei || this.selectedTrip?.vehicle?.device_imei || this.selectedVehicle?.device_imei;
    req.imei.push(req.device_imei);
    delete req.device_imei;
    req.groupBy = this.group;
    this.masterService.getGroupAlerts(req).subscribe((data: any) => {
      if(data) {
        let dateWise: any = {};
        let aDate: any = [];
        data.forEach((oData: any) => {
            oData.aCode.forEach((oCode:any) => {
              // technique to acess dynamic property in typescript of any data type;
                const oReportType = this.constantService.constants.alertCodes;
                type ObjectKey = keyof typeof oReportType;
                const code = oCode.code as ObjectKey;
                if(oReportType[code]) {
                  dateWise[code] = dateWise[code] || {
                      key: oReportType[code] || 'Not Defined',
                      values: []
                  };
                  dateWise[code].values.push({
                      x: oData.date,
                      y: oCode.count
                  });
                }
            });
            aDate.push(oData.date);
        });
        // this.daywiseData = data;
        this.daywiseData = Object.values(dateWise);

          this.daywiseData.forEach((o: any) => {
              aDate.forEach((date:any, index: number) => {
                  if(!o.values.find((oVal: any) => oVal.x === date)){
                      o.values.splice(index, 0, {
                          x: date,
                          y: 0
                      });
                  }
              });
        });
      }
    });
    this.exceptionData = null;
  }
}
