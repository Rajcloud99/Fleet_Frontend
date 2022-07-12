import {Component, HostListener, Input, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpParams} from "@angular/common/http";
import {MasterService} from "../../master.service";
import {ConstantService} from "../../../services/constant.service";
import {FormulaService} from "../../../services/formula.service";
import {CommonService} from "../../../services/common.service";
import {StorageService} from "../../../services/storage.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-trip-memo-upsert',
  templateUrl: './trip-memo-upsert.component.html',
  styleUrls: ['./trip-memo-upsert.component.scss']
})
export class TripMemoUpsertComponent implements OnInit {
  //***************************************tds get help**********
  updatetripdata:any;
  munsiyanaFromula:any;
  dateFormat = 'dd/MM/yyyy'; // date format of datepicker
  //****************
  brokergetdata:any;
  branchgetdata :any;
  lorryAcgetdata:any;
  pbList:any;
  ptList:any;
  cClientId:any;
  //**********************
  dealAcc:any;
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
  mode: any; // checking the add or upsert mode
  formvalidation:boolean=true;
  localdata:any;
  aSegmentType:any;
  receivedData :any;
  innerWidth:any;
  @Input () mod: any;// mode of vdeal-modal (add or edit)
  @Input () aTripData : any;

  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private http: HttpClient,
              private masterService: MasterService,
              private storageService: StorageService,
              private constantService: ConstantService,
              private formulaService:FormulaService,
              private location : Location,
              private commonService: CommonService) {
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

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if(this.aTripData) {
      this.fillFormdata(this.aTripData);
    }
    this.munsiyanaFromula =  this.formulaService.formulafactory('Total With Munshiyana');
    this.pbList = this.constantService.constants.aWeightTypes;
    this.ptList = this.constantService.constants.paymentType;
    this.localdata = this.storageService.get('userData');
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

      if (this.aTripData.tMemo && this.aTripData.tMemo.tMNo) {
        this.selectedStationary = [{billBookId: this.aTripData.tMemo?.stationaryId,bookNo: this.aTripData.tMemo?.tMNo}];
        this.fillhireslip();
      }
      if (this.aTripData && this.aTripData.grNumber) {
        this.getGRstationarydata = [{billBookId: this.aTripData?.stationaryId,bookNo: this.aTripData?.grNumber}];
        this.fillgrslip();
      }
    }
  }
  dealForm = this.fb.group({
    customer: [null,[Validators.required]],
    billingParty: [null,[Validators.required]],
    branch: [null, [Validators.required]],
    consignor: [null],
    consignee: [null],
    grNumber:[null],
    grDate:[null],
    basicFreight:[null],
    totalFreight:[null],
    // route:[null],
    // weight:[null],
    vehicle:[null],



    tMemo: this.fb.group({
      date: [null, [Validators.required]],
      tMNo: [null, [Validators.required]],
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


  onSubmit() {
    this.submitted = true;
    for (const i in this.dealForm.controls) {
      this.dealForm.controls[i].markAsDirty();
      this.dealForm.controls[i].updateValueAndValidity();
    }
    //******* vendor deal custom from validation
    if(!this.dealForm.value.customer){
      this.commonService.error('customer is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.billingParty){
      this.commonService.error('billing Party is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.branch){
      this.commonService.error('branch is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.tMemo.tMNo){
      this.commonService.error('trip Memo No is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.tMemo.date) {
      this.commonService.error('trip Memo Date is mandatory');
      this.formvalidation = false;
      return;
    }else if(!this.dealForm.value.tMemo.payment_type){
      this.commonService.error('Payment type is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.tMemo.weight_type){
      this.commonService.error('Payment Basis is mandatory');
      this.formvalidation =false;
      return;
    }else if(!this.dealForm.value.tMemo.rate){
      this.commonService.error('Total Expense is mandatory');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.tMemo.rate <= 0 ){
      this.commonService.error('Total Expense should be greater than 0');
      this.formvalidation =false;
      return;
    }else if(this.dealForm.value.tMemo.rate <= this.dealForm.value.tMemo.munshiyana ){
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
    if (!data) {
    } else {
      if (data.tMemo.tMNo) {
        data.tMemo.stationaryId = formData.tMemo.tMNo?.billBookId,
          data.tMemo.tMNo = formData.tMemo.tMNo?.bookNo
      }
      if (data.grNumber && data.grNumber.bookNo && data.grNumber.billBookId) {
        data.stationaryId = formData.grNumber?.billBookId,
          data.grNumber = formData.grNumber?.bookNo
      }
      data.payment_type = formData.tMemo.payment_type;
      data.payment_basis = formData.tMemo.weight_type;
    }
    this.clean(data.tMemo);
    if(this.mod == 'Trip Memo Popup'){
      this.aTripData =  data;

    }else {
      this.saveData(data);
    }
  }
  // save data (add case)
  saveData(data: any) {
    this.masterService.tripmemoupdate(this.getId, data).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/operation/trip-memo');
      }
    });
  }
  fillhireslip(){
    this.dealForm.controls['tMemo'].patchValue({tMNo: this.selectedStationary[0]});
  }
  fillgrslip(){
    this.dealForm.controls['grNumber'].patchValue(this.getGRstationarydata[0]);
  }
  backToListView(){
    // this.router.navigateByUrl('home/operation/trip-memo');
    this.location.back();
  }
  //********************
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

    if (viewValue != 'centrailized' && !this.f.branch.value.tripMemoBook)
      return [];

    if (!this.dealForm.value?.tMemo?.date) {
      this.commonService.error('Trip Memo  Date is required');
      return [];
    }
    let billbook = [];
    if(viewValue  != 'centrailized'){
      for(let  data of (this.f.branch.value.tripMemoBook)){
        billbook.push(data.ref);
      }
    }
    let requestObj :any = {
      bookNo: viewValue,
      billBookId: billbook,
      type: 'Trip Memo',
      useDate: new Date(this.dealForm.value?.tMemo?.date),
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
          this.dealForm.controls['tMemo'].patchValue({tMNo: data[0]});
          this.selectedStationary = data[0];
        }}
      if(data){
        this.selectedStationary=[];
        this.selectedStationary = data;
      }
    });
  }

//  ****************
//////////////////////////////////
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

  //*************************************************** formula calculation
  paymenttypechange(){
    this.dealForm.controls['tMemo'].patchValue({weight_type: null});
    this.dealForm.controls['tMemo'].patchValue({weightPercent: null});
    this.dealForm.controls['tMemo'].patchValue({pmtRate: null});
    this.dealForm.controls['tMemo'].patchValue({perUnitPrice: null});
    this.dealForm.controls['tMemo'].patchValue({totalUnits: null});
    this.dealForm.controls['tMemo'].patchValue({rate: null});
    this.dealForm.controls['tMemo'].patchValue({munshiyana: null});
    this.dealForm.controls['tMemo'].patchValue({advance: null});
    this.dealForm.controls['tMemo'].patchValue({total: null});
    this.dealForm.controls['tMemo'].patchValue({tdsAmount: null});
    this.dealForm.controls['tMemo'].patchValue({toPay: null});
    this.dealForm.controls['tMemo'].patchValue({totalPayable: null});
    this.dealForm.controls['tMemo'].patchValue({remainingAmount: null});
    this.dealForm.controls['basicFreight'].patchValue(null);
    this.dealForm.controls['totalFreight'].patchValue(null);
  }
  calculateTotalPMT() {
    let rate = ((this.dealForm.value.tMemo.pmtWeight || 0) * (this.dealForm.value.tMemo.pmtRate || 0));
    this.totalexpencecal(rate);
  }
  calculateTotalpunit() {
    let rate = ((this.dealForm.value.tMemo.perUnitPrice || 0) * (this.dealForm.value.tMemo.totalUnits || 0));
    this.totalexpencecal(rate);
  }

  totalexpencecal(rate:any){
    this.dealForm.controls['tMemo'].patchValue({rate: (rate|| 0)});
    this.munsiayanacal();
  }
  munsiayanacal(){
    let total  = this.dealForm.value.tMemo.rate || 0;
    let munsiayana = this.dealForm.value.tMemo.munshiyana || 0;
    this.munsiyanaFromula.bind({
      munshiyana: munsiayana,
      total_expense: total,
      otherExp: 0
    });
    this.dealForm.controls['tMemo'].patchValue({total: this.munsiyanaFromula.eval() || 0});

    if(this.dealForm.value.tMemo.total){
      let tdsAmount = ((this.dealForm.value.tMemo.total || 0) * (this.dealForm.value.tMemo.tdsPercent || 0) / 100);
      this.dealForm.controls['tMemo'].patchValue({tdsAmount: ((tdsAmount) || 0)});
      let topay  = ((this.dealForm.value.tMemo.total || 0) - (this.dealForm.value.tMemo.advance || 0)-(this.dealForm.value.tMemo.tdsAmount || 0));
      this.dealForm.controls['tMemo'].patchValue({toPay: ((topay) || 0)});
      let totalpayble = ((this.dealForm.value.tMemo.total || 0) - (this.dealForm.value.tMemo.tdsAmount || 0));
      this.dealForm.controls['tMemo'].patchValue({totalPayable: ((totalpayble) || 0)});
      this.dealForm.controls['tMemo'].patchValue({remainingAmount: ((totalpayble) || 0)});
      this.dealForm.controls['basicFreight'].patchValue(((totalpayble) || 0));
      this.dealForm.controls['totalFreight'].patchValue(((totalpayble) || 0));

    }

  }
  //********************************************************************

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
      tMemo: {
        date: data.tMemo && data.tMemo.date,
        payment_type: data.tMemo && data.tMemo.payment_type,
        weight_type: data.tMemo && data.tMemo.weight_type,
        weightPercent: data.tMemo && data.tMemo.weightPercent,
        pmtWeight: data.tMemo && data.tMemo.pmtWeight,
        pmtRate: data.tMemo && data.tMemo.pmtRate,
        perUnitPrice: data.tMemo && data.tMemo.perUnitPrice,
        totalUnits: data.tMemo && data.tMemo.totalUnits,
        rate: data.tMemo && data.tMemo.rate,
        munshiyana: data.tMemo && data.tMemo.munshiyana,
        total: data.tMemo && data.tMemo.total,
        toPay:data.tMemo && data.tMemo.toPay,
        advance: data.tMemo && data.tMemo.advance,
      }
    });

  }

//  filter for backend
  onChangeSearch(value: any, type: string): any {
    if (value) {
      let params = new HttpParams()
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      params = params.append(type, value);
      this.masterService
        .getAllBillingParty({ params })
        .subscribe((data: any) => {
          if (data) {
            this.receivedBillingParty = data;
          }
        });
    }
  }
  //////////////////// get Consignor
  getconsignor_consignee(value: any, types: string): any {
    if (value.length > 2) {
      let params = new HttpParams()
        .set('name', value)
        .set('no_of_docs', 4)
        .set('type', types)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all')
        .set('all', true);
      this.masterService
        .getAllConsignor_Consignee({ params })
        .subscribe((data: any) => {
          if (types == 'Consignor') {
            this.getConsignordata = data;
          }
          if (types == 'Consignee') {
            this.getconsigneedata = data;
          }
        });
    }
  }
  // get customer
  getcustomer(value: any): any {
    if (value.length > 2) {
      let params = new HttpParams()
        .set('name', value)
        .set('no_of_docs', 5)
        .set('status', 'Active')
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all')
        .set('all', true);
      this.masterService.getAllCustomers({ params }).subscribe((data: any) => {
        if (data) {
          this.getCustomerdata = data;
        }
      });
    }
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
  onSearchvehicletype() {
    let req = {
      all: true
    }
    this.masterService.getVehicleType(req).subscribe((res: any) => {
      this.vehicletypedata = res;
    });
  }


}

