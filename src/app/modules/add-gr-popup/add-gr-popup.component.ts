import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { differenceInCalendarDays, setHours } from 'date-fns';
import { DisabledTimeFn, DisabledTimePartial } from 'ng-zorro-antd/date-picker';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-add-gr-popup',
  templateUrl: './add-gr-popup.component.html',
  styleUrls: ['./add-gr-popup.component.scss']
})
export class AddGrPopupComponent implements OnInit {

  from: any;
  to: any;
  today = new Date();
  grNumber: any;
  disabledDate : any;
  receivedData: any;
  checked = false;
  checkedAll = false;
  indeterminate = false;
  selectedRowsList: any = [];
  selectedRowId: any;
  constructor(
    private commonService: CommonService,
    private masterService: MasterService
  ) { }

  loadingObservable = this.commonService.loadingObservable;

  ngOnInit(): void {
    this.to = new Date();
    this.from = new Date();
    this.from = new Date(this.from.setMonth(this.today.getMonth()-1));
    this.search();
  }

  // disabledDate = (current: Date): boolean => 
  //   differenceInCalendarDays(current, this.today) > 0;

  search() {
    if (new Date(this.from) > new Date()) {
      this.commonService.errorModal('Error', 'Start Date cannot be future')
      return;
    } else if (new Date(this.to) > new Date()) {
      this.commonService.errorModal('Error', 'End Date cannot be future')
      return;
    } else if (new Date(this.from) > new Date(this.to)) {
      this.commonService.errorModal('Error', 'Start Date must be less then End Date')
      return;
    }
    let request: any = {};
    request.from = this.from?.toISOString();
    request.to = this.to?.toISOString();
    request.grNumber = this.grNumber;
    let obj = {
      dateType: 'grDate',
      gr_type: {$ne: "Trip Memo"},
      no_of_docs: 5,
      skip: 1,
      sort: {grNumber: 1},
      source: 'Gr',
      tableId: false,
      trip: {$exists: false}
    };
    request = {...request, ...obj};
    this.masterService.getTripGr(request).subscribe((data: any)=> {
      if(data) {
        this.receivedData = data;
        this.receivedData.forEach((item: any) =>{
          item.checked = false;
        });
      }
    })
  }
  
  selectItem(item: any,value: any) {
    if(value) {
     this.selectedRowsList.push(item);
    } else {
       const idx = this.selectedRowsList.indexOf(item);
       if(idx > -1) {
         this.selectedRowsList.splice(idx, 1);
       }
    }
   console.log(this.selectedRowsList);
   this.selectedRowId = item;
 }

 selectAllRow (value: boolean) {
  this.receivedData.forEach((item: any) => {
    item.checked = value;
    this.selectItem(item, value);
  });
  console.log("selectAllRow");
}

}

