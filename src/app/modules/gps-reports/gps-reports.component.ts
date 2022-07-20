import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MasterService } from '../master.service';
import { differenceInCalendarDays } from "date-fns";
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-gps-reports',
  templateUrl: './gps-reports.component.html',
  styleUrls: ['./gps-reports.component.scss']
})
export class GpsReportsComponent implements OnInit {
  start_date: any;
  start_time: any;
  end_date: any;
  end_time: any;
  vehData: any = [];
  vehDataCopy: any = [];
  maxStartDate:any;
  maxEndDate:any;
  minEndDate:any;
  name: any;
  configs:any;
  innerWidth:any;
  aSegmentType:any;
  deviceIMEI: any = [];
  selectedVehicleR:any;
  reportType:any;
  segmentType:any;
  monthPicker:any;
  checkedAll=false;
  aReportTypes = [
    {
      scope: "report_parking",
      name: 'Halt Report'
    },{
      scope: "report_overspeed",
      name: 'Overspeed Report'
    },{
      scope: "report_activity",
      name: 'Activity Report'
    },
    {
      scope: 'report_mileage2',
      name: "Kilometer Report"
    }
  ];

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  constructor(
    private masterService: MasterService,
    private router: Router,
    private commonService: CommonService,
    private storageServ: StorageService,
  ) { }

  ngOnInit(): void {
    this.commonService.setNavTittleAndMenu("GPS Reports",[]);
    this.getVehicles();
    this.start_date = new Date();
    this.end_date = new Date ();
    this.start_time = this.start_date;
    this.start_time.setHours(0, 0, 0, 0);
    this.end_time = this.end_date;
    this.configs = this.storageServ.get('userData').configs;
    this.aReportTypes= this.configs?.tracking?.aReportTypes || this.aReportTypes;
    this.aSegmentType=this.configs?.master?.aSegmentType;
  }


  fillDateTime(days: number) {
    this.start_date = new Date();
    this.end_date = new Date ();
    if(days === 0) {
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_time = this.end_date;
    } else if(days === -1) { 
      this.start_date.setDate(this.start_date.getDate() - 1);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date.getDate() - 1);
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    } else if(days === -2) {
      this.start_date.setDate(this.start_date?.getDate()-2);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date?.getDate()-1);
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    } else if(days === -3) {
      this.start_date.setDate(this.start_date?.getDate()-3);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date?.getDate()-1);
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    }else if(days === -7) {
      this.start_date.setDate(this.start_date?.getDate()-7);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date?.getDate()-1);
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    }else if(days === -30) {

      this.start_date.setFullYear(this.monthPicker?.getFullYear());
      this.start_date.setMonth(this.monthPicker?.getMonth());
      this.start_date.setDate(1);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      
      this.end_date.setFullYear(this.monthPicker?.getFullYear());
      this.end_date.setMonth(this.monthPicker?.getMonth());
      let lastDay=new Date(this.monthPicker.getFullYear(), this.monthPicker.getMonth() + 1, 0);
      this.end_date.setDate(lastDay.getDate());
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    }
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
        this.vehDataCopy = this.vehData;
      }
    })
  }

  searchVehicle(e:any) {
    let exp = String(e?.target?.value);
    this.vehDataCopy = this.vehData.filter((veh: any) => {return veh?.vehicle_reg_no?.toLowerCase().includes(exp.toLowerCase())});
  }

  searchVehicleSegment(segment:any){
    this.vehDataCopy=this.vehData.filter((veh: any) => veh?.segment_type == segment);
  }

  checkedVehicle(deviceR:any,value:any){
    if(value) {
      this.deviceIMEI.push(deviceR.device_imei);
      if(this.deviceIMEI.length==this.vehDataCopy.length){
        this.checkedAll=value;
      }
     } else {
        const idx = this.deviceIMEI.indexOf(deviceR.device_imei);
        if(idx > -1) {
          this.deviceIMEI.splice(idx, 1);
          this.checkedAll=value;
        }
     }
  }

  selectAllRow (value: boolean) {
    this.vehDataCopy.forEach((item: any) => {
      item.selected=value;
      this.checkedVehicle(item, value);
    });
  }

  checkedVehicleR(veh:any){
      this.deviceIMEI[0]=veh.device_imei;
  }

  onDateChange(dateType:any){

  }

  addDays(date:any, days:any) {

  }

  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  generate() {
    if(!this.reportType){
      return this.commonService.errorModal('Error','Please select Report Type!');
    }
    let diff=this.end_date-this.start_date;
		let TotalDays = Math.ceil(diff / (1000 * 3600 * 24));
    let TotalHrs=Math.ceil(diff / (1000 * 3600));
		if(TotalDays>31){
      return this.commonService.errorModal('Error','Date range cannot be more then 31 days!');
		}else if(!(this.deviceIMEI.length>0)) {
      return this.commonService.errorModal('Error','Please select a vehicle');
    } else if(!this.start_date){
      return this.commonService.errorModal('Error','Please select start date');
    } else if(!this.start_time) {
      return this.commonService.errorModal('Error','Please select  start time');
    } else if(!this.end_date) {
      return this.commonService.errorModal('Error','Please select end date');
    } else if(!this.end_time) {
      return this.commonService.errorModal('Error','Please select end time');
    }

    let data : any = {};
    let request : any = {};
    
    data.device_id = this.deviceIMEI;
    request.imei = this.deviceIMEI;
    

    data.start_time = this.start_date;
    data.start_time.setHours(this.start_time.getHours());
    data.start_time.setMinutes(this.start_time.getMinutes());

    data.end_time = this.end_date;
    data.end_time.setHours(this.end_time.getHours());
    data.end_time.setMinutes(this.end_time.getMinutes());
    data.reportType=this.reportType

    let apiType='';
    if(this.reportType==='report_parking'){
      apiType='parking';
    }else if(this.reportType==='report_overspeed'){
      apiType='overspeed';
    }else if(this.reportType==='report_activity'){
      apiType='activity';
    }else if(this.reportType==='report_mileage2'){
      apiType='km';
    }else if(this.reportType==='report_idealing'){
      apiType='idealing';
    }else if(this.reportType==='report_driver_activity'){
      apiType='driver_activity';
    }else if(this.reportType==='report_driver_activity_single'){
      apiType='driver_activity';
    }else if(this.reportType==='details_analysis'){
      if(TotalHrs>24){
        return this.commonService.errorModal('Error','Time cannot be more then 24Hrs!');
      }
      apiType='detailAnalysis';
    }else if(this.reportType==='exception_report'){
      apiType='getAlerts';
      request.code = [
        "over_speed",
        "sos",
        "hb",
        "ha",
        "idle",
        "fw",
        "nd",
        "cd",
        "tl"
    ];
    }else if(this.reportType==='vehicle_exceptions'){
      apiType='vehicleExceptionsRpt';
    }
    
    if(this.reportType==='exception_report'|| this.reportType==='vehicle_exceptions'){
      request.from=data.start_time;
      request.to=data.end_time;
      this.masterService.getAlertsReports(request,apiType).subscribe((data: any)=>{
        if(data){
          this.dwnldResponse(data);
        }
      })
    } else{
      this.masterService.getGpsReports(data,apiType).subscribe((data: any)=>{
        if(data){
          this.dwnldResponse(data);
        }
      })
    }
        
  }

  dwnldResponse(oRes:any){
		let url = oRes.data || oRes.url;
		this.commonService.downloadFileWithUrl(url);
    this.deviceIMEI=[];
    this.selectAllRow(false);
    this.selectedVehicleR=false;
	};

}
