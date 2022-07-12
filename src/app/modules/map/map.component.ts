import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MasterService } from '../master.service';
import {NavigationStart, Router} from '@angular/router';
import { Socket } from 'ngx-socket-io';
import { StorageService } from 'src/app/services/storage.service';
import { Subscription } from 'rxjs';
import { ConstantService } from 'src/app/services/constant.service';
interface Marker {
  lat: number;
  lng: number;
  icon?: string;
  label?: string;
  eta?: string;
  address?: string;
  draggable?: boolean;
  etaUnit?: string;
  dist?: number|string;
  distUnit?: string;
}

interface LatLng {
  lat: number;
  lng: number;
}

interface Polyline {
  color: string;
  latLng: LatLng[]
}

export let browserRefresh = false;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnChanges ,OnInit, OnDestroy {

  @Input() mapData: any;// to get data from any other parent component
  zoom: number = 5;
  isOpen = false;
  markers: any  = [];
  visible = false;
  receivedData: any;
  vehData: any;
  roles: any;
  subscription: Subscription;
  innerWidth = window.innerWidth;
  oldVehData: any = [];
  truck_path: any;
  truckIcon: any;
  marker: Marker = {
    lat: 23.673858,
    lng: 83.815982,
  };
  setColor = {"running": "#15e425", "online": "#15e425", "stopped": "red", "offline": "grey"};
  filteredMarker: any;
  ngOnChanges(changes: SimpleChanges) {
    if(changes.mapData.currentValue) {
      this.marker.lat = changes.mapData.currentValue.vehicle.lat;
      this.marker.lng = changes.mapData.currentValue.vehicle.lng;
      this.zoom = 30;
      this.closeAllMarkers();
  
      // console.log(changes.mapData);
      this.filteredMarker = this.markers.find((item: any)=>{return item.lat == this.marker.lat && item.lng == this.marker.lng});
      this.filteredMarker.isOpen = true;
    }
  }
  constructor(
    private masterService: MasterService,
    private storageService: StorageService,
    private router: Router,
    private socket: Socket,
    private constantService: ConstantService
  ) {
    const currentState = this.router.getCurrentNavigation(); 
    this.vehData = currentState && currentState?.extras?.state;
    this.truck_path = this.constantService.constants.truck_path;
    if(!this.vehData) {
      this.getVehiclewiseData();
    } else if(Array.isArray(this.vehData)) {
      this.oldVehData = this.vehData;
      this.vehData = [];
      if(this.oldVehData) {
        for (const [keys, value] of Object.entries(this.oldVehData)) {
          this.vehData.push(value);
        }
      }
      if(this.vehData.length > 0) {
        this.vehData.slice(-1);
      }
      this.setMarkers();
    }
    this.subscription = router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        browserRefresh = !router.navigated;
      }
  });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.roles = this.storageService.get('userData').access;
  }

  closeAllMarkers() {
    for(const marker of this.markers) {
      marker.isOpen = false;
    }
  }

  setMarkers() {
    this.vehData?.forEach((item: any)=>{
      if(item?.vehicle?.device_imei && item.vehicle?.gpsData?.lat && item.vehicle?.gpsData?.lng) {
        if(item?.vehicle?.gpsData?.status === 'stopped'){
          let color = this.setColor['stopped'];
          this.setTruckIcon(item?.vehicle?.gpsData?.course,color);
        } else if(item?.vehicle?.gpsData?.status == 'running') {
          let color = this.setColor['running'];
          this.setTruckIcon(item?.vehicle?.gpsData?.course,color);
        } else if(item?.vehicle?.gpsData?.status == 'offline') {
          let color = this.setColor['offline'];
          this.setTruckIcon(item?.vehicle?.gpsData?.course,color);
        }
      }
      this.markers.push({lat:item.vehicle?.gpsData?.lat,lng:item.vehicle?.gpsData?.lng,icon:this.truckIcon,isOpen: false});
    });
  }

    setTruckIcon(angle: any,color: any) {
      this.truckIcon = {
        path: this.truck_path,
        fillColor: color || "#15e425",
        fillOpacity: 0.8,
        strokeWeight: 0.5,
        scale: 0.5,
        rotation: angle || 90
      };
    }
    
   getVehiclewiseData() {
     this.masterService.vehicleWise({}).subscribe((res: any)=>{
      if(res) {
        this.receivedData = res;
        this.vehData = this.receivedData?.data;
        // this.vehData.forEach((item: any)=>{
        //   if(item?.vehicle?.device_imei && item.vehicle?.gpsData?.lat && item.vehicle?.gpsData?.lng)
        //   this.markers.push({lat:item.vehicle?.gpsData?.lat,lng:item.vehicle?.gpsData?.lng});
        // });
        this.setMarkers();
      }
     });
   }

   gotoLiveTrack(selectedVehicle: any) {
     this.router.navigateByUrl('home/tracking/mapView/liveTrack/'+selectedVehicle._id,{state: selectedVehicle});
   }  

   socketResponse() {
    this.socket.on('connect',function(args: any) {
      console.log("successful connection",args);
    });
    this.socket.on("connect_error",function(args: any){
      console.log("connect_error",args);
    });
    this.socket.on("connect_timeout",function(args: any){
      console.log("connect_timeout",args);
    });
   }

   onClose() {
     this.visible = false;
   }
}
