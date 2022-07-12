import {Component, HostListener, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { CommonService } from '../../../services/common.service';
import {StorageService} from "../../../services/storage.service";
import {ConstantService} from "../../../services/constant.service";

@Component({
  selector: 'app-vendor-upsert',
  templateUrl: './vendor-upsert.component.html',
  styleUrls: ['./vendor-upsert.component.scss']
})
export class VendorUpsertComponent implements OnInit {
  submitted = false; // user not able to submit the data if form is invalid
  getId: any; // store the id of param
  mode: any; // checking the add or upsert mode
  vendorgetdata :any;
  // configs:any;
  localdata:any;
  aSegmentType:any;
  receivedData :any;
  ownershiptype = ["Market","Associate"];
  aCategory =["Owner","Broker"];
  states:any;
  innerWidth:any;
  vendorAccountdata :any;
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
    // this.localdata = this.storageService.get('userData');
    // this.configs =  this.localdata.configs;

    this.commonService.setNavTittleAndMenu("Vendor Details")

    this.innerWidth = window.innerWidth;
    this.states = this.constantService.constants.aGSTstates;

    if(this.getId) {
      if (this.receivedData && this.receivedData.account) {
        this.vendorAccountdata = [this.receivedData?.account];
      }
    }

  }

  registerForm = this.fb.group({
    pan_no: [null, [Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}')]],
    name: [null, [Validators.required]],
    state: [null, [Validators.required]],
    state_code: [null, [Validators.required]],
    line1: [null, [Validators.required]],
    contact_person_name: [null, [Validators.required]],
    prim_contact_no: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    gstn: [null, [Validators.minLength(15),Validators.maxLength(15),Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}')]],
    city: [null,  [Validators.required]],
    ownershipType: [null, [Validators.required]],
    address_proof_type: [null, [Validators.required]],
    address_proof_no: [null, [Validators.required]],
    phn: [null, [Validators.required]],
    // account: [null,  [Validators.required]],
    category: [null, [Validators.required]],
    country: ['india', [Validators.required]],
    noOfVehilce : [null,[Validators.required]]

  });
  fillState(event:any) {
    if(event) {
      let findS = this.states.find((item: { state: any; }) => item.state === event);
      this.registerForm.controls.state_code.setValue(findS.first_two_txn,{ emitEvent: false });
    }
  }
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
    // if(this.registerForm.value.ownershipType == 'Own'){
    //
    //   if(!(this.registerForm.value.account && this.registerForm.value.account.name)){
    //     this.commonService.error(" Account should be Mandatory");
    //     return;
    //   }
    // }
    // if(this.registerForm.value.account && this.registerForm.value.account.name){
    //   console.log((this.registerForm.value.vehicle_reg_no).toUpperCase());
    //   if((this.registerForm.value.vehicle_reg_no).toUpperCase() != (this.registerForm.value.account.name).toUpperCase()){
    //     this.commonService.error("Registered Vehicle No. and Account Name Must be Same");
    //     return;
    //   }
    // }
    let formData = this.registerForm.value;
    this.clean(formData);
    let data = {
      name : formData?.name,
      ownershipType: formData?.ownershipType,
      address_proof_type: formData.address_proof_type,
      address_proof_no:formData.address_proof_no,
      gstn: formData.gstn,
      ho_address:{city: formData?.city,country : formData?.country,line1:formData.line1,state:formData.state,state_code:formData?.state_code},
      category: [formData.category],
      // account:  formData.account,
      contact_person_name: formData?.contact_person_name,
      pan_no: formData?.pan_no,
      phn: formData?.phn,
      prim_contact_no:  formData?.prim_contact_no,
      noOfVehilce:  formData?.noOfVehilce,

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
    this.masterService.addvendor(data).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.router.navigateByUrl('home/master/vendor');
      }
    });
  }
  onSearchaccount(value: any) {
    if (value) {
      let req = {
        group: ["Vendor"],
        name: value,
        no_of_docs: 6
      }
      this.masterService.getAllaccount(req).subscribe((res: any) => {
        this.vendorAccountdata = res.data;
      });
    }
  }
//////////////////////////////////
  // update data (update case)
  updateData(data:any) {
    // this.clean()
    this.masterService.editvendor(this.getId, data).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/vendor');
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
      name : data?.name,
      ownershipType: data?.ownershipType,
      address_proof_type: data?.address_proof_type,
      address_proof_no:data?.address_proof_no,
      gstn: data?.gstn,
      city: data?.ho_address?.city,
      country : data?.ho_address?.country,
      line1:data?.ho_address?.line1,
      state:data?.ho_address?.state,
      state_code:data?.ho_address?.state_code,
      category: data?.category[0],
      // account:  data?.account?._id,
      contact_person_name: data?.contact_person_name,
      pan_no: data?.pan_no,
      phn: data?.phn,
      prim_contact_no:  data?.prim_contact_no,
      noOfVehilce:  data?.noOfVehilce,
    });
  }
  backToListView(){
    this.router.navigateByUrl('home/master/vendor');
  }
}
