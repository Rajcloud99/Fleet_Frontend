import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewContainerRef} from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidationErrors,
  FormControl,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import {NzFormModule} from 'ng-zorro-antd/form';
import {CommonService} from 'src/app/services/common.service';
import {HttpParams} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {MasterService} from '../../master.service';
import {ConstantService} from 'src/app/services/constant.service';
import {StorageService} from 'src/app/services/storage.service';
import {
  faPlusSquare,
  faEdit,
  faSearch,
  faTrash,
  faMinusSquare,
  faTimes,
  faUserCircle,
  faBoxOpen,
  faCalculator,
  faSearchDollar,
} from '@fortawesome/free-solid-svg-icons';
import {NzModalService, NzModalRef} from 'ng-zorro-antd/modal';
import {group} from "@angular/animations";
import {AddGrPopupComponent} from "../../add-gr-popup/add-gr-popup.component";
import {AddInvoicePopupComponent} from "../../add-invoice-popup/add-invoice-popup.component";

@Component({
  selector: 'app-gr-upsert',
  templateUrl: './gr-upsert.component.html',
  styleUrls: ['./gr-upsert.component.scss']
})
export class GrUpsertComponent implements OnInit {
  //tax
  aGstType = ['IGST', 'CGST & SGST'];
  gstPercentToApply: any;
  cGST_percent: any;
  sGST_percent: any;
  iGST_percent: any;
  cGst: any;
  sGst: any;
  cGST: any;
  iGst: any;
  innerWidth: any;// stores width of any screeen
  screenHeight:any;
  materialgetunit :any;
  totalFreight: any;
  totalAmount: any;
  totalAmt: any;
  basicFreight: any;
  totalCharges: any;
  Bt_data: any;
  Gr_valid :boolean = true;
  ////////////////// on search object
  receivedAllBranches: any;
  receivedBillingParty: any;
  getConsignordata: any;
  getconsigneedata: any;
  getCustomerdata: any;
  getsourcedata: any;
  getdestination: any;
  getmaterialdata: any;
  billedsourcedata: any;
  billeddestinationdata: any;
  billedSource: any;
  billedDestination: any;
  getstationarydata:any;

  submitted = false;
  getId: any;
  mode: any;
  previewmode:boolean=false;
  selectedGr: any;
  aGSTstates: any;
  ids: any;
  filterObj = {
    name: '',
  };

  dateFormat = 'dd/MM/yyyy'; // date format of datepicker
  faPlusSquare = faPlusSquare;
  selectedRowId: any;
  selectedItem: any;
  faEdit = faEdit;
  faSearch = faSearch;
  faTrash = faTrash;
  faTimes = faTimes;
  faSearchDollar = faSearchDollar;
  faCalculator = faCalculator;
  faMinusSquare = faMinusSquare;
  disabled = false;
  config: any;
  pbList = this.constantService.constants.paymentBasis;
  ptList = this.constantService.constants.paymentType;
  stateList = this.constantService.constants.aGSTstates;
  grConfigs: any;
  gstPercentType: any;
  @Input () InputData : any;// know weather it is modal or not
  @Input () GRpopupdata: any; // data for edit mode of gr-modal
  @Input () mod: any ;// mode of gr-modal (add or edit)
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private masterService: MasterService,
    private constantService: ConstantService,
    private commonServ: CommonService,
    private modal: NzModalService,
    private storageServ: StorageService,
    private viewContainerRef: ViewContainerRef,
    private location : Location
  ) {

    this.totalFreight = 0;
    this.totalAmount = 0;
    this.totalAmt = 0;
    this.basicFreight = 0;
    this.route.params.subscribe((queryParam) => {
      if (queryParam.mode) {
        this.mode = queryParam.mode;
        const currentState = this.router.getCurrentNavigation();
        this.selectedGr = currentState && currentState.extras.state;
        this.getId = this.selectedGr?._id;
        this.fillFormdata(this.selectedGr);
      }
      if (this.mode == 'Preview') {
        this.previewmode= true;
      }
      if (this.mode == 'Add') {
        this.GrSubmissionFrom.controls.grDate.setValue(new Date(), {
          emitEvent: false,
        });
      }
    });
  }
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
  }
  onBillingPartySelect(billingParty: any) {
    if(!billingParty){
      return;
    }
    this.gstPercentToApply = (billingParty && billingParty.percent) || this.gstPercentToApply || 0;
    let user = (this.config.client_allowed || []).find((o: { clientId: any; }) => o.clientId == billingParty.clientId);
    if (user) {
      billingParty.clientName = user.name;
      this.gstPercentType = billingParty.state_code == user.state_code ? this.aGstType[1] : this.aGstType[0];
    } else {
      this.commonServ.error('Billing party not registered to current client');
    }
    this.getGstType();
  }

  getGstType(): any {
    if (this.gstPercentType == 'CGST & SGST') {
      this.cGST_percent = Number((this.gstPercentToApply / 2).toFixed(2));
      this.sGST_percent = Number((this.gstPercentToApply / 2).toFixed(2));
      this.iGST_percent = 0;
    } else if (this.gstPercentType === 'IGST') {
      this.iGST_percent = this.gstPercentToApply;
      this.cGST_percent = 0;
      this.sGST_percent = 0;
    } else {
      this.gstPercentToApply = 0
      this.iGST_percent = 0;
      this.cGST_percent = 0;
      this.sGST_percent = 0;
    }

  }

  ngOnInit(): void {
    if(this.InputData === 'modal' && this.GRpopupdata) {
      this.selectedGr = this.GRpopupdata;
    }

   let title= this.getId ? 'GR EDIT' : 'GR ADD';
   this.commonServ.setNavTittleAndMenu(title);
    this.innerWidth = window.innerWidth;
    this.config = this.storageServ.get('userData').configs;
    this.grConfigs = this.storageServ.get('userData').configs?.GR?.config;
    this.receivedAllBranches = [this.selectedGr?.branch];
    this.receivedBillingParty = [this.selectedGr?.billingParty];
    this.getConsignordata = [this.selectedGr?.consignor];
    this.getconsigneedata = [this.selectedGr?.consignee];
    this.getCustomerdata = [this.selectedGr?.customer];
    this.getFormList();
    this.getsourcedata = [{source: this.selectedGr?.acknowledge?.source}];
    this.getdestination = [{destination: this.selectedGr?.acknowledge?.destination}];
    this.billedSource = [{c: this.selectedGr?.acknowledge?.billedSource}];
    this.billedDestination = [{c: this.selectedGr?.acknowledge?.billedDestination}];
    this.getmaterialdata = [];
    this.materialgetunit = [];
    if(this.selectedGr && this.selectedGr.grNumber){
      this.getstationarydata = [{bookNo: this.selectedGr.grNumber,billBookId:this.selectedGr.stationaryId}];
      this.grdatafill();
    }
    if (this.selectedGr?.billingParty) {
      this.gstPercentToApply = this.selectedGr.billingParty && this.selectedGr.billingParty.percent || 0;
      if (this.selectedGr.iGST_percent)
        this.gstPercentType = 'IGST';
      else if (this.selectedGr.cGST_percent || this.selectedGr.sGST_percent)
        this.gstPercentType = 'CGST & SGST';
      this.getGstType();
    }
    if(this.selectedGr?.invoices){
    for (let data of this.selectedGr?.invoices) {
      this.getmaterialdata.push(data.material);
      if(data.material?.unit){
        this.materialgetunit.push(data.material.unit[0]);
      }
      if(data.baseValueLabel){
        data.aCapacity = [{rate: data.rate, baseVal: data.baseValue, label: data.baseValueLabel}];
        data.dummyCapacityObj = data?.aCapacity[0];
      }
      this.addInvoiceRows(data);

    }
    }
    if(this.selectedGr?.eWayBills) {
      for (let data of this.selectedGr?.eWayBills) {
        this.addEwayBillRows(data);
      }
    }
    this.calculation();
    if(this.InputData === 'modal'){
      this.fillFormdata(this.GRpopupdata);
    }
  }
  grdatafill(){
    if(this.config && this.config.GR && this.config.GR.manualGr){
      this.GrSubmissionFrom.controls['grNumber'].patchValue(this.getstationarydata[0].bookNo);
    }else {
      this.GrSubmissionFrom.controls['grNumber'].patchValue(this.getstationarydata[0]);
    }
  }
// get config when edit gr
  getFormList() {
    let id;
    if (this.selectedGr && this.selectedGr.billingParty && this.selectedGr.billingParty.configs && this.selectedGr.billingParty.configs.GR)
      id = this.selectedGr.billingParty.configs.GR;
    else if (this.selectedGr && this.selectedGr.customer && this.selectedGr.customer.configs && this.selectedGr.customer.configs.GR)
      id = this.selectedGr.customer.configs.GR;
    if (!id)
      return;
    if(typeof id === 'object') {
      if (id?.configs)
        this.grConfigs = {...id.configs};
    }else {
      let params = new HttpParams()
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
      this.masterService.getConfigs(id,{ params })
        .subscribe((data: any) => {
          if (data) {
           this.grConfigs = {...data.configs};
          }
        });
    }
  }
//******************* Edit Invoice Popup For mobile**********************
  editinvoicepopup( index:number,data:any): any {

    const modal = this.modal.create({
      nzTitle: 'INVOICE EDIT',
      nzWidth: '100%',
      nzCentered: true,
      nzZIndex: 11,
      nzContent: AddInvoicePopupComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams:{
        grConfigs : this.grConfigs,
        ArrayData : data || null,
        RategetInfo :{source :this.f.acknowledge?.value?.source,
          destination:this.f?.acknowledge?.value?.destination,
          customer:this.f.customer?.value?._id,
          to:new Date(this.f.grDate?.value).toISOString()
        }
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: ' Submit',
          onClick: componentInstance => {
            componentInstance?.Submit();
            if(componentInstance?.formvalidation) {
              this.InsertInvoiceRows(index, componentInstance?.InvoiceForm.value);
              if (componentInstance?.InvoiceForm.value?.rateChartRate) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({rateChartRate: componentInstance?.InvoiceForm.value.rate});
              }
              if (componentInstance?.InvoiceForm.value?.routeDistance) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({routeDistance: componentInstance?.InvoiceForm.value.rate});
              }
              if (componentInstance?.InvoiceForm.value?.baseValue) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValue: componentInstance?.InvoiceForm.value.baseVal});
              }
              if (componentInstance?.InvoiceForm.value?.baseValueLabel) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValueLabel: componentInstance?.InvoiceForm.value.label});

              }
              if (componentInstance?.InvoiceForm.value?.paymentBasis) {
                this.GrSubmissionFrom.controls.payment_basis.setValue(componentInstance?.InvoiceForm.value.paymentBasis, {emitEvent: false});

              }
              modal.destroy();
              this.calculation();
            }else{
              return ;
            }
          }
        }
      ]
    });
  }


  //******************* Add Invoice Popup For mobile**********************
  addinvoicepopup(): void {
    const modal = this.modal.create({
      nzTitle: 'ADD INVOICE',
      nzWidth: '100%',
      nzCentered: true,
      nzZIndex: 9,
      nzContent: AddInvoicePopupComponent,
      nzViewContainerRef: this.viewContainerRef,
      nzComponentParams:{
        grConfigs : this.grConfigs,
        ArrayData : undefined,
        RategetInfo :{source :this.f.acknowledge?.value?.source,
          destination:this.f?.acknowledge?.value?.destination,
          customer:this.f.customer?.value?._id,
          to:new Date(this.f.grDate?.value).toISOString()
        }
      },
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'Submit',
          onClick: componentInstance => {
            componentInstance?.Submit();
            if(componentInstance?.formvalidation) {
              this.addInvoiceRows(componentInstance?.InvoiceForm.value);
              if (componentInstance?.InvoiceForm.value?.rateChartRate) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({rateChartRate: componentInstance?.InvoiceForm.value.rate});
              }
              if (componentInstance?.InvoiceForm.value?.routeDistance) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({routeDistance: componentInstance?.InvoiceForm.value.rate});
              }
              if (componentInstance?.InvoiceForm.value?.baseValue) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValue: componentInstance?.InvoiceForm.value.baseVal});
              }
              if (componentInstance?.InvoiceForm.value?.baseValueLabel) {
                this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValueLabel: componentInstance?.InvoiceForm.value.label});

              }
              if (componentInstance?.InvoiceForm.value?.paymentBasis) {
                this.GrSubmissionFrom.controls.payment_basis.setValue(componentInstance?.InvoiceForm.value.paymentBasis, {emitEvent: false});

              }
              modal.destroy();
              this.calculation();
            }else{
              return;
            }
          }
        }
      ]
    });
  }

  //---------------------------------------------end ---------------------
  setPaymentBasis(data: any) {
    for( let oinv of data){
      oinv.paymentBasis= this.GrSubmissionFrom.value.payment_basis || undefined;
    }
  }

  getConfigs(item: any){
    if(this.GrSubmissionFrom.value.customer){
       let cust = this.GrSubmissionFrom.value.customer;
    if(item?.configs?.GR?.configs){
      this.grConfigs = item?.configs?.GR?.configs;
    }else if(cust && cust?.configs?.GR?.configs){
      this.grConfigs = cust?.configs?.GR?.configs;
    } else{
      this.grConfigs = this.storageServ.get('userData').configs.GR.config;
    }
    }
    else if(this.GrSubmissionFrom.value.billingParty){
      this.GrSubmissionFrom.controls['billingParty'].patchValue(undefined);
      this.grConfigs = this.storageServ.get('userData').configs.GR.config;
    }else{
      this.grConfigs = this.storageServ.get('userData').configs.GR.config;
    }
  }
  get f() {
    return this.GrSubmissionFrom.controls;
  }

  get invoices() {
    return this.GrSubmissionFrom.controls['invoices'] as FormArray;
  }
  get eWayBills() {
    return this.GrSubmissionFrom.controls['eWayBills'] as FormArray;
  }

  GrSubmissionFrom = this.fb.group({
    branch: [null, [Validators.required]],
    grDate: [null, [Validators.required]],
    grNumber: [null, [Validators.required]],
    remarks: [null],
    billingParty: [null, [Validators.required]],
    consignor: [null],
    consignee: [null],
    customer: [null],
    invoices: <FormArray>this.fb.array([]),
    eWayBills: <FormArray>this.fb.array([]),
    payment_basis: [null],
    payment_type: [null],
    acknowledge: this.fb.group({
      source: [null],
      destination: [null],
      billedSource:[null],
      billedDestination: [null],
      destinationState: [null],
      rateChartRate:[null],
      baseValue:[null],
      routeDistance: [null]
    }),
  });

  calculation(){
    this.basicFreight = (this.f?.invoices?.value).reduce((a:any, b:any) => a + b['freight'], 0);
    this.totalFreight = this.basicFreight || 0;
    this.cGst = ((this.totalFreight * this.cGST_percent/100 || 0));
    this.sGst = ((this.totalFreight * this.sGST_percent/100 || 0));
    this.iGst = ((this.totalFreight * this.iGST_percent/100 || 0));
    this.totalAmount = this.totalFreight;
    this.totalAmt = ((this.totalFreight + this.iGst + this.cGst + this.sGst));
  }

  //************** Edit invoice data******************
  InsertInvoiceRows(index:number,data: any) {
    (<FormArray>this.invoices).setControl(index,
      this.fb.group({
        showOnBill: [(data && data.showOnBill)],
        material: [(data && data.material)],
        materialUnit: [(data && data.materialUnit)],
        invoiceNo: [(data && data.invoiceNo)],
        invoiceRate: [(data && data.invoiceRate)],
        invoiceAmt: [(data && data.invoiceAmt)],
        invoiceDate: [(data && data.invoiceDate)],
        insurRate: [(data && data.insurRate)],
        insurVal: [(data && data.insurVal)],
        loadRefNumber: [(data && data.loadRefNumber)],
        routeDistance: [(data && data.routeDistance)],
        weightPerUnit: [(data && data.weightPerUnit)],
        dummyCapacityObj: [(data && data.dummyCapacityObj)]||'',
        noOfUnits: [(data && data.noOfUnits)],
        billingWeightPerUnit: [(data && data.billingWeightPerUnit)],
        billingNoOfUnits: [(data && data.billingNoOfUnits)],
        rate: [(data && data.rate)],
        billingRate: [(data && data.billingRate)],
        paymentBasis: [(data && data.paymentBasis)],
        freight: [(data && data.freight)],
        ref1: [(data && data.ref1)],
        ref2: [(data && data.ref2)],
        ref3: [(data && data.ref3)],
        ref4: [(data && data.ref4)],
        ref5: [(data && data.ref5)],
        ref6: [(data && data.ref6)],
        num1: [(data && data.num1)],
        num2: [(data && data.num2)],
        num3: [(data && data.num3)],
        baseValueLabel: [(data && data.baseValueLabel)],
        baseValue: [(data && data.baseValue)],
        capacity: [(data && data.capacity)],
        rateChartRate: [(data && data.rateChartRate)],
        aRateChart: [(data && data.aRateChart)],
        aCapacity: [(data && data.aCapacity)],
      })
    );
  }
  //-----------------------------


  //************** Add Invoice Data******************
  addInvoiceRows(data: any) {
    (<FormArray>this.invoices).push(
      this.fb.group({
        showOnBill: [(data && data.showOnBill)],
        material: [(data && data.material)],
        materialUnit: [(data && data.materialUnit)],
        invoiceNo: [(data && data.invoiceNo)],
        invoiceRate: [(data && data.invoiceRate)],
        invoiceAmt: [(data && data.invoiceAmt)],
        invoiceDate: [(data && data.invoiceDate)],
        insurRate: [(data && data.insurRate)],
        insurVal: [(data && data.insurVal)],
        loadRefNumber: [(data && data.loadRefNumber)],
        routeDistance: [(data && data.routeDistance)],
        weightPerUnit: [(data && data.weightPerUnit)],
        dummyCapacityObj: [(data && data.dummyCapacityObj|| data.baseValueLabel)],
        noOfUnits: [(data && data.noOfUnits)],
        billingWeightPerUnit: [(data && data.billingWeightPerUnit)],
        billingNoOfUnits: [(data && data.billingNoOfUnits)],
        rate: [(data && data.rate)],
        billingRate: [(data && data.billingRate)],
        paymentBasis: [(data && data.paymentBasis)],
        freight: [(data && data.freight)],
        ref1: [(data && data.ref1)],
        ref2: [(data && data.ref2)],
        ref3: [(data && data.ref3)],
        ref4: [(data && data.ref4)],
        ref5: [(data && data.ref5)],
        ref6: [(data && data.ref6)],
        num1: [(data && data.num1)],
        num2: [(data && data.num2)],
        num3: [(data && data.num3)],
        baseValueLabel: [(data && data.baseValueLabel)],
        baseValue: [(data && data.baseValue)],
        capacity: [(data && data.capacity)],
        rateChartRate: [(data && data.rateChartRate)],
        aRateChart: [(data && data.aRateChart)],
        aCapacity: [(data && data.aCapacity)],
      })
    );
  }
  //------------------
  deleteInvoiceRow(index: number) {
    if (this.invoices.controls.length) {
      (<FormArray>this.f.invoices).removeAt(index);
      return true;
    } else return false;
  }

  addEwayBillRows(data: any) {
    (<FormArray>this.eWayBills).push(
      this.fb.group({
        expiry: [(data && data.expiry) || ''],
        number: [(data && data.number) || ''],
      })
    );
  }

  deleteEwayBillRow(index: number) {
    if (this.eWayBills.controls.length) {
      (<FormArray>this.f.eWayBills).removeAt(index);
      return true;
    } else return false;
  }
  backToListView(){
    // this.router.navigateByUrl('home/operation/gr');
    this.location.back();
  }

  fillFormdata(data: any) {
    this.GrSubmissionFrom.patchValue({
      branch: data && data?.branch,
      grDate: data && data?.grDate,
      // grNumber:{bookNo: data && data?.grNumber,billBookId:data && data?.stationaryId},
      remarks: data && data?.remarks,
      billingParty: data && data?.billingParty,
      consignor: data && data?.consignor,
      consignee: data && data?.consignee,
      customer: data && data?.customer,
      payment_basis: data && data?.payment_basis,
      payment_type: data && data?.payment_type,
      acknowledge: {
        source: data && data?.acknowledge?.source,
        destination: data && data?.acknowledge?.destination,
        billedSource: data && data?.acknowledge?.billedSource,
        rateChartRate:data && data?.acknowledge?.rateChartRate,
        baseValue:data && data?.acknowledge?.baseValue,
        routeDistance: data && data?.acknowledge?.routeDistance,
        billedDestination: data && data?.acknowledge?.billedDestination,
        destinationState: data && data?.acknowledge?.destinationState,},
    });
  }
  calculateGst(id:any): any {
      if (!id) {
        this.commonServ.error('BillingParty Not Selected');
      }
      else
      {
        let params = new HttpParams()
              .set('_id', id)
              .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
              .set('all', 'true');
            this.masterService
              .getAllBillingParty({ params })
              .subscribe((data: any) => {
                if (data) {
                  this.Bt_data = data;
                  this.onBillingPartySelect(this.Bt_data[0]);
                  this.calculation();
                }
              });
          }
        }



  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item;
  }

  onChangeBranch(value: any) {
    if (value) {
      this.masterService.getAllBranch({ name: value }).subscribe((res: any) => {
        this.receivedAllBranches = res;
      });
    }
  }

  // GR No Serch Or Centrailized gr No. Search
  getBillBookNo(viewValue:any):any {
    this.getstationarydata=[];
     if( viewValue != 'centrailized' &&  viewValue != 'auto'){
       viewValue = viewValue.trim();
       if(viewValue.length <1){
         return ;
       }
     }
    if (viewValue != 'centrailized' && !this.f.branch.value) {
      this.commonServ.error('Please Select Branch');
      return [];
    }

    if (viewValue != 'centrailized' && !this.f.branch.value.grBook)
      return [];

    if (!this.f.grDate.value) {
      this.commonServ.error('Gr Date is required');
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
    if(this.config && this.config.GR && this.config.GR.manualGr && viewValue  != 'centrailized') return;
    this.masterService.getBillStationary(requestObj).subscribe((data: any) => {
      if (viewValue === 'centrailized' || viewValue === 'auto') {
      if (data[0]) {
        this.getstationarydata=[];
        if(this.config && this.config.GR && this.config.GR.manualGr){
          this.GrSubmissionFrom.controls['grNumber'].patchValue(data[0].bookNo);
        }else {
          this.GrSubmissionFrom.controls['grNumber'].patchValue(data[0]);
          this.getstationarydata = data[0];
        }

      }}else {
        if (data) {
          this.getstationarydata = [];
          this.getstationarydata = data;
        }
      }
    });
  }

  onChangeSearch(value: any, type: string): any {
    if(!this.GrSubmissionFrom.value.customer){
      this.commonServ.error('Select customer before billing party');
      return;
    }
    let _id = this.GrSubmissionFrom.value.customer._id;
    this.receivedBillingParty = [];
    if (value) {
      let params = new HttpParams()
        .set('no_of_docs', 5)
        .set('deleted', false)
        .set('skip', 1)
        .set('customer',_id)
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

  // get billed source and billed destination for gr
  onsearcebilledroute(value: any, type: string): any {
    this.billeddestinationdata = [];
    this.billedsourcedata = [];

    if (value.length > 1) {
      let req = {
        c: value,
        no_of_docs:3
      }
      this.masterService.getbilledroute(req).subscribe((data: any) => {
        if (data) {
          if (type == 'source') {
            this.billedsourcedata = data;
          }
          if (type == 'destination') {
            this.billeddestinationdata = data;
          }
        }
      });
    }
  }
  //////////////////// get Consignor
  getconsignor_consignee(value: any, types: string): any {
    this.getConsignordata =[];
    this.getconsigneedata = [];
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
    this.getCustomerdata = [];
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

  // get source and destination for gr
  getroute(value: any, type: any): any {
    this.getsourcedata = [];
    this.getdestination = [];
    if (value.length > 2) {
      let params = new HttpParams()
        .set('_t', 'autosuggest')
        .set('projection', value)
        .set(type, value)
        .set('request_id', Date.now() + '' + Math.round(Math.random() * 100))
        .set('validate', 'all');
      this.masterService.getgrroute({ params }).subscribe((data: any) => {
        if (data) {
          if (type == 'source') {
            this.getsourcedata = data;
          }
          if (type == 'destination') {
            this.getdestination = data;
          }
        }
      });
    }
  }


  //rate chart data fetch function
  getRates(invoice:any = false,index:number = 0){
    if (!this.f.customer.value || !this.f.grDate.value || !this.f.acknowledge?.value.source || !this.f.acknowledge?.value.destination)
      return;
    if (invoice) {
      this.fetchRateChart(invoice,index);
    }else{
          let ind:number= 0;
      this.GrSubmissionFrom.value.invoices.map((invoiceObj: any) => {
        this.fetchRateChart(invoiceObj,ind);
        ind= ind+1;
      });
    }

  }
  fetchRateChart(invoice:any,index:number){
      if (!invoice.material || !invoice.material.groupCode)
        return;
      let request:any = {};

      if (this.f?.acknowledge?.value.source)
        request.source = this.f.acknowledge.value.source;
      if (this.f?.acknowledge?.value.destination)
        request.destination = this.f?.acknowledge?.value.destination;
      if (invoice?.material?.groupCode)
        request.materialGroupCode = invoice?.material?.groupCode;
      if (this.f.customer?.value._id)
        request.customer = this.f.customer?.value._id;
      if (this.f.grDate.value)
        request.to = new Date(this.f.grDate.value).toISOString() || '';
      this.masterService.GetCustomerRate(request).subscribe((res: any) => {
        if (res) {
          //  ********************
          invoice.aRateChart = res || [];
          (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('aRateChart')?.patchValue(invoice.aRateChart);
          invoice.aCapacity = [];
          if (invoice.aRateChart[0] && invoice.aRateChart[0].baseRate && invoice.aRateChart[0].baseRate.length) {
            invoice.aCapacity = invoice.aRateChart[0].baseRate.filter((o: { baseVal: any; rate: any; }) => !!(o.baseVal && o.rate));
          }
          if(!invoice.aCapacity.length){
            invoice.aCapacity = invoice.aRateChart.map((o: { rate: any; baseValue: any; baseValueLabel: any; }) => ({
              rate: o.rate,
              baseVal: o.baseValue,
              label: o.baseValueLabel
            })).filter((o: { baseVal: any; }) => !!o.baseVal);
          }

          if (invoice.aRateChart.length === 0) {
            invoice.aCapacity = this.grConfigs.capacity.aValue && this.grConfigs.capacity.aValue.map((o: any) => ({
              rate: invoice.rate || 0,
              baseVal: 0,
              label: o
            })) || {};

          }

          if (invoice.aCapacity.length && !(invoice.dummyCapacityObj && invoice.dummyCapacityObj.label)) {
            invoice.dummyCapacityObj = invoice.aCapacity[0];
            (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('dummyCapacityObj')?.patchValue(invoice.dummyCapacityObj);

          }
          if(invoice.aCapacity.length){
            (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('aCapacity')?.patchValue(invoice.aCapacity);
          }
          this.calculateRate(invoice,index);
        }
      });
  }
  //some calculation  when rate chart data fetch
  calculateRate(oInvoice:any,index:number):any {

    if (oInvoice.dummyCapacityObj) {
      oInvoice.baseValueLabel = oInvoice.dummyCapacityObj.label;
      oInvoice.capacity = oInvoice.dummyCapacityObj.baseVal || 0;
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('capacity')?.patchValue(oInvoice.capacity);
    }

    if (!oInvoice.aRateChart)
      return;

    let baseValToCheck:any;

    try {
      if (this.grConfigs.capacity.visible)
        baseValToCheck = oInvoice.capacity;
      else
        baseValToCheck = oInvoice.noOfUnits || 0;

    } catch (e) {
      baseValToCheck = oInvoice.noOfUnits || 0;
    }

    if (typeof baseValToCheck === 'undefined')
      return false;

    // this.setPaymentBasis();

    let aRateChart = oInvoice.aRateChart || [];
    let foundRateChart:any;
    let foundRate:any;

    aRateChart.find((rateChart: { baseRate: any[]; baseValue: number; rate: any; baseValueLabel: any; }) => {

      if (!Array.isArray(rateChart.baseRate) || !rateChart.baseRate.length) {

        if (baseValToCheck <= rateChart.baseValue) {
          foundRate = {
            baseVal: rateChart.baseValue,
            rate: rateChart.rate,
            baseValLabel: rateChart.baseValueLabel
          };
        }

      } else {
        foundRate = rateChart.baseRate.find((oRate: { baseVal: number; rate: any; }) => {
          if (baseValToCheck <= oRate.baseVal && oRate.rate)
            return true;
          return false
        });
      }

      if(!foundRate){
        if (baseValToCheck <= rateChart.baseValue) {
          foundRate = {
            baseVal: rateChart.baseValue,
            rate: rateChart.rate,
            baseValLabel: rateChart.baseValueLabel
          };
        }
      }

      if (!foundRate)
        return false;

      foundRateChart = rateChart;
      return true
    });

    if (!foundRateChart && !foundRate && aRateChart[0]) {
      foundRateChart = aRateChart.slice(-1)[0];

      if (Array.isArray(foundRateChart.baseRate) && foundRateChart.baseRate.length)
        foundRate = foundRateChart.baseRate.slice(-1)[0];
      else {
        foundRate = {
          baseVal: foundRateChart.baseValue,
          rate: foundRateChart.rate,
          baseValLabel: foundRateChart.baseValueLabel
        };
      }

    }

    if (oInvoice && foundRateChart && foundRate)
      this.applyRates(oInvoice,foundRateChart,foundRate,index);
  }
  // Apply rate   when rate chart data fetch from server
  applyRates(oInvoice:any, foundRate:any, baseRate:any,index:number) {

    if (baseRate?.baseVal)
      oInvoice.baseValue = baseRate.baseVal
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValue: oInvoice.baseValue});
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('baseValue')?.patchValue(oInvoice.baseValue);

    if (baseRate?.baseValLabel)
      oInvoice.baseValueLabel = baseRate.baseValLabel;
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValueLabel: baseRate.baseValueLabel});
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('baseValueLabel')?.patchValue(oInvoice.baseValueLabel);

    if (baseRate?.rate)
      oInvoice.rate = oInvoice.rateChartRate = baseRate.rate;
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({rateChartRate: baseRate.rate});
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('rate')?.patchValue(oInvoice.rate);
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('rateChartRate')?.patchValue( oInvoice.rate);

    if (foundRate?.routeDistance)
      oInvoice.routeDistance = foundRate.routeDistance;
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({routeDistance: oInvoice.routeDistance});
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('routeDistance')?.patchValue(oInvoice.routeDistance);

    if (foundRate?.invoiceRate)
      oInvoice.invoiceRate = foundRate.invoiceRate;
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('invoiceRate')?.patchValue(oInvoice.invoiceRate);

    if (foundRate?.insurRate)
      oInvoice.insurRate = foundRate.insurRate;
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('insurRate')?.patchValue(oInvoice.insurRate);

    if (foundRate?.paymentBasis)
      oInvoice.paymentBasis = foundRate.paymentBasis;
    this.GrSubmissionFrom.controls.payment_basis.setValue(foundRate.paymentBasis,{ emitEvent: false });
  }
  // **********Rate chart end

  //rate update when capicity change
  capacitychanges(item:any,index:number){
    if(item && item.label){
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('rate')?.patchValue(item.rate);
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValueLabel: item.label});
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({baseValue: item.baseVal});
      this.GrSubmissionFrom.controls['acknowledge'].patchValue({rateChartRate: item.rate});
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('capacity')?.patchValue(item.baseVal);
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('baseValueLabel')?.patchValue( item.label);
      (this.GrSubmissionFrom.get('invoices')as FormArray).at(index).get('rateChartRate')?.patchValue( item.rate);
    }

  }
  //rate update when capicity change function end

  onsearchMaterial(value:any) {
    this.getmaterialdata=[];
    if(value){
    let req = {
      name: value,
      no_of_docs: 3,
      skip: 1,
    };
    this.masterService.getAllMaterialType(req).subscribe((res: any) => {
      let mat: any[] = [];
      let unit:any[] = [];
        res.forEach(function(obj:any){
            obj.groupName =obj.name,
            obj.groupCode = obj.code,
            obj.groupId = obj._id,
            // obj.unit = obj.unit
                mat.push({...obj});
               unit.push(obj.unit);
        });
        this.getmaterialdata = mat;
        this.materialgetunit = unit;


    });
  }
  }
  getmaterialunit(material:any):any{
    this.materialgetunit= [];
    this.materialgetunit = material.unit;

  }
// GR form submission
  onSubmit() {
    this.Gr_valid = true;

    this.calculation();
    for (const i in this.GrSubmissionFrom.controls) {
      this.GrSubmissionFrom.controls[i].markAsDirty();
      this.GrSubmissionFrom.controls[i].updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.GrSubmissionFrom.invalid) {
      this.Gr_valid = false;
      return;
    }
    const formData = this.GrSubmissionFrom.value;
    this.clean(formData);
    if(!formData.grNumber){
      this.Gr_valid = false;
      this.commonServ.error('Gr No is mandatory ');
      return;

    }
    if(formData.invoices.length > 0){
      this.setPaymentBasis(formData.invoices);
    }
    this.cleaninvoices(formData?.invoices);
    this.cleaninvoices(formData.eWayBills);

    if (formData.invoices?.length<1) {
      this.Gr_valid = false;
      this.commonServ.error('Please add invoice');
      return;
    }

    if (formData.invoices?.length) {

      if (this.totalFreight < 0){
        this.Gr_valid = false;
        this.commonServ.error('Total Freight should be grater than 0');
        return;
      }
    }
    if (this.grConfigs?.eWayBillNum?.req){
      if(formData.eWayBills.length <1) {
        this.Gr_valid = false;
        this.commonServ.error('E-way bill is  required');
        return;
      }
    }
    // if (this.totalFreight > (this.grConfigs.GR && this.grConfigs.GR.maxAllowedFreight || this.constantService?.constants?.grFreight)) {
    //
    //   this.commonServ.error(`Bill Amount is cannot be grater than ${this.grConfigs?.GR && this.grConfigs?.GR?.maxAllowedFreight || this.constantService?.constants?.grFreight}`);
    //   return;
    // }

    if(this.InputData === 'modal') {
      this.GRpopupdata = {};
      // for edit mode
      let GRdata ={
        ...formData,
        'basicFreight':this.basicFreight,
        'cGST': this.cGST,
        'cGST_percent': this.cGST_percent,
        'gr_type': "Own",
        'iGST': this.iGst,
        'iGST_percent': this.iGST_percent,
        'sGST': this.sGst,
        'sGST_percent': this.sGST_percent,
        'totalAmount': this.totalAmt,
        'totalFreight': this.totalFreight,
        grNumber:this.GrSubmissionFrom.controls['grNumber']?.value?.bookNo || this.GrSubmissionFrom.controls['grNumber']?.value,
      }
      this.GRpopupdata = GRdata;
      console.log('gr data submit');
      return;
  }
    let GRdata = {
      ...formData,
      basicFreight: this.basicFreight,
      billingParty: formData?.billingParty?._id,
      cGST: this.cGst,
      cGST_percent: this.cGST_percent,
      consignor: formData?.consignor?._id,
      consignee: formData?.consignee?._id,
      customer: formData?.customer?._id,
      gr_type: "Own",
      stationaryId:this.GrSubmissionFrom.controls['grNumber'].value.billBookId,
      grNumber:this.GrSubmissionFrom.controls['grNumber'].value.bookNo || this.GrSubmissionFrom.controls['grNumber'].value,
      iGST: this.iGst,
      iGST_percent: this.iGST_percent,
      sGST: this.sGst,
      sGST_percent: this.sGST_percent,
      totalAmount: this.totalAmt,
      totalFreight: this.totalFreight,
      trip: this.selectedGr?.trip,
      trip_no: this.selectedGr?.trip_no,
      vehicle_no: this.selectedGr?.vehicle_no,
  }
    this.clean(GRdata);
    this.updateData(GRdata);
}

  updateData(formData: any) {
    this.masterService
      .editGrWithOutTrip(this.getId, formData)
      .subscribe((data: any) => {
        if (data) {
          this.router.navigateByUrl('home/operation/gr');
        }
      });
  }
  cleaninvoices(obj: any) {
    obj.forEach((item: any) => {
      for (let propName in item) {
        if (
          item[propName] === null ||
          item[propName] === undefined ||
          item[propName] === ''
        ) {
          delete item[propName];
        }
      }
    });
  }
  resetFields() {
    for (let propName in this.GrSubmissionFrom.value) {
      delete this.GrSubmissionFrom.value[propName];
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
