import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {MasterService} from "../../master.service";
import {HttpParams} from "@angular/common/http";
import {differenceInCalendarDays} from "date-fns";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterstringgetdatePipe} from "../../../shared/pips/filterstringgetdate.pipe";

import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';


@Component({
  selector: 'app-empty-trip',
  templateUrl: './empty-trip.component.html',
  styleUrls: ['./empty-trip.component.scss']
})
export class EmptyTripComponent implements OnInit {
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;
  emptyTripForm : any;
  receivedAllVehicles: any;
  receivedAllDrivers: any;
  vehicle: any;
  driver:any;
  configs: any;
  aRoute:any = [];
  route_name: any;
  time: any;
  receivedData: any;
  selectedTrip: any;
  @Input () InputData : any;
  tripStartDate: Date | null = null;
  tripEndDate: Date | null = null;
  RowInfo: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.emptyTripForm = this.fb.group({
      // vehicle: [null,[Validators.required]],
      driver: [null],
      tripStartDate: [null,[Validators.required]],
      tripEndDate: [null,[Validators.required]],
      route_name: [null,[Validators.required]],
      vehicle_no: [null],
      time: [null],
      vehicle: [null]
    });

    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = [currentState && currentState.extras.state];
        this.selectedTrip = this.receivedData[0];
        this.receivedAllVehicles = [
          this.selectedTrip.vehicle
        ];
        this.receivedAllDrivers = [
          this.selectedTrip.driver
        ];

        this.fillFormdata(this.selectedTrip);
      }
    })
  }
  loadingObservable = this.commonService.loadingObservable;
  ngOnInit(): void {
    console.log('RowInfo---', this.RowInfo);
    this.selectedTrip = this.RowInfo;
    this.receivedAllVehicles = [
      this.selectedTrip.vehicle
    ];
    this.receivedAllDrivers = [
      this.selectedTrip.driver
    ];

    this.fillFormdata(this.selectedTrip);
  }

  fillFormdata (data: any) {
    this.emptyTripForm.patchValue({
      driver: data && data.driver,
      tripStartDate: data && data.tripStartDate,
      tripEndDate: data && data.tripEndDate,
      route_name: data && data.route,
      vehicle_no: data && data.vehicle_no,
      category: data && data.category,
      vehicle: data && data.vehicle,
      branch: data && data.branch

    })

  }

  onSubmit(){
    const values = this.emptyTripForm.value;
    this.saveData(values);
  }

  saveData(formData: any) {
    formData.driver = formData.driver && formData.driver._id;
    formData.route = formData.route_name && formData.route_name._id;
    formData.route_name = formData.route_name && formData.route_name.name;
    formData.route_distance = formData.route_name &&  formData.route_name.route_distance;
    formData.segment_type =  formData.vehicle && formData.vehicle.segment_type;
    formData.vehicle = formData.vehicle && formData.vehicle._id;
    formData.branch = formData.branch && formData.branch._id;
    this.masterService.addEmptyTrip(formData).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/operation/trip');
      }
    });
  }

  onvehicleSearch(value: any) {
    if(value.length < 2) return;
    if(value) {
      this.masterService.getAllVehicles({vehicle_no: value}).subscribe((res: any) => {

        this.receivedAllVehicles = res;
      });
    }
  }

  ondriverSearch(value: any) {
    if(value.length < 2) return;
    let params = new HttpParams()
      .set('name' , value)
      .set('sort', 1)
      .set('no_of_docs', 15)
      .set('deleted', false)
      .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      .set('validate', 'all');

    if(value) {
      this.masterService.getAllDriver({ params}).subscribe((res: any) => {
        this.receivedAllDrivers = res;
      });
    }
  }

  getRoute(value: any) {
    if(value.length < 2) return;
    this.masterService.getRouteName({'name':value}).subscribe((res: any)=>{
      if(res) {
        this.aRoute = res;
      }
    });
  }

  today = new Date();
  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) > 0;
  };

  disabledStartDate = (tripStartDate: Date): boolean => {
    if (!tripStartDate || !this.tripEndDate) {
      return false;
    }
    return (tripStartDate.getTime() > this.tripEndDate.getTime() && differenceInCalendarDays(tripStartDate, this.today) > 0);
  };

  disabledEndDate = (tripEndDate: Date): boolean => {
    if (!tripEndDate || !this.tripStartDate) {
      return false;
    }
    return (tripEndDate.getTime() <= this.tripStartDate.getTime() && differenceInCalendarDays(tripEndDate, this.today) > 0);
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }


}
