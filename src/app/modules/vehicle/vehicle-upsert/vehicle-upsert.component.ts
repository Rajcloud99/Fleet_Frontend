import {Component, HostListener, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { CommonService } from '../../../services/common.service';
import {StorageService} from "../../../services/storage.service";
import {ConstantService} from "../../../services/constant.service";

@Component({
  selector: 'app-vehicle-upsert',
  templateUrl: './vehicle-upsert.component.html',
  styleUrls: ['./vehicle-upsert.component.scss']
})
export class VehicleUpsertComponent implements OnInit {
  submitted = false; // user not able to submit the data if form is invalid
  getId: any; // store the id of param
  mode: any; // checking the add or upsert mode
  vendorgetdata :any;
  localdata:any;
  masterConfigs:any;
  aSegmentType:any;
  receivedData :any;
  ownershiptype = ["Own", "Market","Sold"];
  aCategory:any;
  vehiclegroupdata :any;
  vehicletypedata:any;
  vehicleaccountdata :any;
  innerWidth:any;
  @Input () InputData : any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private masterService: MasterService,
              private storageService: StorageService,
              private constantService: ConstantService,
              private commonService: CommonService) {
    this.route.params.subscribe(queryParam => {
      if (queryParam._id) {
        // Edit / Update Mode
        this.mode = 2;
        this.getId = queryParam._id;
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = currentState && currentState.extras.state;
        this.fillFormdata(this.receivedData);
      } else {
        // Add Mode
        this.mode = 1;
      }
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }

  ngOnInit() {
    this.commonService.setNavTittleAndMenu(" Vehicle Details")
    this.innerWidth = window.innerWidth;
    this.aCategory = this.constantService.constants.aCategoryforVehicle;
   this.localdata = this.storageService.get('userData');
   this.masterConfigs=this.localdata.configs.master;
    this.aSegmentType =  this.localdata.configs.master.aSegmentType || this.constantService.constants.aSegmentType;

    if(this.getId) {
      if (this.receivedData && this.receivedData.vendor_id && this.receivedData.vendor_name) {
        this.vendorgetdata = [{
          name: this.receivedData?.vendor_name,
          _id: this.receivedData?.vendor_id
        }];
      }
      if (this.receivedData && this.receivedData.account) {
        this.vehicleaccountdata = [this.receivedData?.account];
      }
      if (this.receivedData && this.receivedData.veh_type) {
        this.vehicletypedata = [this.receivedData?.veh_type || ''];
      }
      if (this.receivedData && this.receivedData.veh_group && this.receivedData.veh_group_name) {
        this.vehiclegroupdata = [{
          _id: this.receivedData && this.receivedData?.veh_group,
          name: this.receivedData && this.receivedData?.veh_group_name
        }];
      }
    }
  }
    // this.registerForm = this.formBuilder.group({
  registerForm = this.fb.group({
      vehicle_reg_no: [null, [Validators.required,Validators.minLength(9),Validators.maxLength(11)]],
      device_imei: [null],
      ownershipType: [null, [Validators.required]],
      vendor: [null],
      rc_book_no: [null],
     engine_no: [null],
     chassis_no: [null],
      sd: [null],
      sa: [null],
      status:[null],
      veh_type: [null],
      group: [null],
      account: [null],
      category: [null, [Validators.required]],
      segment_type: [null],
    });


  onSubmit() {
    this.submitted = true;
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    if(this.registerForm.value.ownershipType == 'Own'){

      // if(!(this.registerForm.value.account && this.registerForm.value.account.name) && this.InputData != 'modal'){
      //   this.commonService.error(" Account should be Mandatory");
      //   return;
      // }
    }else if(this.registerForm.value.ownershipType == 'Sold'){

      if(!this.registerForm.value.sd){
        this.commonService.error(" Sold Date should be Mandatory");
        return;
      }
      if(!this.registerForm.value.sa){
        this.commonService.error(" Sold Amount should be Mandatory");
        return;
      }
    }
    // if(this.InputData != 'modal' && this.registerForm.value.account && this.registerForm.value.account.name){
    //   console.log((this.registerForm.value.vehicle_reg_no).toUpperCase());
    //     if((this.registerForm.value.vehicle_reg_no).toUpperCase() != (this.registerForm.value.account.name).toUpperCase()){
    //       this.commonService.error("Registered Vehicle No. and Account Name Must be Same");
    //       return;
    //     }
    //   }
    let formData = this.registerForm.value;
    this.clean(formData);
    if (formData.ownershipType == 'Market'){
      if(!formData.vendor){
        this.commonService.error("Vendor is Mandatory");
        return;
      }else {
        const idx = this.vendorgetdata.findIndex((x: any) => x._id === formData.vendor);
        if (idx + 1) {
          formData.vendor = this.vendorgetdata[idx];
        } else {
          console.log("vendor not found");
        }
      }
  }

  if(!this.masterConfigs?.regVehicle?.groupRequired){
    const idy = this.vehiclegroupdata.findIndex((y:any) => y._id === formData.group);
    if(idy+1) {
      formData.group = this.vehiclegroupdata[idy];
    }else{
      console.log("vendor group not found");
    }
  }

    let data = {
      vehicle_reg_no : formData?.vehicle_reg_no,
      device_imei : formData?.device_imei,
      ownershipType: formData.ownershipType,
      vendor_id: formData.vendor?._id,
      vendor_name: formData.vendor?.name,
      veh_type: formData.veh_type?._id,
      veh_type_name:formData.veh_type?.name,
      segment_type: formData.segment_type,
      veh_group: formData.group?._id,
      veh_group_name: formData.group?.name,
      category: formData.category,
      account:  formData.account?._id,
      rc_book_no: formData?.rc_book_no,
      engine_no:  formData?.engine_no,
      chassis_no:  formData?.chassis_no,
      sd:formData?.sd,
      sa: formData?.sa

    }
    this.clean(data);
    if (this.mode === 2 && this.getId) {

      this.updateData(data);
    } else {
      this.saveData(data);
    }
  }
  // save data (add case)
  saveData(data: any) {
    this.masterService.addvehicle(data).subscribe((data: any) => {
      console.log(data);
      if (data) {
          if(this.InputData === 'modal') return;
          this.router.navigateByUrl('home/master/vehicle');
      }
    });
  }
  //on serch data function
  onSearchvender(value: any) {
    if (value) {
      let req = {
        name: value,
        no_of_docs: 5,
        deleted: false
      }
      this.masterService.getAllvender(req).subscribe((res: any) => {
        this.vendorgetdata = res;
      });
    }
  }
  onSearchvehicletype() {
      let req = {
        all: true
      }
      this.masterService.getVehicleType(req).subscribe((res: any) => {
        this.vehicletypedata = res;
      });
  }
  onSearchvehiclegroup() {
      let req = {
        // all: true
      }
      this.masterService.getGroupVehicle(req).subscribe((res: any) => {
        this.vehiclegroupdata = res;
      });

  }
  onSearchaccount(value: any) {
    if (value) {
      let req = {
        group: "Vehicle",
        name: value,
        no_of_docs: 6
      }
      this.masterService.getAllaccount(req).subscribe((res: any) => {
        this.vehicleaccountdata = res.data;
      });
    }
  }
//////////////////////////////////
  // update data (update case)
  updateData(data:any) {
    // this.clean()
    this.masterService.editvehicle(this.getId, data).subscribe((data: any) => {
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/master/vehicle');
      }
    });
  }
  clean(obj: any) {
    for (let propName in  obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
  }

  fillFormdata(data:any) {
    this.registerForm.patchValue({
      vehicle_reg_no: data?.vehicle_reg_no,
      device_imei: data?.device_imei,
      ownershipType: data?.ownershipType,
      vendor: data?.vendor_id,
      veh_type: data?.veh_type,
      segment_type: data?.segment_type,
      group:data?.veh_group,
      category: data?.category,
      account: data?.account,
      rc_book_no: data?.rc_book_no,
      engine_no:  data?.engine_no,
      chassis_no:  data?.chassis_no,
      sd: data?.sd,
      sa: data?.sa,
      status: data?.status
    });
  }
  backToListView(){
    this.router.navigateByUrl('home/master/vehicle');
  }


}
