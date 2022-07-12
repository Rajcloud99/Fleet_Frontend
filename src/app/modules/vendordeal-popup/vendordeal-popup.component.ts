import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {MasterService} from "../master.service";
import {StorageService} from "../../services/storage.service";
import {CommonService} from "../../services/common.service";
import {ConstantService} from "../../services/constant.service";
import {FormulaService} from "../../services/formula.service";

@Component({
  selector: 'app-vendordeal-popup',
  templateUrl: './vendordeal-popup.component.html',
  styleUrls: ['./vendordeal-popup.component.scss']
})
export class VendordealPopupComponent implements OnInit {

  //***************************************tds get help**********
  tdsCategory:any;
  tdsVerify:any;
  tdsSources:any;
  vendorAccnt:any;
  allTDSRate:any;
  updatetripdata:any;
  munsiyanaFromula:any;
  brokergetdata:any;
  branchgetdata :any;
  lorryAcgetdata:any;
  pbList:any;
  ptList:any;
  cClientId:any;
  dealAcc:any;
  vendorDealPayment:any;
  selectedStationary:any;
  submitted = false; // user not able to submit the data if form is invalid
  getId: any; // store the id of param
  mode: any; // checking the add or upsert mode
  vendorgetdata :any;
  formvalidation:boolean=true;
  localdata:any;
  aSegmentType:any;
  receivedData :any;
  @Input () InputData: any;// know whether it is modal or not
  @Input () VdealpopupData: any;// data for edit mode of v-deal-modal
  @Input () mod: any;// mode of vdeal-modal (add or edit)
  @Input () aTripData : any;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private masterService: MasterService,
              private storageService: StorageService,
              private constantService: ConstantService,
              private formulaService:FormulaService,
              private commonService: CommonService) {
  }

  get f() {
    return this.dealForm.controls;
  }

  ngOnInit() {
    if(this.InputData === 'modal' && this.VdealpopupData)
      this.aTripData = this.VdealpopupData;
    this.munsiyanaFromula =  this.formulaService.formulafactory('Total With Munshiyana');
    this.pbList = this.constantService.constants.aWeightTypes;
    this.ptList = this.constantService.constants.paymentType;
    this.localdata = this.storageService.get('userData');
    this.cClientId = this.localdata.client_config.clientId;
    this.dealAcc =  this.localdata.configs.client_allowed.filter((o: { clientId: any; }) => o.clientId === this.localdata.client_config.clientId)[0];
    this.vendorDealPayment = this.localdata.configs.vendorDeal;
    if(this.aTripData) {
      this.getId = this.aTripData._id;
      this.fillFormdata(this.aTripData);
      if(this.aTripData && this.aTripData.vendor) {
        this.vendorgetdata = [this.aTripData?.vendor];
      }
      if(this.aTripData && this.aTripData.branch) {
        this.branchgetdata = [this.aTripData?.branch];
      }
      if(this.aTripData && this.aTripData.vendorDeal && this.aTripData.vendorDeal.lorryAc) {
        this.lorryAcgetdata = [this.aTripData?.vendorDeal.lorryAc];
      }
      if(this.aTripData && this.aTripData.vendorDeal && this.aTripData.vendorDeal.broker) {
        this.brokergetdata = [this.aTripData?.vendorDeal.broker];
      }
      if (this.aTripData.vendorDeal && this.aTripData.vendorDeal.loading_slip) {
        this.selectedStationary = [{billBookId: this.aTripData.vendorDeal?.lsStationaryId,bookNo: this.aTripData.vendorDeal?.loading_slip}];
        this.fillhireslip();
      }
      if(this.InputData === 'modal' && this.mod === 'Edit Vendor Deal') {
        this.fillFormdata(this.VdealpopupData);
      }
    }
  }
  dealForm = this.fb.group({
    panNumber: [null,[Validators.required]],
    vendor: [null,[Validators.required]],
    branch: [null, [Validators.required]],
    vendorDeal: this.fb.group({
      deal_at: [null, [Validators.required]],
      loading_slip: [null, [Validators.required]],
      broker: [null, [Validators.required]],
      lorryAc: [null, [Validators.required]],
      payment_type: [null, [Validators.required]],
      weight_type: [null,[Validators.required]],
      // weight_type: [null],
      tdsPercent: [null],
      weightPercent: [null],
      pmtWeight: [null],
      pmtRate: [null],
      otherExp: [null],
      perUnitPrice: [null],
      totalUnits: [null],
      total_expense: [null,[Validators.required]],
      munshiyana: [null],
      totWithMunshiyana: [null, [Validators.required]],
      advance: [null],
      tdsAmount: [null],
      toPay: [null, [Validators.required]],
    }),
  });


  onSubmit() {
    this.submitted = true;
    for (const i in this.dealForm.controls) {
      this.dealForm.controls[i].markAsDirty();
      this.dealForm.controls[i].updateValueAndValidity();
    }
    //******* vendor deal custom from validation
    if(!this.dealForm.value.vendor){
      this.commonService.error('vendor is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.branch){
      this.commonService.error('branch is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.loading_slip){
      this.commonService.error('hire Slip No is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.deal_at){
      this.commonService.error('Deal Date is mandatory');
      this.formvalidation =false;
      return;
    } else if(!this.dealForm.value.vendorDeal.lorryAc){
      this.commonService.error('Lorry Hire A/c is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.broker){
      this.commonService.error('Broker A/c is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.payment_type){
      this.commonService.error('Payment type is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.weight_type){
      this.commonService.error('Payment Basis is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.vendorDeal.total_expense){
      this.commonService.error('Total Expense is mandatory');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.vendorDeal.total_expense <= 0 ){
      this.commonService.error('Total Expense should be greater than 0');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.vendorDeal.total_expense <= this.dealForm.value.vendorDeal.munshiyana ){
      this.commonService.error('Total Expense should be greater than Munshiyana');
      this.formvalidation =false;
      return;
    }

    //custion form validation end
    // stop here if form is invalid
    if (this.dealForm.invalid) {
      return;
    }

    let formData = this.dealForm.value;

    this.clean(formData);
    let data = {
      ...formData
    }
    if(data) {
      data.vendorDeal.lsStationaryId = formData.vendorDeal.loading_slip?.billBookId,
        data.vendorDeal.loading_slip = formData.vendorDeal.loading_slip?.bookNo,
        data.vendorDeal.broker={...formData.vendorDeal?.broker,id:formData.vendorDeal?.broker._id};
    }
    this.clean(data.vendorDeal);
    if(this.InputData === 'modal'){
      this.VdealpopupData = data;
    } else this.saveData(data);

  }
  // save data (add case)
  saveData(data: any) {
      this.masterService.PutVendordeal(this.getId, data).subscribe((data: any) => {
        if (data) {
          this.updatetripdata  = data[0];
        }
      });
    }
  fillhireslip(){
    this.dealForm.controls['vendorDeal'].patchValue({loading_slip: this.selectedStationary[0]});
  }
  // hireslip No Serch Or Centrailized hireslip No. Search
  getBillBookNo(viewValue:any):any {
    this.selectedStationary=[];
    if( viewValue != 'centrailized'){
      viewValue = viewValue.trim();
      if(viewValue.length <1){
        return ;
      }
    }
    if (viewValue != 'centrailized' && !this.f.branch.value) {
      this.commonService.error('Please Select Branch');
      return [];
    }

    if (viewValue != 'centrailized' && !this.f.branch.value.lsBook)
      return [];

    if (!this.dealForm.value?.vendorDeal?.deal_at) {
      this.commonService.error('Deal  Date is required');
      return [];
    }
    let billbook = [];
    if(viewValue  != 'centrailized'){
      for(let  data of (this.f.branch.value.lsBook)){
        billbook.push(data.ref);
      }
    }
    let requestObj :any = {
      bookNo: viewValue,
      billBookId: billbook,
      type: 'Hire Slip',
      useDate: new Date(this.dealForm.value?.vendorDeal?.deal_at),
      status: 'unused',
    };
    if (viewValue === 'centrailized') {
      delete requestObj.billBookId;
      requestObj.centralize = true;
      requestObj.sch = 'onBook';
      requestObj.auto = true;
    }else if(viewValue === 'auto'){
      requestObj.sch = 'onBook';
      requestObj.auto = true;
    }
    this.masterService.getBillStationary(requestObj).subscribe((data: any) => {
      if (viewValue === 'centrailized') {
        if (data[0]) {
          this.selectedStationary=[];
          this.dealForm.controls['vendorDeal'].patchValue({loading_slip: data[0]});
          this.selectedStationary = data[0];
        }}
      if(data){
        this.selectedStationary=[];
        this.selectedStationary = data;
      }
    });
  }

  //on serch data function
  onSearchvendor(value: any) {
    this.vendorgetdata=[];
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


  onSearchvendorpan(value: any) {
    if (value) {
      let req = {
        pan_no: value,
        no_of_docs: 5,
        deleted: false,
        cClientId: this.cClientId,
        validate: "all"
      }
      this.masterService.getAllvender(req).subscribe((res: any) => {
        this.vendorgetdata = res;
      });
    }
  }
  onSearchlorryAc(value: any) {
    this.lorryAcgetdata = [];
      if (value) {
        let req = {
          group: "Lorry Hire",
          name: value,
          no_of_docs: 6
        }
        this.masterService.getAllaccount(req).subscribe((res: any) => {
          this.lorryAcgetdata = res.data;
        });
      }
    }

  onSearchbroker(value: any) {
    this.brokergetdata = [];
    if (value) {
      let req = {
        name: value,
        no_of_docs: 5,
        deleted: false
      }
      this.masterService.getAllvender(req).subscribe((res: any) => {
        this.brokergetdata = res;
      });
    }
  }
  setdata1(data:any){
    this.dealForm.controls['panNumber'].patchValue(data);
  }
//******************** on -select-  vendor function
  onVendorSelect(data:any) {
    this.dealForm.controls.panNumber.setValue(data?.pan_no,{ emitEvent: false });
    this.vendorAccnt = data.account;
    this.tdsVerify = data.tdsVerify;
    this.tdsCategory = data.tdsCategory;
    this.tdsSources = data.tdsSources;

    if (this.tdsSources && this.tdsCategory && this.tdsVerify ) {
      this.getTDSRate();
    }else{
      this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: 0});
      this.munsiayanacal();
    }
  }

// tds rate calculation
  getTDSRate() {
    if(!this.dealForm.value.vendorDeal.deal_at){
      return this.commonService.error('Deal Date required');
    }
    if (this.tdsCategory && this.tdsSources && this.vendorAccnt && this.dealForm.value.vendorDeal?.deal_at) {
      let oReq = {
        date: this.dealForm.value.vendorDeal?.deal_at,
        cClientId: this.cClientId,
      };
      let isGetTDS = true;
      if(this.dealForm.value.vendor && this.dealForm.value.vendor.exeRate && this.dealForm.value.vendor.exeFrom && this.dealForm.value.vendor.exeTo){
        if(new Date(this.dealForm.value.vendor.deal_at) >= new Date(this.dealForm.value.vendor.exeFrom) && new Date(this.dealForm.value.vendor.deal_at) <= new Date(this.dealForm.value.vendor.exeTo)) {
          // this.aTripData.vendorDeal.tdsPercent = this.dealForm.value.vendor.exeRate;
          this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: this.dealForm.value.vendor.exeRate});
          isGetTDS = false;
        }
      }

      if(isGetTDS){
        this.masterService.getTDSRate(oReq).subscribe((res: any) => {
          if (res) {
              if (res && res.length && this.tdsVerify) {
                this.allTDSRate = res[0];
                this.allTDSRate.aRate.forEach((obj: { sources: any; ipRate: any; iwpRate: any; nipRate: any; niwpRate: any; }) => {
                  if (obj.sources === this.tdsSources) {
                    switch (this.tdsCategory) {
                      case 'Individuals or HUF': {
                        if (this.dealForm.value.panNumber) {

                          return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: obj.ipRate});
                        }else {
                          return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: obj.iwpRate});
                        }
                      }
                      case 'Non Individual/corporate': {
                        if (this.dealForm.value.panNumber) {
                          return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: obj.nipRate});
                        } else {
                          return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: obj.niwpRate});
                        }
                      }
                      default:
                        return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: 0});
                    }
                  }
                });
              }else{
                return this.dealForm.controls['vendorDeal'].patchValue({tdsPercent: 0});
              }
            this.munsiayanacal();
            }



        });
    }
    }

  }
//  ****************
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
  onSearchbranch(value: any) {
    this.branchgetdata = [];
    if(value) {
      this.masterService.getAllBranch({name: value}).subscribe((res: any) => {
        this.branchgetdata = res;
      });
    }
  }

  //************************ formula calculation
  paymenttypechange(){
    this.dealForm.controls['vendorDeal'].patchValue({weight_type: null});
    this.dealForm.controls['vendorDeal'].patchValue({weightPercent: null});
    this.dealForm.controls['vendorDeal'].patchValue({pmtRate: null});
    this.dealForm.controls['vendorDeal'].patchValue({perUnitPrice: null});
    this.dealForm.controls['vendorDeal'].patchValue({totalUnits: null});
    this.dealForm.controls['vendorDeal'].patchValue({total_expense: null});
    this.dealForm.controls['vendorDeal'].patchValue({munshiyana: null});
    this.dealForm.controls['vendorDeal'].patchValue({advance: null});
    this.dealForm.controls['vendorDeal'].patchValue({totWithMunshiyana: null});
    this.dealForm.controls['vendorDeal'].patchValue({tdsAmount: null});
    this.dealForm.controls['vendorDeal'].patchValue({toPay: null});
    this.dealForm.controls['vendorDeal'].patchValue({totalPayable: null});
    this.dealForm.controls['vendorDeal'].patchValue({remainingAmount: null});
  }
  calculateTotalPMT() {
    let total_expense = ((this.dealForm.value.vendorDeal.pmtWeight || 0) * (this.dealForm.value.vendorDeal.pmtRate || 0));
    this.totalexpencecal(total_expense);
  }
  calculateTotalpunit() {
    let total_expense = ((this.dealForm.value.vendorDeal.perUnitPrice || 0) * (this.dealForm.value.vendorDeal.totalUnits || 0));
    this.totalexpencecal(total_expense);
  }

  totalexpencecal(total_expense:any){
    this.dealForm.controls['vendorDeal'].patchValue({total_expense: (total_expense|| 0)});
    this.munsiayanacal();
  }
  munsiayanacal(){
    let total  = this.dealForm.value.vendorDeal.total_expense || 0;
    let munsiayana = this.dealForm.value.vendorDeal.munshiyana || 0;
    // this.dealForm.controls['vendorDeal'].patchValue({totWithMunshiyana: ((total + munsiayana) || 0)});

    this.munsiyanaFromula.bind({
      munshiyana: munsiayana,
      total_expense: total,
      otherExp: 0
    });
    this.dealForm.controls['vendorDeal'].patchValue({totWithMunshiyana: this.munsiyanaFromula.eval() || 0});

    if(this.dealForm.value.vendorDeal.totWithMunshiyana){
      let tdsAmount = ((this.dealForm.value.vendorDeal.totWithMunshiyana || 0) * (this.dealForm.value.vendorDeal.tdsPercent || 0) / 100);
      this.dealForm.controls['vendorDeal'].patchValue({tdsAmount: ((tdsAmount) || 0)});
      let topay  = ((this.dealForm.value.vendorDeal.totWithMunshiyana || 0) - (this.dealForm.value.vendorDeal.advance || 0)-(this.dealForm.value.vendorDeal.tdsAmount || 0));
      this.dealForm.controls['vendorDeal'].patchValue({toPay: ((topay) || 0)});
      let totalpayble = ((this.dealForm.value.vendorDeal.totWithMunshiyana || 0) - (this.dealForm.value.vendorDeal.tdsAmount || 0));
      this.dealForm.controls['vendorDeal'].patchValue({totalPayable: ((totalpayble) || 0)});
      this.dealForm.controls['vendorDeal'].patchValue({remainingAmount: ((totalpayble) || 0)});

    }

  }
  //********************************************************************

  fillFormdata(data:any) {
    this.dealForm.patchValue({
      panNumber: data.vendor && data.vendor.pan_no,
      vendor: data.vendor,
      branch: data.branch,
      vendorDeal: {
        deal_at: data.vendorDeal && data.vendorDeal.deal_at,
        // loading_slip: data.vendorDeal && data.vendorDeal.loading_slip,
        broker: data.vendorDeal && data.vendorDeal.broker,
        lorryAc: data.vendorDeal && data.vendorDeal.lorryAc,
        payment_type: data.vendorDeal && data.vendorDeal.payment_type,
        weight_type: data.vendorDeal && data.vendorDeal.weight_type,
        tdsPercent: data.vendorDeal && data.vendorDeal.tdsPercent,
        weightPercent: data.vendorDeal && data.vendorDeal.weightPercent,
        pmtWeight: data.vendorDeal && data.vendorDeal.pmtWeight,
        pmtRate: data.vendorDeal && data.vendorDeal.pmtRate,
        otherExp: data.vendorDeal && data.vendorDeal.otherExp,
        perUnitPrice: data.vendorDeal && data.vendorDeal.perUnitPrice,
        totalUnits: data.vendorDeal && data.vendorDeal.totalUnits,
        total_expense: data.vendorDeal && data.vendorDeal.total_expense,
        munshiyana: data.vendorDeal && data.vendorDeal.munshiyana,
        totWithMunshiyana: data.vendorDeal && data.vendorDeal.totWithMunshiyana,
        advance: data.vendorDeal && data.vendorDeal.advance,
        tdsAmount: data.vendorDeal && data.vendorDeal.tdsAmount,
        toPay: data.vendorDeal && data.vendorDeal.toPay,
        // totalPayable: data.vendorDeal && data.vendorDeal.totalPayable,
        // remainingAmount: data.vendorDeal && data.vendorDeal.remainingAmount,
      }
    });

  }
}
