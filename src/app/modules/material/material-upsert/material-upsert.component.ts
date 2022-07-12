import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MasterService} from "../../master.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-material-upsert',
  templateUrl: './material-upsert.component.html',
  styleUrls: ['./material-upsert.component.scss']
})
export class MaterialUpsertComponent implements OnInit {
  categoryList: any = [
    {name: "HSN Code", value : "hsn"},
    {name: "SAC Code", value : "sac"}];
  gstList: any = [
    {name: "0%", value: 0},
    {name: "0.5%", value: 0.5},
    {name: "1%", value: 1},
    {name: "2%", value: 2},
    {name: "5%", value: 5},
    {name: "10%", value: 10},
    {name: "12%", value: 12},
    {name: "15%", value: 15},
    {name: "18%", value: 18},
    {name: "24%", value: 24},
    {name: "28%", value: 28},
    {name: "40%", value: 40},
  ];
  unitList: any = ["Pcs", "Ft", "Tonne", "Ltr", "Bags", "Drum", "Hours"];
  mode: any;
  getId: any;
  receivedData: any;
  materialForm: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,

) {
    this.materialForm = this.fb.group({
      category: [null,[Validators.required]],
      hsnCode: [null],
      sacCode: [null],
      pUnitWt: [null,[Validators.required]],
      gstPercent: [null,[Validators.required]],
      unit: [null,[Validators.required]],
      // material: [null]
      material: new FormArray([

      ])
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
        this.materialForm.get('material').push(
          new FormControl('')
        )
        // Add Mode
        this.mode = 1;
      }
    })
  }

  loadingObservable = this.commonService.loadingObservable;


  ngOnInit(): void {
    this.commonService.setNavTittleAndMenu("Material Details")
    console.log('this.materialForm', this.materialForm);
  }

  onSubmit() {
    console.log(this.materialForm)
    if (this.materialForm.invalid) {
      return;
    }
    const values = this.materialForm.value;
    // this.materialForm.value.material = [this.materialForm.value.material];
    console.log(values);
  if(this.materialForm.value.category === 'sac')
    delete this.materialForm.value.hsnCode;
  else
    delete this.materialForm.value.sacCode;

    if (this.mode === 2 && this.getId) {
      this.updateData(values);
    } else {
      this.materialForm.value.material = this.materialForm.value.material.slice(0,-1);
      this.saveData(values);
    }
  }

  saveData(formData: any) {
    this.masterService.addMaterial(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/master/material');
      }
    });
  }

  backToHome(){
    this.router.navigateByUrl('home/master/material');
  }

  updateData(formData: any) {
    this.masterService.editMaterial(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/material');
      }
    });
  }

  fillFormdata (data: any) {
    this.materialForm.patchValue({
      category: data && data.category,
      hsnCode: data && data.hsnCode,
      sacCode: data && data.sacCode,
      pUnitWt: data && data.pUnitWt,
      gstPercent: data && data.gstPercent,
      unit: data && data.unit
    })
    for(const mat of data.material){
      this.materialForm.get('material').push(
        new FormControl(mat)
      )
    }
  }

  addOneRow() {
    const control = new FormControl('');
    let aa = this.materialForm.get('material') as any;
    aa.push(control);
  }

  onInputChange(control: any, index: number) {
    const children = this.materialForm.get("material") as FormArray;
    if((children.length - 1) === index) {
      this.addOneRow();
    }
    if(!control.value) {
      children.removeAt(index);
    }
  }

  remove(index: number) {
    const children = this.materialForm.get("material") as FormArray;
    children.removeAt(index);
  }


}
