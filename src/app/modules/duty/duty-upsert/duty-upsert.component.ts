import {Component, HostListener, OnInit} from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {differenceInCalendarDays} from "date-fns";
import {MasterService} from "../../master.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-duty-upsert',
  templateUrl: './duty-upsert.component.html',
  styleUrls: ['./duty-upsert.component.scss']
})
export class DutyUpsertComponent implements OnInit {

  dutyForm: any;
  booking_date: any;
  time: any;
  branch_id:any;
  serve_start:any;
  receivedAllBranches: any;
  receivedAllCustomers: any;
  receivedAllMaterials: any;
  mode: any;
  getId: any;
  aRoute:any;
  innerWidth: any;
  aBookingTypes:any = ["Domestic - Loose Cargo", "Import - Containerized", "Export - Containerized", "Domestic - Containerized", "Import - Loose Cargo", "Export - Loose Cargo", "Empty - Containerized", "Empty - Vehicle", "Transporter Booking"];

  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    ) {
    this.dutyForm = this.fb.group({
      booking_type: [null,[Validators.required]],
      booking_date: [null,[Validators.required]],
      serve_start : [null],
      serve_end : [null],
      branch_id: [null],
      customer:[null],
      route:[null],
      material_type : [null],
      remark: [null],
    });

    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        // Edit or Update Mode
        this.mode = 2;
        this.getId = queryParam._id;
        this.getIdData(this.getId);
      } else {
        // Add Mode
        this.mode = 1;
      }
    })
  }

  loadingObservable = this.commonService.loadingObservable

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
this.commonService.setNavTittleAndMenu('Duty Details');
  }

  today = new Date();
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  branchSearch(value: any) {
    if(value) {
      this.masterService.getAllBranch({name: value}).subscribe((res: any) => {
        this.receivedAllBranches = res;
      });
    }
  }
  customerSearch(value: any) {
    if(value) {
      // this.receivedAllCustomers = [];
      this.masterService.getAllCustomer({name: value}).subscribe((res: any) => {
        this.receivedAllCustomers = res;
      });
    }
  }
  getRoute(value: any) {
    if(value.length < 2) return;
    this.masterService.getRouteName({'name':value}).subscribe((res: any)=>{
      if(res) {
        this.aRoute = res;
      }
    });
  }
  materialSearch(value: any) {
    if(value) {
      // this.receivedAllMaterials = [];
      this.masterService.getAllMaterialType({name: value}).subscribe((res: any) => {
        this.receivedAllMaterials = res;
      });
    }
  }
  onSubmit(){
    if (this.dutyForm.invalid) {
      return;
    }
    const values = this.dutyForm.value;
    console.log('this.dutyForm.value', this.dutyForm.value);
    console.log(values);
    if (this.mode === 2 && this.getId) {
      this.updateData(values);
    } else {
      this.saveData(values);
    }
  }
  saveData(formData: any) {
    this.masterService.addDuty(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.router.navigateByUrl('home/operation/duty');
      }
    });
  }
  getIdData(id:string){
    let params = new HttpParams()
      .set('sort',-1)
      // .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('validate','all');
    this.masterService.getAllBooking({_id:id}).subscribe((res: any) => {
      console.log('ritika', res);
      if(res){
        this.receivedAllBranches = [res[0].branch_id];
        this.receivedAllCustomers = [res[0].customer];
        this.receivedAllMaterials = [res[0].material_type];
        this.aRoute  = res[0].route;
        console.log('receivedAllBranches',this.receivedAllBranches);
        this.fillFormdata(res[0]);
      }
    });
  }
  fillFormdata (data: any) {
    console.log(data.branch_id._id);
    this.dutyForm.patchValue({
      booking_type: data && data.booking_type ,
      booking_date: data && data.booking_date ,
      serve_start : data && data.serve_start ,
      serve_end : data && data.serve_end ,
      branch_id: data && data.branch_id._id,
      customer: data && data.customer._id,
      route: data && data.route[0] && data.route[0]._id,
      material_type : data?.material_type._id,
      remark: data && data.remark ,
    })
  }
  updateData(formData: any) {
    this.masterService.editDuty(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/operation/duty');
      }
    });
  }
}
