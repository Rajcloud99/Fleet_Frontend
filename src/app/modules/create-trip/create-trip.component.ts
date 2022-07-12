import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MasterService } from '../master.service';
import { differenceInCalendarDays } from "date-fns";
import {faPlusSquare, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import { CommonService } from 'src/app/services/common.service';
import { FormBuilder, Validators} from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { VehicleUpsertComponent } from '../vehicle/vehicle-upsert/vehicle-upsert.component';
import {GsaddressService} from 'src/app/services/gsaddress.service';
import { StorageService } from 'src/app/services/storage.service';
import { GrUpsertComponent } from '../gr/gr-upsert/gr-upsert.component';
import { VendordealPopupComponent } from '../vendordeal-popup/vendordeal-popup.component';
import {TripMemoUpsertComponent} from "../trip-memo/trip-memo-upsert/trip-memo-upsert.component";
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
})
export class CreateTripComponent implements OnInit {

  filterObj:{ [index: string]: any } = {
    'ownershipType': '',
    'vehicle_no': ''
  };
  @ViewChild("ld", { static: false })
  ld!: ElementRef;
  @ViewChild("ud", { static: false })
  ud!: ElementRef;
  ids: any;
  faTimes = faTimes;
  faSearch = faSearch;
  faPlusSquare = faPlusSquare;
  typeList = ["Own", "Associate", "Market"];
  receivedAllVehicles: any;
  receivedVehicle: any;
  selectedRowId: any;
  selectedItem: any;
  stopScrolling: boolean = false;
  timer: any;
  innerWidth: any;
  distance: any;
  pageNumber: any;
  receivedAllBranches: any;
  receivedAllCustomers: any;
  VdealpopupData: any;
  customer: any;
  autocomplete: any;
  totalWeight  = 0;
  showTable = false;
  copyValues: any;
  selectedVendorInfo: any;
  loading_point: any;
  unloading_point: any;
  receivedAllVendors: any;
  selectedClient: any;
  visible = false;
  name: any;
  date: any;
  time: any;
  prim_contact_no: any;
  vehicle: any;
  preparegrArr: any = [];
  copyGrr: any;
  oTripMemo:any;
  aRoute:any = [];
  Route:any = [];
  imd: any;
  route_name: any;
  vdealValid = true;
  isGRValid = true;
  ldEle: any;
  udEle: any;
  configs: any;
  rKm: any;
  driver: any;
  receivedAllDrivers: any;
  serviceTyp:any = 'Standard';
  aServiceTyp: any = [];

  @HostListener("window: resize", ["$event"])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private commonService: CommonService,
    private fb: FormBuilder,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
    private gsaddressservice: GsaddressService,
    private storageServ: StorageService,
    private router: Router
  ) {

  }


  ngOnInit(): void {
    this.ids = [];
    this.time = new Date();
    this.date = new Date();
    this.onChanges();
    this.innerWidth = window.innerWidth;
    this.selectedClient = this.storageServ.get('userData').client_config.clientId;
    this.serviceTyp = 'Normal';
    this.aServiceTyp = ['Normal','Express','Empty'];
    this.configs = this.storageServ.get('userData').configs;
    // for preventing enter key to click on next event
    // so to stop event propagation
    this.ldEle = document.getElementById("loading");
    this.udEle = document.getElementById("unloading");
    this.ldEle && this.ldEle.addEventListener('keydown',(e: any)=>{
      if(e && e.keyCode == 13){// enter keycode
        e.preventDefault();
      }
    });
    this.udEle && this.udEle.addEventListener('keydown',(e: any)=>{
      if(e && e.keyCode == 13){// enter keycode
        e.preventDefault();
      }
    });
  }
  get f() { return this.createTripForm.controls; }

  createTripForm = this.fb.group({
    ownership_type: ['',Validators.required],
    vehicle_no: ['',Validators.required],
    driver_name: [''],
    vendor:[null],
    imd: [null]
  });

  selectItem (item: any, value = false) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    if(value) {
      this.ids.push(item._id);
     } else {
        const idx = this.ids.indexOf(item._id);
        if(idx > -1) {
          this.ids.splice(idx, 1);
        }
     }
    console.log(this.ids);
    this.selectedRowId = item;
  }

  intermittentPoint(viewValue: any){
     if(viewValue.length > 2){
        let requestObj = {
        query: viewValue,
         };
        this.masterService.autosuggestCity({requestObj}).subscribe((res: any)=>{
           if(res) {
           this.Route = res;
           }
         });
      }else return;
   }

  changeDriver() {
    console.log('driver chnaged');
  }
  onSearch(value: any) {
    this.receivedAllVehicles =[];
    if(value.length < 2) return;
    if(!this.f.ownership_type.value) {
      this.commonService.errorModal('Error','Please select first ownership type')
      return;
    }
    if(value) {
      this.masterService.getAllVehicles({ownershipType: this.f.ownership_type.value, status: 'Available', vehicle_no: value}).subscribe((res: any) => {
        this.receivedAllVehicles = res;
      });
    }
  }

  onSearchDriver(value: any) {
    if(value.length < 2) return;
    let params = new HttpParams()
        .set('user_type', 'Driver')
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      params = params.append('name', value);
    if(!this.f.ownership_type.value || !this.f.vehicle_no.value) {
      this.commonService.errorModal('Error','Please select first ownership type and vehicle no.')
      return;
    }
    if(value) {
      this.masterService.getAllDriver({params}).subscribe((res: any) => {
        this.receivedAllDrivers = res;
      });
    }
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

  delRow(i: any) {
    this.preparegrArr.splice(i,1);
  }

  addRow() {
    this.preparegrArr.push([]);
  }

  handleCancel() {
    this.visible = false;
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
        // this.commonService.companyReflect.next(true);
        // this.router.navigateByUrl('home/master/vendor');
      }
    })
  }

  onSearchvender(value: any) {
    if(value) {
      this.masterService.getAllVendor({name: value, cClientId: this.selectedClient}).subscribe((res: any) => {
        this.receivedAllVendors = res;
      });
    }
  }

   next(){
     if(this.receivedVehicle[0].ownershipType != "Own"){
			if (!(this.receivedVehicle[0].vendor_id)) {
        return this.commonService.errorModal('Error','No vendor Found on Selected Vehicle');
      }
			this.selectedVendorInfo = this.receivedVehicle[0].vendor_id;
		}
	}

  weightValidaton (veh: any, index: any) {

		veh.loadedWeight = 0;
		for (let i = 0; i < veh.gr.length; i++) {
			veh.loadedWeight += veh.gr[i].weight;
		}
		// flag = false;

		veh.capacity_tonne = veh.capacity_tonne || veh.veh_type && veh.veh_type.capacity || 0;

		if (veh.loadedWeight > (veh.capacity_tonne + (veh.capacity_tonne * (veh.overloadAllowed || 0) / 100))) {

			setTimeout( ()=> {
				this.commonService.errorModal('Error', 'weight cannot be greater than allowed Capacity');
				veh.gr[index].weight = 0;
			}, 2000);
		}
	};

  onSearchBranch (value: any) {
    if(value) {
      this.masterService.getAllBranch({name : value}).subscribe((res: any) => {
        this.receivedAllBranches = res;
      });
    }
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

  today = new Date();
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  addVendor() {
    this.visible = true;
  }

  getRoute(value: any) {
    if(value.length < 2) return;
    this.masterService.getRouteName({'name':value}).subscribe((res: any)=>{
      if(res) {
        this.aRoute = res;
      }
    });
  }

  onChanges() {
    this.createTripForm.get('ownership_type')!.valueChanges.subscribe((value)=>{
      this.createTripForm.controls.vehicle_no.setValue('',{ emitEvent: false});
    });
    this.createTripForm.get('vehicle_no')!.valueChanges.subscribe((value) => {
      this.search();
    });
  }

  search() {
    if (this.f.vehicle_no.value) {
      this.masterService.getAllVehicles({ownershipType : this.f.ownership_type.value, status: 'Available', _id: this.f.vehicle_no.value._id,'populate':['vendor_id'],'skip':1}).subscribe((res: any) => {
        if(res) {
          this.receivedVehicle = res;
          this.next();
        }
      });
    }
  }

  changeVehicle(e: any) {
    if(!e) return;
    if(this.f.vehicle_no.value && this.f.vehicle_no.value.driver) {
      this.receivedAllDrivers = [this.f.vehicle_no.value.driver];
      this.createTripForm.controls.driver_name.setValue(this.f.vehicle_no.value.driver,{ emitEvent: false});
      if(this.f.vehicle_no.value.gr && this.f.vehicle_no.value.gr[0].sr)
      this.serviceTyp = this.f.vehicle_no.value.gr[0].sr;
    }
  }

   async setRouteKm () {
    const mContext = this;
    if(mContext.ld.nativeElement.location &&  mContext.ud.nativeElement.location){
      let res = await mContext.gsaddressservice.calcDist(mContext.ld.nativeElement,mContext.ud.nativeElement);
      mContext.Distance(res);
    }else return;
  }

  Distance(res: any){
    if(res && Array.isArray(res.rows) && res.rows[0]){
      const element = res.rows[0].elements;
      const ans = Math.round(element[0].distance.value/1000);
      this.rKm = ans;
    }
  }

  onSubmit = ($event:any) => {
    console.log($event);
      $event.preventDefault();
      let allocationOk = true;
      // for (const key in this.createTripForm.controls) {
      //   this.createTripForm.controls[key].markAsDirty();
      //   this.createTripForm.controls[key].updateValueAndValidity();
      // }
      if(!this.driver && this.f.ownership_type.value == 'Own') {
          if(this.configs.booking && !this.configs.booking.withoutDriverTrip) {
            this.commonService.errorModal('Error', 'Driver Should be allocated on Vehicle to select this vehicle');
            return;
          }
      }
      // if(!this.vdealValid){
      //   this.commonService.errorModal('Error', 'Please fill all required field in Vendor Deal');
      //   return;
      // } else if(!this.isGRValid){
      //   this.commonService.errorModal('Error', 'Please fill all required field in  GR');
      //   return;
      // }
      if(!this.date) {
        this.commonService.errorModal('Error', 'Please enter trip start date');
      }
      const values = this.createTripForm.value;
      values.date  = this.date;
      values.date.setHours(this.time.getHours());
      values.date.setMinutes(this.time.getMinutes());
      values.date.setMilliseconds(0);
      if(new Date(values.date).getTime() > this.today.getTime()){
        this.commonService.errorModal('Error','Please select trip start date and time on today or before');
        return;
      }
      if(this.configs.booking && this.configs.booking.showGoogleRoute) {
        if(!this.loading_point || !this.unloading_point || !this.rKm) {
          this.commonService.errorModal('Error','Please fill loading point and unloading point');
          return;
        }
        values.loading_point = this.loading_point;
        values.unloading_point = this.unloading_point;
        values.rKm = this.rKm;
      }
      if(this.vehicle)
       values.vehicle_no = this.vehicle._id;
      if(this.driver)
        values.driver_name = this.driver.name;
      this.copyGrr = JSON.parse(JSON.stringify(this.preparegrArr));
      values.gr = this.copyGrr;
    if (this.receivedVehicle && this.receivedVehicle.length > 0) {
        for (let a = 0; a < this.receivedVehicle.length; a++) {
          // if (!(vm.aVehicleSelected[a].ld && vm.aVehicleSelected[a].uld && vm.aVehicleSelected[a].rKm)) {
          //   allocationOk = false;
          // }

          // if (!(values.branch)) {
          //   allocationOk = false;
          // }

          // this.totalWeight = 0;
          // for (let g = 0; g < values.gr.length; g++) {
          //   this.totalWeight += values.gr[g].weight;
          //   if (!values.gr[g].weight) {
          //     allocationOk = false;
          //   }
          // }
          // if (this.totalWeight > (this.receivedVehicle[a].capacity_tonne + (this.receivedVehicle[a].capacity_tonne * (this.receivedVehicle[a].overloadAllowed || 0) / 100))) {
          //   return this.commonService.errorModal('Error', 'weight cannot be greater than allowed Capacity');
          // }
        }
      } else {
        this.commonService.warningModal('warning', 'Vehicle not Available.');
        allocationOk = false;
      }
      if (allocationOk) {

        let allocationData = [];
        let allocationDataFinal: any = [];
        allocationData = this.receivedVehicle;
        for (let a = 0; a < allocationData.length; a++) {
          allocationDataFinal[a] = {};
          allocationDataFinal[a]['imd'] = [];
          this.imd && Array.isArray(this.imd) && this.imd.forEach((obj:any,i:any) => {
            allocationDataFinal[a]['imd'].push(obj);
          })
          // allocationDataFinal[a]['imd'] = [
          //   {
          //     _id :  this.imd[a] && this.imd[a]._id,
          //     c :  this.imd[a] && this.imd[a].c ,
          //     d :  this.imd[a] && this.imd[a].d,
          //     sf :  this.imd[a] && this.imd[a].sf,
          //     s :  this.imd[a] && this.imd[a].s
          //   }
          // ]
          allocationDataFinal[a].vehicle_no = allocationData[a].vehicle_reg_no;
          allocationDataFinal[a].vehicle = allocationData[a]._id;
          if(this.route_name) {
            allocationDataFinal[a].route = this.route_name._id;
            allocationDataFinal[a].route_name = this.route_name.name;
          }
          if(this.driver) {
            allocationDataFinal[a].driver = this.driver._id;
            allocationDataFinal[a].driver_name =this.driver.name;
          }
          // allocationDataFinal[a].route = allocationData[a].route && allocationData[a].route._id;
          // allocationDataFinal[a].route_name = `${values.loading_point.c} to ${values.unloading_point.c}`;
          // allocationDataFinal[a].branch = allocationData[a].branch || values.branch;
          if(values.loading_point && values.unloading_point) {
            allocationDataFinal[a]['rName'] = `${this.ld.nativeElement.c} to ${this.ud.nativeElement.c}`;
            allocationDataFinal[a]['rKm'] =  values.rKm || 1;
          }
          if(this.configs.booking && this.configs.booking.showGoogleRoute) {
            allocationDataFinal[a].ld = { 'c':this.ld.nativeElement.c,
                                          'd':this.ld.nativeElement.d,
                                          'f':this.ld.nativeElement.f,
                                          'location':this.ld.nativeElement.location,
                                          'pin':this.ld.nativeElement.pin,
                                          's':this.ld.nativeElement.s
                                        };
            allocationDataFinal[a].uld = {'c':this.ud.nativeElement.c,
                                          'd':this.ud.nativeElement.d,
                                          'f':this.ud.nativeElement.f,
                                          'location':this.ud.nativeElement.location,
                                          'pin':this.ud.nativeElement.pin,
                                          's':this.ud.nativeElement.s
                                        };
          }
          //allocationDataFinal[a].driver = $scope.formDataSelected.driver;
          // allocationDataFinal[a].trip_manager = vm.trip_manager;
          // allocationDataFinal[a].loading_babu = values?.loading_manager;
          allocationDataFinal[a].serviceTyp = allocationData[a].serviceTyp || this.serviceTyp;
          allocationDataFinal[a].vendor = allocationData[a].vendor && allocationData[a].vendor._id;
          allocationDataFinal[a].trip_start = values.date || new Date();
          allocationDataFinal[a].allocation_date = values.date || new Date();
          allocationDataFinal[a].vendorDeal = allocationData[a].vendorDeal || {};

          allocationDataFinal[a].gr = [];
          if(values.gr.length>0) {
            for (let v = 0; v <values.gr.length; v++) {
              allocationDataFinal[a].gr[v] = {
                ...values.gr[v]
              };
              // for trip memo
              if(allocationDataFinal[a].gr[v].tMemo && allocationDataFinal[a].gr[v].tMemo.tMNo){
                if(this.configs.booking && this.configs.booking.showGoogleRoute) {
                  allocationDataFinal[a].gr[v].acknowledge = {
                    source: values.loading_point && values.loading_point.c,
                    destination: values.unloading_point && values.unloading_point.c
                  };
                }else if(this.route_name && this.route_name._id ){
                  allocationDataFinal[a].gr[v].acknowledge = {
                    source: this.route_name.source && this.route_name.source.c,
                    destination: this.route_name.destination && this.route_name.destination.c
                  };
                }
                // trip memo validation end
              }else if(!allocationDataFinal[a].gr[v].acknowledge){
                allocationDataFinal[a].gr[v].acknowledge = {
                  source: values.loading_point && values.loading_point.c,
                  destination: values.unloading_point && values.unloading_point.c
                };
              }
              allocationDataFinal[a].gr[v].branch = allocationDataFinal[a].gr[v].branch && allocationDataFinal[a].gr[v].branch._id || values.gr[v].branch_id && values.gr[v].branch_id._id || values.branch;
              // allocationDataFinal[a].gr[v].branch = allocationData[a].gr[v].branch_id._id;
              if(this.customer)
              allocationDataFinal[a].gr[v].customer = this.customer;
              allocationDataFinal[a].gr[v].billingParty = allocationDataFinal[a].gr[v].billingParty && allocationDataFinal[a].gr[v].billingParty._id || values.gr[v].billing_party && values.gr[v].billing_party._id;
              allocationDataFinal[a].gr[v].consignee = Array.isArray(values.gr[v].consignee) ? (values.gr[v].consignee[0] && values.gr[v].consignee[0]._id) : (values.gr[v].consignee && values.gr[v].consignee._id);
              allocationDataFinal[a].gr[v].consignor = allocationDataFinal[a].gr[v].consignor && allocationDataFinal[a].gr[v].consignor._id || values.gr[v].consigner && values.gr[v].consigner._id;
            }
          }else{
            if(this.configs.booking && this.configs.booking.showGoogleRoute) {
              allocationDataFinal[a].gr.push({
                'rName': allocationDataFinal[a].rName,
                'ld': allocationDataFinal[a].ld,
                'uld': allocationDataFinal[a].uld,
                'customer': this.customer,
                acknowledge:{
                  source : allocationDataFinal[a].ld && allocationDataFinal[a].ld.c,
                  destination : allocationDataFinal[a].uld &&  allocationDataFinal[a].uld.c
                }
              });

            }else if(this.route_name && this.route_name._id ){
              allocationDataFinal[a].gr.push({
                route: this.route_name._id,
                route_name: this.route_name && this.route_name.name,
                'customer': this.customer,
                acknowledge:{
                  source :this.route_name.source.c,
                  destination :this.route_name.destination.c
                }
              });
            }
        }
        }
        allocationDataFinal.forEach((item: any)=>{
          if(this.VdealpopupData) {
            item.branch = this.VdealpopupData.branch;
            item.panNumber = this.VdealpopupData.panNumber;
            item.vendor = this.VdealpopupData.vendor;
            item.vendorDeal = this.VdealpopupData.vendorDeal;
          }
        });
        this.saveData(allocationDataFinal);
      } else {
          this.commonService.warningModal('warning', 'route, branch not added on all vehicle. Please check it.');
      }
  }

  AdTMmodel(mod:string,grdata:any,idx:number){
    if(this.preparegrArr && this.preparegrArr[0] && this.preparegrArr[0].tMemo){

      this.addtripmemoModal('Trip Memo Popup',this.preparegrArr[0],idx =0);

    }else if(this.preparegrArr && this.preparegrArr[0] &&  this.preparegrArr[0].grNumber){
      this.commonService.error('Gr already assign not able to add trip memo');
      return;
    }else{
      this.addtripmemoModal('Trip Memo Popup',grdata,idx);
    }

  }
  upsertGrModaldata(mod:string,grdata:any,idx:number){
    if(grdata && grdata.tMemo &&  grdata.tMemo.tMNo){

      this.addtripmemoModal('Trip Memo Popup',grdata,idx);

    }else{

      this.upsertGrModal('Edit GR',grdata,idx,true);

    }

  }

  upsertGrModal(mod:string,grdata:any,idx:number,e:any) {
    if(!e) return;
    if(this.preparegrArr && this.preparegrArr[0] && this.preparegrArr[0].tMemo){
      this.commonService.error('trip memo already assign not able to add gr');
      return;
    }
    grdata = grdata || {};
    grdata.acknowledge = {};
    if(this.ld && this.ld.nativeElement &&this.ld.nativeElement.c || this.ud &&  this.ud.nativeElement && this.ud.nativeElement.c){
      grdata.acknowledge.source = this.ld.nativeElement.c;
      grdata.acknowledge.destination = this.ud.nativeElement.c;
    }
    if(this.route_name) {
      grdata.acknowledge.source = this.route_name.source.c;
      grdata.acknowledge.destination = this.route_name.destination.c;
    }
    if(this.customer) {
      grdata.customer = this.customer;
    }
    const modal = this.modal.create({
      nzTitle: mod,
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 5,
      nzContent: GrUpsertComponent,
      nzComponentParams: {
        InputData : 'modal',
        'mod': mod,
        'GRpopupdata': grdata,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            // console.log(componentInstance);
            componentInstance?.onSubmit();
            this.addRowGr(idx,componentInstance?.GRpopupdata);
            console.log(componentInstance?.GRpopupdata);
            if(componentInstance?.GrSubmissionFrom.valid && componentInstance?.Gr_valid){
              this.isGRValid = true;
              modal.destroy();
            } else{
              this.preparegrArr.pop();
              this.isGRValid = false;
            }
          }
        }
      ]
    });
  }

  addvendordealModal(mod:string,dealdata:any,idx:number) {
    dealdata = dealdata || {};
    dealdata.vendor = this.f.vendor.value;
    const modal = this.modal.create({
      nzTitle: 'Vendor Deal',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 6,
      nzContent: VendordealPopupComponent,
      nzComponentParams: {
        InputData : 'modal',
        'mod': mod,
        'VdealpopupData': dealdata,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            console.log(componentInstance?.VdealpopupData);
            this.VdealpopupData = componentInstance?.VdealpopupData;
            if(componentInstance?.dealForm?.valid){
              this.vdealValid = true;
              modal.destroy();
            } else{
              this.vdealValid = false;
            }

          }
        }
      ]
    });
  }
  addtripmemoModal(mod:string,oTripMemo:any,idx:number) {
    oTripMemo = oTripMemo || {};
    if(this.customer)
    oTripMemo.customer = this.customer;
    const modal = this.modal.create({
      nzTitle: 'Trip  Memo',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 6,
      nzContent: TripMemoUpsertComponent,
      nzComponentParams: {
        'mod': mod,
        aTripData: oTripMemo,
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            console.log(componentInstance?.aTripData);
            if(componentInstance?.dealForm?.valid){
              this.oTripMemo = {};
              this.oTripMemo = componentInstance?.aTripData;
              this.oTripMemo.gr_type = "Trip Memo";
              this.addRowGr(idx,this.oTripMemo);
              modal.destroy();
            }
          }
        }
      ]
    });
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
        this.showTable = false;
        this.filterObj = {};
        this.router.navigateByUrl('home/operation/trip')
      }
    });
  }

  addRowGr(idx:number, GRpopupdata: any) {
    if(idx+1) {
      this.preparegrArr[idx] = GRpopupdata;
    } else  {
      this.preparegrArr.push(GRpopupdata);
    }
  }
  backToListView(){
    this.router.navigateByUrl('home/operation/trip');
  }
}
