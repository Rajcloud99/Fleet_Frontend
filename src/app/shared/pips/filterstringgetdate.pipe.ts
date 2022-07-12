import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterstringgetdate'
})
export class FilterstringgetdatePipe implements PipeTransform {

  transform(input: any,ele:string): any {
    let returnObj;
    if (Array.isArray(input)){
      let i: number;
      for (i = 0; i < input.length; i++) {
        if (input[i].status == ele) {
          if (input[i].date) {
            returnObj = (input[i].date);
          }
        }
      }
    }
        return returnObj;

   };
  }
