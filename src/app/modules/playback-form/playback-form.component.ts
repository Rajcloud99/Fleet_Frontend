import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MasterService } from '../master.service';
import { differenceInCalendarDays } from "date-fns";

@Component({
  selector: 'app-playback-form',
  templateUrl: './playback-form.component.html',
  styleUrls: ['./playback-form.component.scss']
})
export class PlaybackFormComponent implements OnInit {

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
  selectedVehicle: any
  constructor(
    private masterService: MasterService,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    
    this.commonService.setNavTittleAndMenu("Playback Form",[]);
    this.getVehicles();
    this.start_date = new Date();
    this.end_date = new Date ();
    this.start_time = this.start_date;
    this.start_time.setHours(0, 0, 0, 0);
    this.end_time = this.end_date;
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
    } else if(days === -7) {
      this.start_date.setDate(this.start_date?.getDate()-7);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date?.getDate()-1);
      this.end_time = this.end_date;
      this.end_time.setHours(23, 59, 0, 0);
    } else if(days === -15) {
      this.start_date.setDate(this.start_date?.getDate()-15);
      this.start_time = this.start_date;
      this.start_time.setHours(0, 0, 0, 0);
      this.end_date.setDate(this.end_date?.getDate()-1);
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

  onDateChange(dateType:any){

  }

  addDays(date:any, days:any) {

  }

  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  play() {
    let diff=this.end_date-this.start_date;
		let TotalDays = Math.ceil(diff / (1000 * 3600 * 24));
		if(TotalDays>15){
      return this.commonService.errorModal('Error','Date range cannot be more then 15 days!');
		}
    if(!this.selectedVehicle) {
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
    data.device = {};
    data.device.imei = this.selectedVehicle?.device_imei;
    data.vehicle_no = this.selectedVehicle?.vehicle_reg_no;
    data.start_date = this.start_date;
    data.start_date.setHours(this.start_time.getHours());
    data.start_date.setMinutes(this.start_time.getMinutes());
    data.end_date = this.end_date;
    data.end_date.setHours(this.end_time.getHours());
    data.end_date.setMinutes(this.end_time.getMinutes());
    this.router.navigateByUrl('home/operation/tripDetails/playback', {state : data});
  }
}
