import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayofstring'
})
export class ArrayofstringPipe implements PipeTransform {

      transform(input: any,ele:string): any {
        let returnObj;
        if (Array.isArray(input))
          returnObj = (input.map(obj => obj[ele]) || [ele]).filter( o => !!o).join(', ');
        else
          returnObj ='NA';
        if(returnObj=='')
          returnObj = 'NA'

        return returnObj;
      };
}
