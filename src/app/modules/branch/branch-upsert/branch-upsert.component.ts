import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-branch-upsert',
  templateUrl: './branch-upsert.component.html',
  styleUrls: ['./branch-upsert.component.scss']
})
export class BranchUpsertComponent implements OnInit {
  selectedBranchType: any;
  getId : any; // store the id of param
  mode: any;// checking the add or upsert mode
  typeList = ["Headquarters", "Regional Head Office", "State Head Office", "Inland Office", "Overseas Office"];
  submitted = false;
  receivedData: any;
  constructor(
    private fb: FormBuilder,
            private route: ActivatedRoute,
            private masterService: MasterService,
            private commonService: CommonService,
            private router: Router
  ) {
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
          // Add Mode
          this.mode = 1;
        }
      })
    }
    
    loadingObservable = this.commonService.loadingObservable;
    
    branchForm = this.fb.group({
      name: [null,[Validators.required]],
      code: [null,[Validators.required]],
      prim_contact_no: [null,[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      prim_email: [null,[Validators.required, Validators.email]],
      type: [null,[Validators.required]]
    });
   
   // getIdData() {
  //   this.masterService.getAllBranch({ _id: this.getId}).subscribe((data: any) => {
  //     if(data) {
  //       this.fillFormdata(data && data[0]);
  //     }
  //   });
  // }
  
  
  ngOnInit(): void {
    this.commonService.setNavTittleAndMenu("Branch Details");
  }
  
  get f() {
    return this.branchForm.controls;
  }

  fillFormdata (data: any) {
    this.branchForm.patchValue({
      name: data && data.name,
      code: data && data.code,
      prim_contact_no: data && data.prim_contact_no,
      prim_email: data && data.prim_email,
      type: data && data.type
    })
  }

  onSubmit() {
    // this.submitted = true;
    for (const i in this.branchForm.controls) {
      this.branchForm.controls[i].markAsDirty();
      this.branchForm.controls[i].updateValueAndValidity();
    }
    // stop here if form is invalid
    if (this.branchForm.invalid) {
      return;
    }
    const formData = this.branchForm.value;
    if (this.mode === 2 && this.getId) {
      this.updateData(formData);
    } else {
      this.saveData(formData);
    }
  }
  saveData(formData: any) {
    this.masterService.addBranch(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/master/branch');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editBranch(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/branch');
      }
    });
  }
}
