import { NgModule } from '@angular/core';
import {ArrayofstringPipe} from "./pips/arrayofstring.pipe";
import {FilterstringgetdatePipe} from "./pips/filterstringgetdate.pipe";
import {MergeStringPipe} from "./pips/mergeString.pipe";
import {FormatAddressPipe} from "./pips/formatAddress.pipe";
import {SumofbillingWeightPerUnit} from "./pips/sumofbillingWeightPerUnit";
import {SumofbillingNoOfUnitsPipe} from "./pips/sumofbillingNoOfUnits.pipe";
import {getArrayElementSumPipe} from "./pips/getArrayElementSum.pipe";
import {CalHourMinPipe} from "./pips/CalHourMin.pipe";

@NgModule({
  declarations: [
ArrayofstringPipe,
FilterstringgetdatePipe,
MergeStringPipe,
FormatAddressPipe,
SumofbillingWeightPerUnit,
SumofbillingNoOfUnitsPipe,
getArrayElementSumPipe,
CalHourMinPipe
  ],
  exports: [
    ArrayofstringPipe,
    FilterstringgetdatePipe,
    MergeStringPipe,
    FormatAddressPipe,
    SumofbillingWeightPerUnit,
    SumofbillingNoOfUnitsPipe,
    getArrayElementSumPipe,
    CalHourMinPipe

  ]
})
export class CommonPipsModule {

}
