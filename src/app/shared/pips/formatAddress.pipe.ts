import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

      transform(input: any,ele:string): any {
        let temp:any = [];
        if(input)
        Array.isArray([input.city,input.state,input.country]) && [input.city,input.state,input.country].map(function (value) {
        if (value)
        temp.push(value);
             });
       if (temp.length) {
         temp = temp.join(ele);
       }else{
           temp = "NA";
         }
      return temp;
}
}
