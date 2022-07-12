import { Component, OnInit, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../master.service';
import { CommonService } from '../../../services/common.service';
@Component({
  selector: 'app-vehicle-detail-view',
  templateUrl: './vehicle-detail-view.component.html',
  styleUrls: ['./vehicle-detail-view.component.scss']
})
export class VehicleDetailViewComponent implements OnInit {
  innerWidth:any;
  getId: any;
  receivedData: any;
  selectedRowId: any;
  faEdit = faEdit; // font awesome icons
  faTrash = faTrash; // font awesome icons
  // orderKeys = ['vehicle No', 'Device IMEI', 'Ownership Type', 'Vender', 'Vehicle Type', 'Segment'];
  // showCardKeys = ['vehicle_reg_no', 'device_imei', 'ownershipType', 'vendor_name', 'veh_type_name', 'segment_type'];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private masterService: MasterService,
              private commonServ: CommonService) {
    this.route.params.subscribe(queryParam => {
      if (queryParam._id) {
        this.getId = queryParam._id;
        this.getIdData();
      }
    });
    // show roles of user
    // this.commonServ.userRoleObj.subscribe(accessObj => {
    //   if (accessObj) {
    //     const findObj = accessObj.find(singleObj => singleObj.path === 'company');
    //     if (findObj) {
    //       const getIsSelected = findObj.children.filter(obj => obj.isSelected);
    //       if (getIsSelected) {
    //         for (const d of getIsSelected) {
    //           if ((d && d.label) && (d && d.isSelected)) {
    //             this.prepareObj[d.label] = d.isSelected;
    //           }
    //         }
    //       }
    //     }
    //   }
    // });
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  // get the data through id
  getIdData(): void {
    this.masterService.getAllVehicle({_id: this.getId}).subscribe((data: any ) => {
      if (data) {
        this.receivedData = data;
      }
    })
  }
  selectItem(item: any) {
    this.selectedRowId = item._id;
  }

  // go to the upsert page
  goToUpsert() {
    this.router.navigateByUrl('home/master/vehicle/upsert/' + this.getId);
  }

  // delete api
  delete() {
    this.masterService.deletevehicle(this.getId).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/vehicle');
      }
    });
  }


}

