import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { MasterService } from '../master.service';
import { VehicleUpsertComponent } from '../vehicle/vehicle-upsert/vehicle-upsert.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CommonService } from 'src/app/services/common.service';
import { Router } from '@angular/router';
import { differenceInCalendarDays } from "date-fns";
import {  faForward } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-trip-gps',
  templateUrl: './trip-gps.component.html',
  styleUrls: ['./trip-gps.component.scss']
})
export class TripGpsComponent implements OnInit {

  customer: any;
  skipDuty:boolean= false;
  driver: any;
  pageNo = 1;
  veh: any;
  selectedRowId: any;
  selectedBooking: any;
  receivedAllCustomers: any = [];
  receivedAllBookings: any;
  receivedAllRoutes: any;
  receivedDriver: any = [];
  allDevices: any = [];
  innerWidth: any;
  vehData: any;
  route: any;
  vendor: any;
  device: any;
  visible = false;
  vendorShow=false;
  name: any;
  prim_contact_no: any;
  employee_code:any;
  receivedAllVendors: any = [];
  selectedClient: any;
  vendorId: any;
  receivedData : any;
  customerId : any;
  logInUser : any;

  // booking:any;
  trip_start: any;
  time: any;
  faForward =faForward;
  tripBase:any;
  tripBaseType :any = ['Sim Based', 'GPS Based'];
  allDevicesCopy: any;
  selectedItem: any;
  configs: any;
  constructor(
    private masterService: MasterService,
    private storageService: StorageService,
    private modal: NzModalService,
    private router: Router,
    private commonService: CommonService,
    private viewContainerRef: ViewContainerRef) {
    const currentState = this.router.getCurrentNavigation();
    this.receivedData = currentState && currentState.extras && currentState.extras.state;
    if(this.receivedData){
      this.customer = this.receivedData.customer;
      this.selectedBooking =  this.receivedData
      this.pageNo = 3;
      if(this.receivedData.route && this.receivedData.route.length){
        this.receivedAllRoutes = this.receivedData.route;
        this.route = this.receivedData.route[0];
      }
    }
  }

  ngOnInit(): void {
    this.commonService.setNavTittleAndMenu('Trip GPS');
    this.innerWidth = window.innerWidth;
    this.logInUser = this.storageService.get('userData').user;
    this.selectedClient = this.storageService.get('userData').client_config.clientId;
    this.allDevices = this.storageService.get('alldevices');
    this.configs = this.storageService.get('userData').configs;
    this.allDevicesCopy = this.allDevices;
  }

  onSearchCustomer(value: any) {
    if(value.length < 2) return;
    if(value) {
      let params = new HttpParams()
        .set('name', value)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      this.masterService.getAllCustomers({params}).subscribe((res:any) => {
        this.receivedAllCustomers = res;
      });
    }
  }

  getbookings() {
    if(!this.customer?._id) return;
    let filter: any = {'customer_id': this.customer._id};

    // if(this.logInUser && this.logInUser.user_type && this.logInUser.user_type.length){
    //   // const idx = this.logInUser.user_type.indexOf('Trip Manager');
    //   if(this.logInUser.user_type.indexOf('Trip Manager') + 1)
    //     filter.user = this.logInUser._id;
    // }

    this.masterService.getAllBooking(filter).subscribe((res: any)=>{
      if(res.length)
        this.receivedAllBookings = res;
      else{
        this.commonService.error('No Duty Found For ' + this.logInUser.full_name);
        this.pageNo -= 1;
      }


    });
  }

  selectItem (d: any) {
    this.selectedItem = d;
    this.selectedRowId = d._id;
  }
  searchDevice(e: any) {
    let exp = String(e?.target?.value);
    this.allDevicesCopy = this.allDevices.filter((device: any)=>{return device?.imei?.includes(exp)});
  }

  onChangeSearch(value: any, type: string): any {
    if (value) {
      let params = new HttpParams()
        .set('user_type', 'Driver')
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      params = params.append(type, value);
      this.masterService.getAllDriver({ params }).subscribe((data: any) => {
        if (data) {
          this.receivedDriver = data;
        }
      });
    }
  }

  gotoNext(pageNo: number,data: any) {
    if(pageNo === 1)
    {
      this.skipDuty = true;
      this.customer = data;
      this.getbookings();
    } else if(pageNo === 2) {
      this.selectedBooking = data;
      if(data.route && data.route.length){
        this.receivedAllRoutes = data.route;
        this.route = data.route[0];
        this.skipDuty = false;
      }
    }
    this.pageNo = this.pageNo+1;
  }
  gotoSkipDuty(){
    this.pageNo = 3;
    this.skipDuty = false;
  }
  onSearchvehicle(value: any) {
    this.vehData =null;
    if(value) {
      let req = {
          vehicle_no: value,
          no_of_docs: 5,
          status: 'Available'
      }
      this.masterService.getAllVehicle(req).subscribe((res: any) => {
        this.vehData = res;
      });
    }
  }

  onSearchvender(value: any) {
    if(value) {
      this.masterService.getAllVendor({name: value, cClientId: this.selectedClient}).subscribe((res: any) => {
        this.receivedAllVendors = res;
      });
    }
  }

  onSearchRoute($event: any) {

    this.masterService.getAllTransportRoutes({name: $event}).subscribe((res: any) => {
      if(res) {
        this.receivedAllRoutes = res;
      }
     });
  }

  onChangeVehicle($event: any) {
    if($event) {
      this.driver = $event.driver;
      this.receivedDriver = [this.driver];
      this.device = $event.device_imei;
      this.receivedAllVendors = [{'name': $event.vendor_name, '_id': $event.vendor_id}];
      this.vendor = this.receivedAllVendors[0];
    }
    console.log($event);
  }

  addVehicle() {
    const modal = this.modal.create({
      nzTitle: 'Add Vehicle',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: VehicleUpsertComponent,
      nzComponentParams: {
        InputData : 'modal'
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            modal.destroy();
          }
        }
      ]
    });
  }

  addVendor() {
    this.vendorShow = true;
  }
  addDriver() {
    this.visible = true;
  }

  handleCancel() {
    this.visible = false;
    this.vendorShow=false;
  }

  handleOk( ) {
    let req: any = {};
    req.name = this.name;
    req.prim_contact_no = this.prim_contact_no;
    if(req.prim_contact_no.length != 10){
      return this.commonService.errorModal('Error','Please enter 10 digit mobile no');
    }
    this.masterService.addvendor(req).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.prim_contact_no  = undefined;
        this.name = undefined;
        this.handleCancel();
      }
    })
  }

  handleDriver( ) {
    let req: any = {};
    req.name = this.name;
    req.employee_code = this.employee_code;
    req.prim_contact_no = this.prim_contact_no;
    if(req.prim_contact_no.length != 10){
      return this.commonService.errorModal('Error','Please enter 10 digit mobile no');
    }
    this.masterService.addDriver(req).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.prim_contact_no  = undefined;
        this.name = undefined;
        this.employee_code = undefined;
        this.handleCancel();
      }
    })
  }

  allocateTrip() {
    let req: any = {};
      if(this.veh)
      req.vehicle_no = this.veh?._id;
      if(this.driver)
      req.driver_name = this.driver?.name;
      req.gr = [];
    if(this.tripBase === 'Sim Based'){
      this.device  = undefined;
      if(this.driver){
        if(!this.driver.prim_contact_no){
       return  this.commonService.error('Driver Contact No. is mandatory');
      }
      } else{
        return  this.commonService.error('Driver  is mandatory');
      }
    }else if(this.tripBase === 'GPS Based' && (!this.device || this.device === undefined )){
      return  this.commonService.error('Select device imei');
    }


      let allocationData = [];
        let allocationDataFinal: any = [];
        allocationData = [this.veh];
        for (let a = 0; a < allocationData.length; a++) {
          allocationDataFinal[a] = {};
          allocationDataFinal[a].vehicle_no = allocationData[a].vehicle_reg_no;
          allocationDataFinal[a].vehicle = allocationData[a]._id;
          if(this.route) {
            allocationDataFinal[a].route = this.route._id;
            allocationDataFinal[a].route_name = this.route.name;
          }
          if(this.driver) {
            allocationDataFinal[a].driver = this.driver._id;
            allocationDataFinal[a].driver_name =this.driver.name;
          }
          if(this.device) {
            allocationDataFinal[a].device = this.device
          }
          allocationDataFinal[a].vendor = (allocationData[a].vendor && allocationData[a].vendor._id) || this.vendor._id;
          allocationDataFinal[a].trip_start =  this.trip_start;
          allocationDataFinal[a].tripBase = this.tripBase;
          if(this.trip_start)
            allocationDataFinal[a].allocation_date =this.trip_start;
          else
              allocationDataFinal[a].allocation_date = new Date();

          allocationDataFinal[a].gr = [];
          if(this.route && this.route._id ){
             allocationDataFinal[a].gr.push({
               route: this.route._id,
               route_name: this.route && this.route.name,
               'customer': this.customer,
               'booking': this.selectedBooking?._id,
                acknowledge:{
                  source :this.route.source?.c,
                  destination :this.route.destination?.c
                }
              });
            }

        }
        this.saveData(allocationDataFinal);
  }

  saveData(data: any) {
    this.masterService.createTrip({trips: data}).subscribe((data: any)=> {
      if(data) {
        let successMessage = '';
        let messages = data.messages;
        if (messages.length > 0) {
          for(const msg of messages) {
            successMessage += msg.message + " \n";
          }
        }
        this.modal.success({
          nzTitle: 'Trip is successfully created',
          nzContent: `${successMessage}`
        })
        this.router.navigateByUrl('home/operation/tripDetails');
      }
    });
  }

  today = new Date();
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };
}
