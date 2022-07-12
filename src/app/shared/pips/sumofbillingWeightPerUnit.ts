import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumofbillingWeightPerUnit'
})
export class SumofbillingWeightPerUnit implements PipeTransform {

  transform(obj: any,element:string): any {
     let returnObj = 0;
    if (Array.isArray(obj)){
      obj.forEach(function(o:any){
        returnObj += o.billingNoOfUnits||0;
      });
    }
    return returnObj;
  };
}
