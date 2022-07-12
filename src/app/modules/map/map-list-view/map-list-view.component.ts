import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter, faMap} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';
import { MasterService } from '../../master.service';
@Component({
  selector: 'app-map-list-view',
  templateUrl: './map-list-view.component.html',
  styleUrls: ['./map-list-view.component.scss']
})
export class MapListViewComponent implements OnInit {

  isMobFilterVisible = false;
  runningCount = 0;
  stoppedCount = 0;
  offlineCount = 0;
  faFilter = faFilter;
  faMap = faMap;
  oFilter: any = {};
  receivedData: any = [];
  vehData: any = [];
  vehDataCopy: any = [];
  innerWidth = window.innerWidth;
  roles: any;
  selectedVehicle: any;
  constructor( private masterService: MasterService,
    private router: Router,
    private commonService: CommonService,
    private storageService: StorageService) { }

  ngOnInit(): void {
    
    let _moreMenu:MoreMenu[]=[
      {
        tittle:"fiter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.isMobFilterVisible = !this.isMobFilterVisible
        }
      },
      {
        tittle:"Map",
        iconName:"fa-map",
        isVisible:true,
        clickEventMethode:()=>{
          this.gotoMapView();
        }
      }
    ]; 

    this.commonService.setNavTittleAndMenu("Map View",_moreMenu);
    this.getVehiclewiseData();
    this.roles = this.storageService.get('userData').access;
  }

  showInMap(data: any) {
    if(data.vehicle?.gpsData?.lat && data.vehicle?.gpsData?.lng) {
      this.oFilter.vehicle_no = data.vehicle?.vehicle_reg_no;
      this.applyFilters();
      this.selectedVehicle = {};
      this.selectedVehicle.vehicle = {};
      this.selectedVehicle.vehicle.lat = data.vehicle.gpsData.lat;
      this.selectedVehicle.vehicle.lng = data.vehicle.gpsData.lng;
    }
  }
  setStatus() {
    this.vehData.count = {};
    this.vehData.count.running = 0;
    this.vehData.count.offline = 0;
    this.vehData.count.stopped = 0;
   for(let veh of this.vehData) {
     let positionTime = new Date(veh.vehicle?.gpsData?.positioning_time).getMilliseconds();
     let locationTime = new Date(veh.vehicle?.gpsData?.location_time).getMilliseconds();
     let stoppageTime = 10;
     let ptDiffMin = Math.ceil((new Date().getMilliseconds() - positionTime) / 60000); // in Min
     let ltDiffMin = Math.ceil((new Date().getMilliseconds() - locationTime) / 60000); // in Min
     if (ptDiffMin < 300) {//5 hr no offline
       if (ltDiffMin <= stoppageTime && veh.vehicle?.gpsData?.speed > 0) {
         veh.vehicle.gpsData.status = "running";
         this.vehData.count.running++;
         this.runningCount++;
       } else {
         veh.vehicle.gpsData.status = "stopped";
         this.vehData.count.stopped++;
         this.stoppedCount++;
       }
     } else {
       veh.vehicle.gpsData = veh.vehicle.gpsData || {};
       veh.vehicle.gpsData.status = "offline";
       this.vehData.count.offline++;
       this.offlineCount++;
     }
   }
  }

  getVehiclewiseData() {
    this.masterService.vehicleWise({}).subscribe((res: any)=>{
     if(res) {
       this.receivedData = res;
       this.vehData = this.receivedData?.data;
       this.setStatus();
       this.vehDataCopy = JSON.parse(JSON.stringify(this.vehData));
       this.applyFilters();
      //  this.setStatus();
      //  this.vehData.forEach((item: any)=>{
      //    if(item?.vehicle?.device_imei && item.vehicle?.gpsData?.lat && item.vehicle?.gpsData?.lng)
      //    this.markers.push({lat:item.vehicle?.gpsData?.lat,lng:item.vehicle?.gpsData?.lng});
      //  });
     }
    });
  }

  applyFilters() {
    this.vehDataCopy = this.vehData;
    for(const [key,value] of Object.entries(this.oFilter)) {
      let exp = String(value);
      if(key === 'vehicle_no' && value) {
        this.vehDataCopy = this.vehDataCopy.filter((veh: any) => {return veh?.vehicle?.vehicle_reg_no?.toLowerCase().includes(exp.toLowerCase())});
      } else if(key === 'gps_status' && value) {
        this.vehDataCopy = this.vehDataCopy.filter((veh: any)=>{return veh?.vehicle?.gpsData?.status === exp});
      } else if( key === 'customer' && value) {
        this.vehDataCopy = this.vehDataCopy.filter((veh: any) => {return veh?.vehicle?.gr?.customer?.name?.toLowerCase().includes(exp.toLowerCase())});
      }
    }
  }

  gotoLiveTrack(selectedVehicle: any) {
    if(!selectedVehicle?.device_imei){
      return this.commonService.errorModal('Error','Device imei are not found');
    }
    this.router.navigateByUrl('home/tracking/mapView/liveTrack/'+selectedVehicle._id,{state: selectedVehicle});
  }

  gotoMapView() {
    this.router.navigateByUrl('home/tracking/mapView',{state: this.vehDataCopy});
  }
}

