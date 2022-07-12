import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ConstantService } from 'src/app/services/constant.service';
import { StorageService } from 'src/app/services/storage.service';
import { WebsocketService } from 'src/app/services/websocket.service';

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
  rotation?: number;
}

interface Polyline {
  color: string;
  latLng: LatLng[]
}

interface drawLine {
  color: string;
  latLng: LatLng[]
}

@Component({
  selector: 'app-live-track',
  templateUrl: './live-track.component.html',
  styleUrls: ['./live-track.component.scss']
})
export class LiveTrackComponent implements OnInit {
  vehData: any = [];
  polyLine: Polyline = {
    color: '#2196f3',
    latLng: [],
  };
  drawLine: Polyline = {
    color: '#2196f3',
    latLng: []
  };
  map: any;
  isOpen = false;
  zoom: number = 15;
  innerWidth = window.innerWidth;
  marker: Marker = {
    lat: 23.673858,
    lng: 83.815982,
  };
  lat: any;
  lng: any;
  device: any;
  address: any;
  positionTime: any;
  setColor = {"running": "#15e425", "online": "#15e425", "stopped": "red", "offline": "grey"};
  

  deltaLat: any;
  deltaLng: any;
  iteration = 0;
  numDeltas = 200; // iteration
  delay = 300; //miliseconds
  truck_path: string;
  truckIcon: any;
  speed: any;
  datetime: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ws: WebsocketService,
    private storageService: StorageService,
    private constantService: ConstantService,
    private commonService: CommonService
  ) { 
    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        const currentState = this.router.getCurrentNavigation();
        this.vehData = currentState && currentState.extras.state;
      }
    });
    this.truck_path = this.constantService.constants.truck_path;
  }

  ngOnInit(): void {
    this.getLiveData();
    this.truckIcon = {
      path: this.truck_path,
      fillColor: "#15e425",
      fillOpacity: 0.8,
      strokeWeight: 0.5,
      scale: 0.5,
      rotation: 90
    };
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

  setCenter(lat: number, lng: number){
    this.map && this.map.setCenter({ lat, lng});
  }

  mapReady(map: any){
    this.map = map;
    this.setCenter(this.marker.lat, this.marker.lng);
  }

  moveMarker(){
    if(!this.polyLine || !this.drawLine) return;
    for(let i=0;i<this.numDeltas;i++){
      const mContext = this;
      setTimeout(() => {
        let newLat = this.polyLine.latLng[this.polyLine.latLng.length - 2].lat += this.deltaLat;
        let newLng = this.polyLine.latLng[this.polyLine.latLng.length - 2].lng += this.deltaLng;
        if(i%2 === 0)
        mContext.drawLine.latLng.push({lat: newLat, lng: newLng}); 
        mContext.marker.lat = newLat;
        mContext.marker.lng = newLng;
      }, mContext.delay);
    }
  }

  getLiveData() {
    this.device = this.storageService.get('alldevices').find((item: any) => item.imei == this.vehData.device_imei);    
    let req : any = {};
    req.device_id = this.device.imei;
    req.device_type = this.device.device_type;
    req.user_id = this.storageService.get('userData').client_config.gpsId;;
    req.request = 'live_feedV2';
    this.ws.sendMessage(req);
    this.ws.getMessage().subscribe((res: any) => {
      if(res.request != 'live_feedV2') return;
      console.info(res);
      this.address = res.data?.address || res.data?.addr;
      this.speed = res.data?.speed;
      this.datetime = res.data?.datetime;
      this.positionTime = res.data?.positioning_time;
      if(res?.data?.status == 'stopped') {
        let color = this.setColor['stopped'];
        this.setTruckIcon(res?.data?.course,color);
      } else if(res?.data?.status == 'running') {
        let color = this.setColor['running'];
        this.setTruckIcon(res?.data?.course,color);
      } else if(res?.data?.status == 'offline') {
        let color = this.setColor['offline'];
        this.setTruckIcon(res?.data?.course,color);
      }
      this.pushCurrentLoc({lat:res.data.lat,lng:res.data.lng,address:res.data?.address,eta:res.data?.positioning_time});
    });
  }

  transition() {
    this.iteration = 0;
    let len = this.polyLine.latLng.length;
    this.deltaLat = (this.polyLine.latLng[len-1].lat - this.polyLine.latLng[len-2].lat)/this.numDeltas;
    this.deltaLng = (this.polyLine.latLng[len-1].lng - this.polyLine.latLng[len-2].lng)/this.numDeltas;
    this.moveMarker();
  }
  pushCurrentLoc({lat, lng}: any){
    if(lat && lng) {
      this.polyLine.latLng.push({lat, lng});
      this.lat = lat;
      this.lng = lng;
    }
    if(this.polyLine.latLng.length > 1)
      this.transition();
    else {
      this.marker.lat = lat;
      this.marker.lng = lng;
    }
  }
}
