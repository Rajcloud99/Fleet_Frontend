import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConstantService } from 'src/app/services/constant.service';
import { FormulaService } from 'src/app/services/formula.service';
import { StorageService } from 'src/app/services/storage.service';
import {Location} from "@angular/common";
import { MasterService } from '../../master.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-broker-memo-upsert',
  templateUrl: './broker-memo-upsert.component.html',
  styleUrls: ['./broker-memo-upsert.component.scss']
})
export class BrokerMemoUpsertComponent implements OnInit {
  
  dateFormat = 'dd/MM/yyyy'; // date format of datepicker
  formvalidation:boolean=true;
  innerWidth: any;
  branchgetdata :any;
  transporter: any;// ngModel name
  podCustomer: any;// ngModel name
  dala_charges : any;// ngModel name
  other_charges : any;// ngModel name
  dalaComission: any;// ngModel name
  transportergetdata :any; //ngModel name
  tds: any;// ngModel name
  @Input () mod: any;// mode of vdeal-modal (add or edit)
  @Input () aTripData : any;
  munsiyanaFromula: any;
  pbList: any;
  ptList: any;
  localdata: any;
  selectedStationary:any;
    //******************
  //new data
  receivedBillingParty:any;
  getconsigneedata:any;
  getConsignordata:any;
  getCustomerdata:any;
  getGRstationarydata:any;
  vehicletypedata:any;
  previewMd:boolean = false;
  recAmValid:boolean = false;
  submitted = false; // user not able to submit the data if form is invalid
  getId: any; // store the id of param
  user$: any;
  constructor(
      private fb: FormBuilder,
      private router: Router,
      private route: ActivatedRoute,
      private formulaService: FormulaService,
      private storageService: StorageService,
      private constantService: ConstantService,
      private commonService: CommonService,
      private masterService: MasterService,
      private location: Location) { 
        this.route.params.subscribe((queryParam) => {
          if (queryParam.mode) {
            if(queryParam.mode == 'Preview'){
              this.previewMd = true;
            }
            const currentState = this.router.getCurrentNavigation();
            this.aTripData = currentState && currentState.extras.state;
            this.getId = this.aTripData?._id;
            if(this.aTripData.receivedAmount && this.aTripData.receivedAmount>0){
              this.recAmValid = true;
            }
          }
        });
      }

  get f() {
    return this.dealForm.controls;
  }
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.aTripData) {
      this.fillFormdata(this.aTripData);
    }
    this.munsiyanaFromula =  this.formulaService.formulafactory('Total With Munshiyana');
    this.pbList = this.constantService.constants.aWeightTypes;
    this.ptList = this.constantService.constants.paymentType;
    this.localdata = this.storageService.get('userData');
    this.user$ = this.localdata.user;
    if(this.aTripData) {
      if(this.aTripData && this.aTripData.customer) {
        this.getCustomerdata = [this.aTripData.customer];
      }
      if(this.aTripData && this.aTripData.billingParty) {
        this.receivedBillingParty = [this.aTripData.billingParty];
      }
      if(this.aTripData && this.aTripData.consignee) {
        this.getconsigneedata = [this.aTripData.consignee];
      }
      if(this.aTripData && this.aTripData.consignor) {
        this.getConsignordata = [this.aTripData.consignor];
      }
      if(this.aTripData && this.aTripData.branch) {
        this.branchgetdata = [this.aTripData?.branch];
      }
      if(this.aTripData && this.aTripData.vehicle) {
        this.vehicletypedata = [this.aTripData?.vehicle];
      }

      if (this.aTripData.bMemo && this.aTripData.bMemo.bmNo) {
        this.selectedStationary = [{billBookId: this.aTripData.bMemo?.stationaryId,bookNo: this.aTripData.bMemo?.bmNo}];
        this.fillhireslip();
      }
      if (this.aTripData && this.aTripData.grNumber) {
        this.getGRstationarydata = [{billBookId: this.aTripData?.stationaryId,bookNo: this.aTripData?.grNumber}];
        this.fillgrslip();
      }
    }
  }

  dealForm = this.fb.group({
    // customer: [null,[Validators.required]],
    // billingParty: [null,[Validators.required]],
    branch: [null, [Validators.required]],
    // consignor: [null],
    // consignee: [null],
    grNumber:[null],
    grDate:[null],
    basicFreight:[null],
    totalFreight:[null],
    // route:[null],
    // weight:[null],
    vehicle:[null],
    bMemo: this.fb.group({
      date: [null, [Validators.required]],
      bmNo: [null, [Validators.required]],
      payment_type: [null, [Validators.required]],
      weight_type: [null,[Validators.required]],
      weightPercent: [null],
      pmtWeight: [null],
      pmtRate: [null],
      otherExp: [null],
      perUnitPrice: [null],
      totalUnits: [null],
      rate: [null,[Validators.required]],
      munshiyana: [null],
      total: [null, [Validators.required]],
      advance: [null],
      toPay: [null, [Validators.required]],
    }),
  });
  
  //*************************************************** formula calculation
  paymenttypechange(){
    this.dealForm.controls['bMemo'].patchValue({weightPercent: null});
    this.dealForm.controls['bMemo'].patchValue({weight_type: null});
    this.dealForm.controls['bMemo'].patchValue({pmtRate: null});
    this.dealForm.controls['bMemo'].patchValue({perUnitPrice: null});
    this.dealForm.controls['bMemo'].patchValue({totalUnits: null});
    this.dealForm.controls['bMemo'].patchValue({rate: null});
    this.dealForm.controls['bMemo'].patchValue({munshiyana: null});
    this.dealForm.controls['bMemo'].patchValue({advance: null});
    this.dealForm.controls['bMemo'].patchValue({total: null});
    this.dealForm.controls['bMemo'].patchValue({tdsAmount: null});
    this.dealForm.controls['bMemo'].patchValue({toPay: null});
    this.dealForm.controls['bMemo'].patchValue({totalPayable: null});
    this.dealForm.controls['bMemo'].patchValue({remainingAmount: null});
    this.dealForm.controls['basicFreight'].patchValue(null);
    this.dealForm.controls['totalFreight'].patchValue(null);
  }

  calculateTotalPMT() {
    let rate = ((this.dealForm.value.bMemo.pmtWeight || 0) * (this.dealForm.value.bMemo.pmtRate || 0));
    this.totalexpencecal(rate);
  }
  calculateTotalpunit() {
    let rate = ((this.dealForm.value.bMemo.perUnitPrice || 0) * (this.dealForm.value.bMemo.totalUnits || 0));
    this.totalexpencecal(rate);
  }

  totalexpencecal(rate:any){
    this.dealForm.controls['bMemo'].patchValue({rate: (rate|| 0)});
    this.munsiayanacal();
  }
  munsiayanacal(){
    let total  = this.dealForm.value.bMemo.rate || 0;
    let munsiayana = this.dealForm.value.bMemo.munshiyana || 0;
    this.munsiyanaFromula.bind({
      munshiyana: munsiayana,
      total_expense: total,
      otherExp: 0
    });
    this.dealForm.controls['bMemo'].patchValue({total: this.munsiyanaFromula.eval() || 0});

    if(this.dealForm.value.bMemo.total){
      let tdsAmount = ((this.dealForm.value.bMemo.total || 0) * (this.dealForm.value.bMemo.tdsPercent || 0) / 100);
      this.dealForm.controls['bMemo'].patchValue({tdsAmount: ((tdsAmount) || 0)});
      let topay  = ((this.dealForm.value.bMemo.total || 0) - (this.dealForm.value.bMemo.advance || 0)-(this.dealForm.value.bMemo.tdsAmount || 0));
      this.dealForm.controls['bMemo'].patchValue({toPay: ((topay) || 0)});
      let totalpayble = ((this.dealForm.value.bMemo.total || 0) - (this.dealForm.value.bMemo.tdsAmount || 0));
      this.dealForm.controls['bMemo'].patchValue({totalPayable: ((totalpayble) || 0)});
      this.dealForm.controls['bMemo'].patchValue({remainingAmount: ((totalpayble) || 0)});
      this.dealForm.controls['basicFreight'].patchValue(((totalpayble) || 0));
      this.dealForm.controls['totalFreight'].patchValue(((totalpayble) || 0));

    }

  }
  
  calcTotalFreight() {
    let basicFreight = this.dealForm.value.basicFreight || 0;
    let totalCharges = (this.dala_charges || 0) + (this.other_charges || 0);
    let totalDeduction = (this.tds || 0 )+ (this.dalaComission || 0);
    let totalFreight = basicFreight + (totalCharges - totalDeduction);
    this.dealForm.controls['totalFreight'].patchValue(((totalFreight) || 0));
  }
  fillFormdata(data:any) {
    this.dealForm.patchValue({
      grDate:data.grDate,
      basicFreight:data.basicFreight,
      totalFreight:data.totalFreight,
      // route:data.route,
      // weight:data.weight,
      customer: data.customer,
      billingParty: data.billingParty,
      branch: data.branch,
      consignor: data.consignor,
      consignee: data.consignee,
      vehicle: data.vehicle,
      bMemo: {
        date: data.bMemo && data.bMemo.date,
        payment_type: data.bMemo && data.bMemo.payment_type,
        weight_type: data.bMemo && data.bMemo.weight_type,
        weightPercent: data.bMemo && data.bMemo.weightPercent,
        pmtWeight: data.bMemo && data.bMemo.pmtWeight,
        pmtRate: data.bMemo && data.bMemo.pmtRate,
        perUnitPrice: data.bMemo && data.bMemo.perUnitPrice,
        totalUnits: data.bMemo && data.bMemo.totalUnits,
        rate: data.bMemo && data.bMemo.rate,
        munshiyana: data.bMemo && data.bMemo.munshiyana,
        total: data.bMemo && data.bMemo.total,
        toPay:data.bMemo && data.bMemo.toPay,
        advance: data.bMemo && data.bMemo.advance,
      }
    });
    this.transporter = {name: data.bMemo?.vendorName,_id:data.bMemo?.vendor};
    this.transportergetdata = [this.transporter];
    this.dala_charges = data.charges?.dala_charges;
    this.other_charges = data.charges?.other_charges;
    this.dalaComission = data.deduction?.dalaComission;
    this.tds = data.deduction?.tds;
    this.podCustomer = data.bMemo?.podCustomer;

  }

  onSubmit() {
    this.submitted = true;
    for (const i in this.dealForm.controls) {
      this.dealForm.controls[i].markAsDirty();
      this.dealForm.controls[i].updateValueAndValidity();
    }
    //******* broker memo custom from validation
    if(!this.dealForm.value.branch){
      this.commonService.error('branch is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.bMemo.bmNo){
      this.commonService.error('broker Memo No is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.bMemo.date) {
      this.commonService.error('broker Memo Date is mandatory');
      this.formvalidation = false;
      return;
    }else if(!this.dealForm.value.bMemo.payment_type){
      this.commonService.error('Payment type is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.bMemo.weight_type){
      this.commonService.error('Payment Basis is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.bMemo.rate){
      this.commonService.error('Total Expense is mandatory');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.bMemo.rate <= 0 ){
      this.commonService.error('Total Expense should be greater than 0');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.bMemo.rate <= this.dealForm.value.bMemo.munshiyana ){
      this.commonService.error('Total Expense should be greater than Munshiyana');
      this.formvalidation =false;
      return;
    }

    if (this.dealForm.invalid) {
      return;
    }

    let formData = this.dealForm.value;

    this.clean(formData);

    let data = {
      ...formData,

    }

    if(data) {
      if (data.bMemo?.bmNo) {
          data.bMemo.stationaryId = formData.bMemo.bmNo?.billBookId,
          data.bMemo.bmNo = formData.bMemo.bmNo?.bookNo
      }
      if (data.grNumber?.bookNo && data.grNumber?.billBookId) {
          data.stationaryId = formData.grNumber?.billBookId,
          data.grNumber = formData.grNumber?.bookNo
      }
      data.payment_type = formData.bMemo.payment_type;
      data.payment_basis = formData.bMemo.weight_type;
      if(this.transporter) {
        data.bMemo.vendor = this.transporter._id;
        data.bMemo.vendorName = this.transporter.name;
      }

      if(this.user$.brokerCustomer) {
        data.bMemo.customer = this.user$.brokerCustomer;
      }

      if(this.user$.brokerbp) {
        data.bMemo.billingParty = this.user$.brokerbp;
      }
      if(data.vehicle) {
        data.bMemo.vehicleId = data.vehicle._id;
      }
      data.charges = {};
      data.deduction = {};
      data.totalCharges = 0;
      if(this.dala_charges) {
        data.charges.dala_charges = this.dala_charges;
        data.totalCharges += data.charges.dala_charges;
      }
      if(this.other_charges) {
        data.charges.other_charges = this.other_charges;
        data.totalCharges += data.charges.other_charges;
      }
      data.totalDeduction = 0;
      if(this.dalaComission) {
        data.deduction.dalaComission = this.dalaComission;
        data.totalDeduction += data.deduction.dalaComission
      }
      if(this.tds) {
        data.deduction.tds = this.tds;
        data.totalDeduction += data.deduction.tds;
      }
      if(this.podCustomer) {
        data.bMemo.podCustomer = this.podCustomer;
      }
    }
    this.clean(data.bMemo);

    if(this.mod == 'Broker Memo Popup'){
      this.aTripData =  data;
    }else {
      this.saveData(data);
    }
  }
  // save data (add case)
  saveData(data: any) {
    this.masterService.brokermemoupdate(this.getId, data).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/operation/broker-memo');
      }
    });
  }

  fillhireslip(){
    this.dealForm.controls['bMemo'].patchValue({bMNo: this.selectedStationary[0]});
  }
  fillgrslip(){
    this.dealForm.controls['grNumber'].patchValue(this.getGRstationarydata[0]);
  }

  backToListView(){
    // this.router.navigateByUrl('home/operation/trip-memo');
    this.location.back();
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

    if (viewValue != 'centrailized' && !this.f.branch.value.brokerMemoBook)
      return [];

    if (!this.dealForm.value?.bMemo?.date) {
      this.commonService.error('Broker Memo  Date is required');
      return [];
    }
    let billbook = [];
    if(viewValue  != 'centrailized'){
      for(let  data of (this.f.branch.value.brokerMemoBook)){
        billbook.push(data.ref);
      }
    }
    let requestObj :any = {
      bookNo: viewValue,
      billBookId: billbook,
      type: 'Broker Memo',
      useDate: new Date(this.dealForm.value?.bMemo?.date),
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
          this.dealForm.controls['bMemo'].patchValue({bmNo: data[0]});
          this.selectedStationary = data[0];
        }}
      if(data){
        this.selectedStationary=[];
        this.selectedStationary = data;
      }
    });
  }

  getBillBookNo1(viewValue:any):any {
    if( viewValue != 'centrailized' &&  viewValue != 'auto'){
      viewValue = viewValue.trim();
      if(viewValue.length <1){
        return ;
      }
    }
    if (viewValue != 'centrailized' && !this.f.branch.value) {
      this.commonService.error('Please Select Branch');
      return [];
    }

    if (viewValue != 'centrailized' && !this.f.branch.value.grBook)
      return [];

    if (!this.f.grDate.value) {
      this.commonService.error('Gr Date is required');
      return [];
    }
    let billbook = [];
    if(viewValue  != 'centrailized'){
      for(let  data of (this.f.branch.value.grBook)){
        billbook.push(data.ref);
      }
    }
    let requestObj :any = {
      bookNo: viewValue,
      billBookId: billbook,
      type: 'Gr',
      useDate: new Date(this.f.grDate.value),
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
      if (viewValue === 'centrailized' || viewValue === 'auto') {
        if (data[0]) {
          this.getGRstationarydata=[];
          this.dealForm.controls['grNumber'].patchValue(data[0]);
          this.getGRstationarydata = data[0];
        }}
      if(data){
        this.getGRstationarydata=[];
        this.getGRstationarydata = data;
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

  onSearchbranch(value: any) {
    this.branchgetdata = [];
    if(value) {
      this.masterService.getAllBranch({name: value}).subscribe((res: any) => {
        this.branchgetdata = res;
      });
    }
  }

  onSearchtransporter (value: any) {
    this.transportergetdata = [];
    if(value.length > 1) {
      this.masterService.getAllVendor({name: value,category: {$in: ["Transporter"]}}).subscribe((res: any) => {
        this.transportergetdata = res;
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

}
