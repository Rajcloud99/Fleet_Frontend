import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {faFilter, faPlusSquare, faEdit, faTrash, faSearch, faTimes, faUpload} from '@fortawesome/free-solid-svg-icons';
import {CommonService} from "../../../services/common.service";
import {FormBuilder, Validators, FormArray, FormControl, FormGroup} from "@angular/forms";
import {MasterService} from "../../master.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "../../../services/storage.service";
import {TrafficManagerComponent} from "../../duty/traffic-manager/traffic-manager.component";
import {NzModalService} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-sensor-upsert',
  templateUrl: './sensor-upsert.component.html',
  styleUrls: ['./sensor-upsert.component.scss']
})
export class SensorUpsertComponent implements OnInit {

  categoryList: any = ['Fuel', 'Temperature', 'Pressure'];
  mode: any;
  getId: any;
  faPlusSquare = faPlusSquare;
  faUpload = faUpload;
  sensorForm : any;
  selectedItem: any;
  receivedData: any;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private masterService: MasterService,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef,
  ) {
    this.sensorForm = this.fb.group({
      s_id: [null,[Validators.required]],
      company: [null,[Validators.required]],
      device: [null,[Validators.required]],
      out_unit: [null,[Validators.required]],
      conversion_fact: [null,[Validators.required]],
      ver: [null,[Validators.required]],
      fill_diff: [null,[Validators.required]],
      drain_diff: [null,[Validators.required]]
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
        this.sensorForm.get('sensor').push(
          new FormControl('')
        )
        // Add Mode
        this.mode = 1;
      }
    })

  }

  ngOnInit(): void {

  }

  fillFormdata (data: any) {
    this.sensorForm.patchValue({
      s_id:  data && data.s_id,
      device: data && data.device,
      out_unit: data && data.out_unit,
      conversion_fact: data && data.conversion_fact,
      ver: data && data.ver,
      fill_diff: data && data.fill_diff,
      drain_diff: data && data.drain_diff
    })
    // for(const mat of data.material){
    //   this.materialForm.get('material').push(
    //     new FormControl(mat)
    //   )
    // }
  }

  onSubmit(){
    if (this.sensorForm.invalid) {
      return;
    }
    const values = this.sensorForm.value;

    console.log(values);


    if (this.mode === 2 && this.getId) {
      this.updateData(values);
    } else {
      this.sensorForm.value.category = 'Fuel';
      this.saveData(values);
    }
  }

  saveData(formData: any) {
    formData.type_url = 'gps_url';
    formData.user_id = this.storageService.get('userData').client_config.gpsId;
    this.masterService.addSensor(formData).subscribe((data: any) => {
      console.log(data);
      if (data) {
        // this.commonService.companyReflect.next(true);
        this.router.navigateByUrl('home/tracking/sensor');
      }
    });
  }

  uploadDocumentModel(){}

  updateData(formData: any) {
    this.masterService.editSensor(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/tracking/sensor');
      }
    });
  }

  addCalibration(){
    const modal = this.modal.create({
      nzTitle: 'Add/Update Traffic Manager',
      nzWidth: '90%',
      nzCentered: true,
      nzZIndex: 4,
      nzContent: TrafficManagerComponent,
      nzComponentParams: {
        InputData : this.selectedItem
      },
      nzViewContainerRef: this.viewContainerRef,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000)),
      nzFooter: [
        {
          label: 'submit',
          onClick: componentInstance => {
            console.log(componentInstance);
            componentInstance?.onSubmit();
            // modal.destroy();
          }
        }
      ]
    });
  }

}
