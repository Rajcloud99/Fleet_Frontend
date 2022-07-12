import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mergeString'
})
export class MergeStringPipe implements PipeTransform {

      transform(input: any,ele:string): any {
        let temp:any = [];
        Array.isArray(input) && input.map(function (value) {
          if (value)
            temp.push(value);
        });

        if (temp.length)
          temp = temp.join(ele);
        else
          temp = "NA";
        return temp;
      }

}
