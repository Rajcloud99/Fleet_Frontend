import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calhourmin'
})
export class CalHourMinPipe implements PipeTransform {

      transform(duration: any): any {
          if(!duration)
            return '';

          let string = '';
          if(duration>=1)
            string+=((parseInt(duration))+'Hr ');
          if(duration%1>0)
            string+=((parseInt(String((duration % 1) * 60)))+'Min');

          return string;

      }

}
