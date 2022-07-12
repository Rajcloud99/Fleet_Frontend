import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonService } from 'src/app/services/common.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {StorageService} from "../../../services/storage.service";
import { MasterService } from '../../master.service';
import {
  faEye,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-driver-upsert',
  templateUrl: './driver-upsert.component.html',
  styleUrls: ['./driver-upsert.component.scss']
})

export class DriverUpsertComponent implements OnInit {
  submitted = false;
  fileInfo:any =null;
  faEye = faEye;
  faUpload= faUpload;
  getId:any;
  mode: any;
  receivedData: any;
  receivedAccount:any;
  idTypeList=[
    {name: 'Voter Card', value: 'VoterId'},
    {name: 'Aadhar Card', value: 'AadharCard'},
    {name: 'Pan Card', value: 'PanCard'},
    ];
  localdata: any;
  masterConfigs: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private storageService: StorageService,
    private commonService: CommonService
    ) {
      this.route.params.subscribe(queryParam => {
        if(queryParam._id) {
          // Edit or Update Mode
          this.mode = 2;
          this.getId = queryParam._id;
          const currentState = this.router.getCurrentNavigation();
          this.receivedData = currentState && currentState.extras.state;
          this.fillFormdata(this.receivedData);
          // this.getIdData();
        } else {
          // Add Mode
          this.mode = 1;
        }
      })
    }

    driverForm = this.fb.group({
      name:[null, [Validators.required, Validators.maxLength(50)]],
      employee_code:[null, [Validators.required,  Validators.maxLength(15)]],
      license_no:[null, [Validators.required, Validators.maxLength(15)]],
      prim_contact_no:[null,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      account:[null],
      id_proof_type:[null],
      id_proof_value:[null, [Validators.maxLength(15)]]
    });

    get f() {
      return this.driverForm.controls;
    }

    fillFormdata (data: any) {
      this.driverForm.patchValue({
        name: data && data.name,
        employee_code: data && data.employee_code,
        license_no:data && data.license_no,
        prim_contact_no: data && data.prim_contact_no,
        account: data && data.account && data.account,
        id_proof_type: data && data.id_proof_type,
        id_proof_value:data && data.id_proof_value
      })
    }

  ngOnInit() {
    this.localdata = this.storageService.get('userData');
   this.masterConfigs=this.localdata.configs.master;
    if  (this.getId){
      this.receivedAccount =  [this.receivedData?.account];
    }
   let tittle= this.getId ? 'Driver Edit' : 'Driver Add';
   this.commonService.setNavTittleAndMenu(tittle);
  }

  backToListView() {
    this.router.navigateByUrl('home/master/driver');
  }


onChangeSearch(value: any): any {
  // let value = e.target.value;
  this.receivedAccount =null;
  if (value) {
    let reqBody = {
      'group': 'Driver',
      'skip':1,
      'request_id': Date.now() + '' + Math.round(Math.random() * 100),
      'validate': 'all',
      'name':value
    };
    this.masterService.getAllAccount( reqBody ).subscribe((data: any) => {
      if (data) {
        this.receivedAccount = data && data.data;
      }
    });
  }
}


  onSubmit() {
    // this.submitted = true;
    for (const i in this.driverForm.controls) {
      this.driverForm.controls[i].markAsDirty();
      this.driverForm.controls[i].updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.driverForm.invalid) {
      return;
    }
    const formData = this.driverForm.value;
    this.clean(formData);
    if (this.mode === 2 && this.getId) {
      if(formData.account && this.driverForm.value.account.ledger_name !=this.driverForm.value.name)
      return this.commonService.error("Name and Account name should be same!");
      this.updateData(formData);
    } else {
      this.saveData(formData);
    } 
  }


  saveData(formData: any) {
    this.masterService.addDriver(formData).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/driver');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editDriver(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/driver');
      }
    });
  }

  reset() {
    for (let propName in this.driverForm.value) {
      delete this.driverForm.value[propName];
    }
    // this.commonServ.cardReflectDataObj.next(this.receivedData);
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


}
