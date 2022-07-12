import {Component, HostListener, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
import {MasterService} from "../../master.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ConstantService} from "../../../services/constant.service";

@Component({
  selector: 'app-customer-upsert',
  templateUrl: './customer-upsert.component.html',
  styleUrls: ['./customer-upsert.component.scss']
})
export class CustomerUpsertComponent implements OnInit {

  CustomerForm: any;
  mode: any;
  getId: any;
  receivedData: any;
  aGSTstates: any;
  custTypes: any;
  categoryList:any;

  private myForm: any;
  private innerWidth: any;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private constantService: ConstantService,

  ) {
    this.CustomerForm = this.fb.group({
      category : [null,[Validators.required]],
      name : [null,[Validators.required]],
      city :[null,[Validators.required]],
      state :[null,[Validators.required]],
      type : [null,[Validators.required]],
      gstin_no : [null],
      line1 : [null],
      // address :this.fb.group({
      //   line1 :  [null],
      //   line2 :  [null],
      //   city :  [null],
      //   state :  [null]
      // }),
    });

    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        // Edit or Update Mode
        this.mode = 2;
        this.getId = queryParam._id;
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = currentState && currentState.extras.state;
        this.fillFormdata(this.receivedData);
        // this.getIdData();
      } else {
        this.CustomerForm.get('customer').push(
          new FormControl('')
        )
        // Add Mode
        this.mode = 1;
      }
    })
  }

  loadingObservable = this.commonService.loadingObservable;

  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  
  ngOnInit(): void {
    this.commonService.setNavTittleAndMenu("Customer Details");
    this.aGSTstates = this.constantService.constants.aGSTstates;
    this.custTypes = this.constantService.constants.custTypes;
    this.categoryList = this.constantService.constants.categoryList;
  }

  onSubmit(){
    if (this.CustomerForm.invalid) {
      return;
    }
    const values = this.CustomerForm.value;
    values.address = {
      line1 : this.CustomerForm.value.line1,
      // line2 :  this.CustomerForm.value.line2,
      city : this.CustomerForm.value.city,
      state :  this.CustomerForm.value.state,
    };

    if (this.mode === 2 && this.getId) {
      this.updateData(values);
    } else {
      this.saveData(values);
    }
  }

  saveData(formData: any) {
    this.masterService.addCustomer(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/master/customer');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editCustomer(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/customer');
      }
    });
  }

  fillFormdata (data: any) {
    this.CustomerForm.patchValue({
      category: data && data.category,
      name: data && data.name,
      city: data && data.address && data.address.city,
      state: data && data.address && data.address.state,
      type: data && data.type,
      gstin_no: data && data.gstin_no,
      line1: data && data.address && data.address.line1
    })

  }

  //   onCheckChange(event: any) {
  //   const formArray: FormArray = this.myForm.get('myChoices') as FormArray;
  //
  //   /* Selected */
  //   if(event.target.checked){
  //     // Add a new control in the arrayForm
  //     formArray.push(new FormControl(event.target.value));
  //   }
  //   /* unselected */
  //   else{
  //     // find the unselected element
  //     let i: number = 0;
  //
  //     // @ts-ignore
  //     formArray.controls.forEach((ctrl: FormControl) => {
  //       if(ctrl.value == event.target.value) {
  //         // Remove the unselected element from the arrayForm
  //         formArray.removeAt(i);
  //         return;
  //       }
  //
  //       i++;
  //     });
  //   }
  // }

}
