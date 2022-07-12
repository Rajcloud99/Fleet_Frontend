import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
import {MasterService} from "../../master.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";

@Component({
  selector: 'app-material-group-upsert',
  templateUrl: './material-group-upsert.component.html',
  styleUrls: ['./material-group-upsert.component.scss']
})
export class MaterialGroupUpsertComponentT implements OnInit {

  materialGroupForm: any;
  receivedGroupData: any;
  unitList: any = ["Pcs", "Ft", "Tonne", "Ltr", "Bags", "Drum", "Hours"];
  mode: any;
  getId: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,

  ) {
    this.materialGroupForm = this.fb.group({
      name: [null,[Validators.required]],
      code: [null,[Validators.required]],
      unit: [null],
      // unit: new FormArray([
      //   new FormControl('')
      // ]),
      description: [null],
    });

    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        // Edit or Update Mode
        this.mode = 2;
        this.getId = queryParam._id;
        this.getIdData(this.getId);
        // const currentState = this.router.getCurrentNavigation();
        // this.receivedGroupData = currentState && currentState.extras.state;
        // this.fillFormdata(this.receivedGroupData);

      } else {
        // Add Mode
        this.mode = 1;
      }
    })

  }

  loadingObservable = this.commonService.loadingObservable;

  ngOnInit(): void {
  }

  getIdData(id:string){
    let params = new HttpParams()
      .set('sort',-1)
      // .set('deleted',false)
      .set('all',true)
      .set('request_id',Date.now()+''+Math.round(Math.random()*100))
      .set('validate','all');
    this.masterService.getAllMaterialType({_id:id}).subscribe((res: any) => {
      console.log('ritika', res);
      if(res){
        this.fillFormdata(res[0]);
      }
      // this.receivedGroupData = res;
    });
  }

  fillFormdata (data: any) {
    this.materialGroupForm.patchValue({
      name: data && data.name,
      code: data && data.code,
      unit: data && data.unit[0],
      description: data && data.description
    })
  }
  onSubmitGroup(){
    if (this.materialGroupForm.invalid) {
      return;
    }
    const values = this.materialGroupForm.value;
    console.log('this.materialGroupForm.value', this.materialGroupForm.value);
    this.materialGroupForm.value.unit = [this.materialGroupForm.value.unit];
    console.log(values);
    if (this.mode === 2 && this.getId) {
      this.updateData(values);
    } else {
      this.saveData(values);
    }
  }
  saveData(formData: any) {
    this.masterService.addGroupMaterial(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/master/material');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editMaterialGroup(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/material');
      }
    });
  }

}
