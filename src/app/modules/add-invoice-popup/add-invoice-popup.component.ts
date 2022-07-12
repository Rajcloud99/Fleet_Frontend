import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {MasterService} from "../master.service";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-add-invoice-popup',
  templateUrl: './add-invoice-popup.component.html',
  styleUrls: ['./add-invoice-popup.component.scss']
})
export class AddInvoicePopupComponent implements OnInit {
  // getdata from parent component
  @Input () grConfigs: any;
  @Input() ArrayData:any;
  @Input() RategetInfo:any;
  // ******************************
  materialgetunit:any;
  getmaterialdata:any;
  formvalidation:boolean = true;
  dateFormat = 'dd/MM/yyyy'; // date format of datepicker
  constructor(
    private fb: FormBuilder,
    private masterService :MasterService,
    private commonService : CommonService,
  ) {

  }

  ngOnInit(): void {
    if(this.ArrayData) {
      this.fillFormdata(this.ArrayData);

      if (this.ArrayData?.material) {
        this.getmaterialdata = [this.ArrayData?.material];
        this.materialgetunit = [this.ArrayData?.material?.unit[0]]
      }
    }
    this.formulachanges();
  }
  InvoiceForm = this.fb.group({
    showOnBill: [true],
    material: [null],
    materialUnit: [null],
    invoiceNo: [null],
    invoiceRate: [null],
    invoiceAmt: [null],
    invoiceDate: [null],
    insurRate: [null],
    insurVal: [null],
    loadRefNumber: [null],
    routeDistance: [null],
    weightPerUnit: [null],
    capacity: [null],
    noOfUnits: [null],
    dummyCapacityObj: [null],
    billingWeightPerUnit: [null],
    billingNoOfUnits: [null],
    rate: [null],
    billingRate: [null],
    paymentBasis: [null],
    freight: [null],
    baseValueLabel: [null],
    baseValue: [null],
    aCapacity: [null],
    aRateChart: [null],
    rateChartRate: [null],
    ref1: [null],
    ref2: [null],
    ref3: [null],
    ref4: [null],
    ref5: [null],
    ref6: [null],
    num1: [null],
    num2: [null],
    num3: [null],
  });
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
  calculation(){

  }
  get S() {
    return this.InvoiceForm.controls;
  }
  fillFormdata(data:any) {
    if (data) {
      this.InvoiceForm.patchValue({
        showOnBill: data && data.showOnBill || '',
        material: data && data.material || '',
        materialUnit: data && data.materialUnit || '',
        invoiceNo: data && data.invoiceNo || '',
        invoiceRate: data && data.invoiceRate || '',
        invoiceAmt: data && data.invoiceAmt || '',
        invoiceDate: data && data.invoiceDate || '',
        insurRate: data && data.insurRate || '',
        insurVal: data && data.insurVal || '',
        loadRefNumber: data && data.loadRefNumber || '',
        routeDistance: data && data.routeDistance || '',
        weightPerUnit: data && data.weightPerUnit || '',
        dummyCapacityObj: data && data.dummyCapacityObj || '',
        noOfUnits: data && data.noOfUnits || '',
        billingWeightPerUnit: data && data.billingWeightPerUnit || '',
        billingNoOfUnits: data && data.billingNoOfUnits || '',
        rate: data && data.rate || '',
        billingRate: data && data.billingRate || '',
        paymentBasis: data && data.paymentBasis || '',
        freight: data && data.freight || '',
        ref1: data && data.ref1 || '',
        ref2: data && data.ref2 || '',
        ref3: data && data.ref3 || '',
        ref4: data && data.ref4 || '',
        ref5: data && data.ref5 || '',
        ref6: data && data.ref6 || '',
        num1: data && data.num1 || '',
        num2: data && data.num2 || '',
        num3: data && data.num3 || '',
        baseValueLabel:data && data.baseValueLabel || '',
        baseValue:data && data.baseValue || '',
        capacity:data && data.capacity || '',
        rateChartRate:data && data.rateChartRate || '',
        aRateChart:data && data.aRateChart,
        aCapacity:data && data.aCapacity,
      });
    }
  }



  //rate chart data fetch function
  getRates(invoice:any = false){
    if (!this.RategetInfo.customer || !this.RategetInfo.to || !this.RategetInfo.source || !this.RategetInfo.destination)
      return;
    if (invoice) {
      this.fetchRateChart(invoice);
    }
  }
  fetchRateChart(invoice:any){
    if (!invoice.material || !invoice.material.groupCode)
      return;
    let request:any = {};

    if (this.RategetInfo.source)
      request.source = this.RategetInfo.source;
    if (this.RategetInfo.destination)
      request.destination = this.RategetInfo.destination;
    if (this.InvoiceForm.value.material?.groupCode)
      request.materialGroupCode = this.InvoiceForm.value.material?.groupCode;
    if (this.RategetInfo.customer)
      request.customer = this.RategetInfo.customer;
    if (this.RategetInfo.to)
      request.to = new Date(this.RategetInfo.to).toISOString() || '';
    this.masterService.GetCustomerRate(request).subscribe((res: any) => {
      if (res) {
        //  ********************
        invoice.aRateChart = res || [];
        (this.InvoiceForm.controls['aRateChart'].patchValue(invoice.aRateChart));
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
          // invoice.dummyCapacityObj = [];
          invoice.dummyCapacityObj = invoice.aCapacity[0];
          (this.InvoiceForm.controls['dummyCapacityObj'].patchValue(invoice.dummyCapacityObj));

        }
        if(invoice.aCapacity.length){
          (this.InvoiceForm.controls['aCapacity'].patchValue(invoice.aCapacity));
        }
        this.calculateRate(invoice);
      }
    });
  }
  //some calculation  when rate chart data fetch
  calculateRate(invoice:any):any {

    if (invoice.dummyCapacityObj) {
      invoice.baseValueLabel = invoice.dummyCapacityObj.label;
      invoice.capacity = invoice.dummyCapacityObj.baseVal || 0;
      (this.InvoiceForm.controls['capacity'].patchValue(invoice.capacity));
    }

    if (!invoice.aRateChart)
      return;

    let baseValToCheck:any;

    try {
      if (this.grConfigs.capacity.visible)
        baseValToCheck = invoice.capacity;
      else
        baseValToCheck = invoice.noOfUnits || 0;

    } catch (e) {
      baseValToCheck = invoice.noOfUnits || 0;
    }

    if (typeof baseValToCheck === 'undefined')
      return false;

    let aRateChart = invoice.aRateChart || [];
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

    if (invoice && foundRateChart && foundRate)
      this.applyRates(invoice,foundRateChart,foundRate);
  }
  // Apply rate   when rate chart data fetch from server
  applyRates(oInvoice:any, foundRate:any, baseRate:any) {

    if (baseRate?.baseVal)
      (this.InvoiceForm.controls['baseValue'].patchValue(baseRate.baseVal));

    if (baseRate?.baseValLabel)
      (this.InvoiceForm.controls['baseValueLabel'].patchValue(baseRate.baseValLabel));

    if (baseRate?.rate)
      (this.InvoiceForm.controls['rate'].patchValue(baseRate.rate));
      (this.InvoiceForm.controls['rateChartRate'].patchValue( baseRate.rate));

    if (foundRate?.routeDistance)
      (this.InvoiceForm.controls['routeDistance'].patchValue(foundRate.routeDistance));

    if (foundRate?.invoiceRate)
      (this.InvoiceForm.controls['invoiceRate'].patchValue(foundRate.invoiceRate));

    if (foundRate?.insurRate)
      (this.InvoiceForm.controls['insurRate'].patchValue(foundRate.insurRate));

    if (foundRate?.paymentBasis)
    (this.InvoiceForm.controls['paymentBasis'].patchValue(foundRate.paymentBasis));
    this.formulachanges();
  }
  // **********Rate chart end

  //rate update when capicity change
  capacitychanges(item:any){
    if(item && item.label){
      (this.InvoiceForm.controls['rate'].patchValue(item?.rate));
      (this.InvoiceForm.controls['rateChartRate'].patchValue( item?.rate));
      (this.InvoiceForm.controls['baseValueLabel'].patchValue(item?.label));
      (this.InvoiceForm.controls['baseValue'].patchValue(item?.baseVal));
      (this.InvoiceForm.controls['capacity'].patchValue(item?.baseVal));
      this.formulachanges();
    }

  }
  //rate update when capicity change function end

//formula based calculation start
  formulachanges(){
    if(this.grConfigs?.invoiceRate?.evalExp){
      this.InvoiceForm.controls['invoiceRate'].patchValue(this.formulabasedcalculation(this.grConfigs.invoiceRate.evalExp));
    }
    if(this.grConfigs?.invoiceAmt?.evalExp){
      this.InvoiceForm.controls['invoiceAmt'].patchValue(this.formulabasedcalculation(this.grConfigs.invoiceAmt.evalExp));
    }
    if(this.grConfigs?.insurVal?.evalExp){
      this.InvoiceForm.controls['insurVal'].patchValue(this.formulabasedcalculation(this.grConfigs.insurVal.evalExp));
    }
    if(this.grConfigs?.insurRate?.evalExp){
      this.InvoiceForm.controls['insurRate'].patchValue(this.formulabasedcalculation(this.grConfigs.insurRate.evalExp));
    }
    if(this.grConfigs?.routeDistance?.evalExp){
      this.InvoiceForm.controls['routeDistance'].patchValue(this.formulabasedcalculation(this.grConfigs.routeDistance.evalExp));
    }
    if(this.grConfigs?.weightPerUnit?.evalExp){
      this.InvoiceForm.controls['weightPerUnit'].patchValue(this.formulabasedcalculation(this.grConfigs.weightPerUnit.evalExp));
    }
    if(this.grConfigs?.noOfUnits?.evalExp){
      this.InvoiceForm.controls['noOfUnits'].patchValue(this.formulabasedcalculation(this.grConfigs.noOfUnits.evalExp));
    }
    if(this.grConfigs?.billingWeightPerUnit?.evalExp){
      this.InvoiceForm.controls['billingWeightPerUnit'].patchValue(this.formulabasedcalculation(this.grConfigs.billingWeightPerUnit.evalExp));
    }
    if(this.grConfigs?.billingNoOfUnits?.evalExp){
      this.InvoiceForm.controls['billingNoOfUnits'].patchValue(this.formulabasedcalculation(this.grConfigs.billingNoOfUnits.evalExp));
    }
    if(this.grConfigs?.rate?.evalExp){
      this.InvoiceForm.controls['rate'].patchValue(this.formulabasedcalculation(this.grConfigs.freight.rate));
    }
    if(this.grConfigs?.billingRate?.evalExp){
      this.InvoiceForm.controls['billingRate'].patchValue(this.formulabasedcalculation(this.grConfigs.billingRate.evalExp));
    }
    //freight calculate
    if(this.grConfigs?.freight?.evalExp){
      this.InvoiceForm.controls['freight'].patchValue(this.formulabasedcalculation(this.grConfigs.freight.evalExp));
    } else{
      this.InvoiceForm.controls['freight'].patchValue(this.InvoiceForm.value?.rate || 0);
    }
    if(this.grConfigs?.num1?.evalExp){
      this.InvoiceForm.controls['num1'].patchValue(this.formulabasedcalculation(this.grConfigs.num1.evalExp));
    }
    if(this.grConfigs?.num2?.evalExp){
      this.InvoiceForm.controls['num2'].patchValue(this.formulabasedcalculation(this.grConfigs.num2.evalExp));
    }
    if(this.grConfigs?.num3?.evalExp){
      this.InvoiceForm.controls['num3'].patchValue(this.formulabasedcalculation(this.grConfigs.num3.evalExp));
    }
  }
//formula based calculation main formula converter
  formulabasedcalculation(aFormula=[]): any {
      let str = '',
        index=-1;

      aFormula.forEach( (s: any | any[]) => {
        let temp;

        if(s === '+' || s === '*' || s === '/' || s ==='-' || s === '(' || s === ')') {
          str += s;
        }else if(typeof s === 'number') {
          str += s;
        }else if((index = s.indexOf('(RC)'))+1){
          let key:any = s.slice(0, index);
          str += (this.InvoiceForm.value['rateChart' + key[0].toUpperCase() + key.slice(1)] || this.InvoiceForm.value[key]);
        }else {
          temp = 'this.InvoiceForm.value';
          if (temp) {
            str += temp+'.'+`${s}`;
          }
        }
      });

      try {
        return eval(str);
      }
      catch (e) {
        return 0;
        console.log(e);
      }
    }


//    submit button
  Submit(){
    this.formvalidation = true;
   if(this.grConfigs?.materialName?.req){
    if(!this.InvoiceForm.value.material){
      this.commonService.error((this.grConfigs?.materialName?.label || 'Matrial')+' is mandatory ');
      this.formvalidation =false;
      return;
    }
   }
   if(this.grConfigs?.materialUnit?.req){
       if(!this.InvoiceForm.value.materialUnit){
         this.commonService.error((this.grConfigs?.materialUnit?.label || 'MATERIAL UNIT')+' is mandatory ');
         this.formvalidation =false;
         return;
       }
     }
   if(this.grConfigs?.invoiceNo?.req) {
     if (!this.InvoiceForm.value.invoiceNo) {
       this.commonService.error((this.grConfigs?.invoiceNo?.label || 'INVOICE NO.') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.invoiceRate?.req) {
     if (!this.InvoiceForm.value.invoiceRate) {
       this.commonService.error((this.grConfigs?.invoiceRate?.label || 'INVOICE Rate') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.invoiceAmt?.req) {
     if (!this.InvoiceForm.value.invoiceAmt) {
       this.commonService.error((this.grConfigs?.invoiceAmt?.label || 'INVOICE AMOUNT') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.invoiceDate?.req) {
     if (!this.InvoiceForm.value.invoiceDate) {
       this.commonService.error((this.grConfigs?.invoiceDate?.label || 'INVOICE DATE') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.insurVal?.req) {
     if (!this.InvoiceForm.value.insurVal) {
       this.commonService.error((this.grConfigs?.insurVal?.label || 'Insurance Value') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.loadRefNumber?.req) {
     if (!this.InvoiceForm.value.loadRefNumber) {
       this.commonService.error((this.grConfigs?.loadRefNumber?.label || 'LOAD REF. NUMBER') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.routeDistance?.req) {
     if (!this.InvoiceForm.value.routeDistance) {
       this.commonService.error((this.grConfigs?.routeDistance?.label || 'KM') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   if(this.grConfigs?.weightPerUnit?.req) {
     if (!this.InvoiceForm.value.weightPerUnit) {
       this.commonService.error((this.grConfigs?.weightPerUnit?.label || 'ACTUAL WEIGHT PER UNIT') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
   // else if(this.grConfigs?.capacity?.visible) {
   //   if (!this.InvoiceForm.value.capacity) {
   //     this.commonService.error((this.grConfigs?.capacity?.label || 'CAPACITY') + ' is mandatory ');
   //     this.formvalidation = false;
   //     return;
   //   }
   // }
    if(this.grConfigs?.noOfUnits?.req) {
     if (!this.InvoiceForm.value.noOfUnits) {
       this.commonService.error((this.grConfigs?.noOfUnits?.label || 'Actual Unit') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.billingWeightPerUnit?.req) {
     if (!this.InvoiceForm.value.billingWeightPerUnit) {
       this.commonService.error((this.grConfigs?.billingWeightPerUnit?.label || 'BILLING WEIGHT PER UNIT') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.billingNoOfUnits?.req) {
     if (!this.InvoiceForm.value.billingNoOfUnits) {
       this.commonService.error((this.grConfigs?.billingNoOfUnits?.label || 'Billing Unit') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.rate?.req) {
     if (!this.InvoiceForm.value.rate) {
       this.commonService.error((this.grConfigs?.rate?.label || 'RATE') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.billingRate?.req) {
     if (!this.InvoiceForm.value.billingRate) {
       this.commonService.error((this.grConfigs?.billingRate?.label || 'Billing Rate') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.freight?.req) {
     if (!this.InvoiceForm.value.freight) {
       this.commonService.error((this.grConfigs?.freight?.label || 'FREIGHT') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }else if(this.grConfigs?.ref1?.req) {
     if (!this.InvoiceForm.value.ref1) {
       this.commonService.error((this.grConfigs?.ref1?.label || 'Item Ref 1') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.ref2?.req) {
     if (!this.InvoiceForm.value.ref2) {
       this.commonService.error((this.grConfigs?.ref2?.label || 'Item Ref 2') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.ref3?.req) {
     if (!this.InvoiceForm.value.ref3) {
       this.commonService.error((this.grConfigs?.ref3?.label || 'Item Ref 3') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.ref4?.req) {
     if (!this.InvoiceForm.value.ref4) {
       this.commonService.error((this.grConfigs?.ref4?.label || 'Item Ref 4') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.ref5?.req) {
     if (!this.InvoiceForm.value.ref5) {
       this.commonService.error((this.grConfigs?.ref5?.label || 'Item Ref 5') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.ref6?.req) {
     if (!this.InvoiceForm.value.ref6) {
       this.commonService.error((this.grConfigs?.ref6?.label || 'Item Ref 6') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.num1?.req) {
     if (!this.InvoiceForm.value.num1) {
       this.commonService.error((this.grConfigs?.num1?.label || 'Num1') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.num2?.req) {
     if (!this.InvoiceForm.value.num2) {
       this.commonService.error((this.grConfigs?.num2?.label || 'Num2') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }
    if(this.grConfigs?.num3?.req) {
     if (!this.InvoiceForm.value.num3) {
       this.commonService.error((this.grConfigs?.num3?.label || 'Num3') + ' is mandatory ');
       this.formvalidation = false;
       return;
     }
   }

  }
}
