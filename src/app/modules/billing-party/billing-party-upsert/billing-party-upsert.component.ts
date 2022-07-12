import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ValidationErrors, FormControl } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { CommonService } from 'src/app/services/common.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { ConstantService } from 'src/app/services/constant.service';

@Component({
  selector: 'app-billing-party-upsert',
  templateUrl: './billing-party-upsert.component.html',
  styleUrls: ['./billing-party-upsert.component.scss']
})
export class BillingPartyUpsertComponent implements OnInit {
  submitted = false;
  getId:any;
  mode: any;
  receivedData: any;
  receivedAccount:any;
  receivedAccountBp:any;
  aGSTstates: any;

  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private constantService: ConstantService,
    private commonService: CommonService) {
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

     backToListView() {
      this.router.navigateByUrl('home/master/billingParty');
    }

  onChanges() {
    this.billingPartyForm.get('state_name')!.valueChanges.subscribe((value)=>{
        this.fillState(value);
        
    });
  }


     billingPartyForm = this.fb.group({
      name:[null, [Validators.required, Validators.maxLength(150)]],
      billName:[null, [Validators.required, Validators.maxLength(150)]],
      address:[null, [Validators.required, Validators.maxLength(300)]],
      gstin: [null, [Validators.required,Validators.maxLength(15), Validators.pattern('[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}')]],
      state_name:[null, [Validators.required]],
      state_code:[null, [Validators.required]],
      state_name_code:[null, [Validators.required]],
      businessLocation:[null, [Validators.required, Validators.maxLength(50)]],
      account:[null,[Validators.required]],
      withHoldAccount:[null, [Validators.required]],
    });

    get f() {
      return this.billingPartyForm.controls;
    }

    fillFormdata (data: any) {
      this.billingPartyForm.patchValue({
        name: data && data.name,
        billName: data && data.billName,
        address: data && data.address,
        gstin: data && data.gstin,
        state_name: data && data.state_name,
        state_code: data && data.state_code,
        state_name_code:data && data.state_name_code,
        businessLocation: data && data.businessLocation,
        account: data && data.account && data.account?._id,
        withHoldAccount:data && data.account && data.withHoldAccount?._id

      })
    }

  ngOnInit(): void {

    let tittle=this.getId ? 'Billing Party Edit' : 'Billing Party Add';
    this.commonService.setNavTittleAndMenu(tittle);
    this.aGSTstates = this.constantService.constants.aGSTstates;
    this.onChanges();
    if  (this.getId){
      const fillstate = this.receivedData?.state_name;
      this.fillState(fillstate);
      this.receivedAccount =  [this.receivedData?.account];
      this.receivedAccountBp =  [this.receivedData?.withHoldAccount];
    }
  }

  fillBillName(event:any) {
    if(event) {   
      this.billingPartyForm.controls.billName.setValue(event,{ emitEvent: false });
    }
  }

  fillState(event:any) {
    if(event) {
      let findS = this.aGSTstates.find((item: { state: any; }) => item.state === event);
            this.billingPartyForm.controls.state_name.setValue(findS.state,{ emitEvent: false });
            this.billingPartyForm.controls.state_code.setValue(findS.first_two_txn,{ emitEvent: false });
            this.billingPartyForm.controls.state_name_code.setValue(findS.state_code,{ emitEvent: false });
      }
  }
  

  
  onChangeSearchAc(value: any, type: string): any {
    this.receivedAccount =null; 
  if (value) {
    let reqBody = {
      'group': 'Customer',
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


onChangeSearchBp(value: any, type: string): any {
  this.receivedAccountBp =null;
  if (value) {
    let reqBody = {
      'group': 'Debtor with Hold',
      'skip':1,
      'request_id': Date.now() + '' + Math.round(Math.random() * 100),
      'validate': 'all',
      'name':value
    };
    this.masterService.getAllAccount( reqBody ).subscribe((data: any) => {
      if (data) {
        this.receivedAccountBp = data && data.data;
      }
    });
  }
}

  onSubmit() {
    // this.submitted = true;
    for (const i in this.billingPartyForm.controls) {
      this.billingPartyForm.controls[i].markAsDirty();
      this.billingPartyForm.controls[i].updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.billingPartyForm.invalid) {
      return;
    }
    const formData = this.billingPartyForm.value;
    this.clean(formData);
    if (this.mode === 2 && this.getId) {
      this.updateData(formData);
    } else {
      this.saveData(formData);
    }
  }


  saveData(formData: any) {
    formData['billing_dates']=new Date().toISOString();
    this.masterService.addBillingParty(formData).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/billingParty');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editBillingParty(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/billingParty');
      }
    });
  }

  reset() {
    for (let propName in this.billingPartyForm.value) {
      delete this.billingPartyForm.value[propName];
    }
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
