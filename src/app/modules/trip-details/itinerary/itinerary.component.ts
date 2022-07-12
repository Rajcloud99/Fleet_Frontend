import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MasterService } from '../../master.service';
import { NzMarks } from 'ng-zorro-antd/slider';
import {
  faPlay,
  faPause,
  faArrowsAltH,
  faUndo,
  faUndoAlt,
  faRedoAlt,
} from '@fortawesome/free-solid-svg-icons';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface Marker {
  lat: number;
  lng: number;
  icon?: string;
  label?: string;
  eta?: string;
  address?: string;
  draggable?: boolean;
  etaUnit?: string;
  dist?: number | string;
  distUnit?: string;
}
interface LatLng {
  lat: number;
  lng: number;
}

interface Polyline {
  color: string;
  latLng: LatLng[];
}

interface drawLine {
  color: string;
  latLng: LatLng[];
}

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  faPlay = faPlay;
  faPause = faPause;
  faArrowsAltH = faArrowsAltH;
  faUndo = faUndo;
  faUndoAlt = faUndoAlt;
  faRedoAlt = faRedoAlt;
  showPlay = false;
  innerWidth: any;
  showPause = true;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  marks: NzMarks = {
    0: '0' + '(-)',
    30: '30',
    50: '50',
    100: '100' + '(+)',
  };
  filteredMarker :any;
  counter:number=0;
  vehData: any = [];
  playBackData: any = [];
  markers: any = [];
  points: any = [];
  speed: number = 30;
  disabled: boolean = false;
  selectedTripData: any;
  polyLine: Polyline = {
    color: '#1f08f1',
    latLng: [],
  };
  drawLine: Polyline = {
    color: '#1f08f1',
    latLng: [],
  };
  map: any;
  zoom: number = 6;
  marker: Marker = {
    lat: 23.673858,
    lng: 83.815982,
  };
  lat: any = 23.673858;
  lng: any = 83.815982;
  device: any;

  deltaLat: any;
  deltaLng: any;
  delay = 1000; //miliseconds
  move: any;
  playData:any=[];
  isPaused = false;
  length = 0;
  startEnd: any = [];
  start = 'assets/start.png';
  stop = 'assets/stop.png';
  stopFlag = 'assets/stopFlag.png';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService,
    private storageService: StorageService
  ) {
    this.route.params.subscribe((queryParam) => {
      if (queryParam) {
        const currentState = this.router.getCurrentNavigation();
        this.selectedTripData = currentState && currentState.extras.state;
      }
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.selectedTripData.tripBase == 'Sim Based') {
      this.getSimBasePlaybackData();
    } else  {
      this.getPlayBackData();
    }
  }

  closeAllMarkers() {
    for(const marker of this.markers) {
      marker.isOpen = false;
    }
  }
  secondsToHms(d : any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hr, " : " hrs, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " min, " : " mins, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  drawRoute() {
    this.drawLine.latLng = [];
    this.markers = [];
    if(this.playBackData && !Array.isArray(this.playBackData)) {
      let s = this.playBackData.start;
      let e = this.playBackData.stop;
      this.marker.lat = s.latitude;
      this.marker.lng = s.longitude;
      this.startEnd.push({
        lat: s.latitude,
        lng: s.longitude,
        flag: this.start,
        counter : 0,
        isOpen: false,
        start_time: this.playBackData.start_time,
      });
      this.startEnd.push({
        lat: e.latitude,
        lng: e.longitude,
        flag: this.stop,
        stop_addr : this.playBackData.stop_addr,
        counter : this.playBackData.points.length+1,
        isOpen: false,
      });
      for(const point of this.playBackData.points) {
          this.markers.push({
            lat: point.lat,
            lng: point.lng,
            stop_addr:point.place_name,
            counter: point.counter,
            isOpen: false,
            duration: point.duration,
            start_time: point.start_time,
            end_time: point.leaving_time
          });
          this.drawLine.latLng.push({ lat: point.lat, lng: point.lng });
      }
    } else {
      this.playBackData = this.playData.data;
      if (this.playBackData && this.playBackData.length > 0) {
        let l = this.playBackData.length - 1;
        let s = this.playBackData[0].start;
        let e = this.playBackData[l].stop;
        this.marker.lat = s.latitude;
        this.marker.lng = s.longitude;
        this.startEnd.push({
          lat: s.latitude,
          lng: s.longitude,
          flag: this.start,
          stop_addr : this.playBackData[0].stop_addr,
          counter : this.playBackData[0].counter,
          status : this.playBackData[0].status,
          isOpen: false,
          duration:this.playBackData[0].duration,
          start_time: this.playBackData[0].start_time,
          end_time: this.playBackData[0].end_time,
        });
        this.startEnd.push({
          lat: e.latitude,
          lng: e.longitude,
          flag: this.stop,
          stop_addr : this.playBackData[l].stop_addr,
          counter : this.playBackData[l].counter,
          status : this.playBackData[l].status,
          isOpen: false,
          duration:this.playBackData[l].duration,
          start_time: this.playBackData[l].start_time,
          end_time: this.playBackData[l].end_time,
        });
        this.playBackData?.forEach((item: any) => {
          if (item?.imei && item.points && item.points.length) {
            if(item.status == "stopped"){
            this.markers.push({
              lat: item.stop.latitude,
              lng: item.stop.longitude,
              start_addr : item.start_addr,
              stop_addr : item.stop_addr,
              counter : item.counter,
              status : item.status,
              isOpen: false,
              duration:item.duration,
              start_time: item.start_time,
              end_time: item.end_time,
  
            });
            }
            item.points.forEach((item: any) => {
              this.drawLine.latLng.push({ lat: item.lat, lng: item.lng });
            });
          }
        });
        this.length = this.drawLine.latLng.length;
      }
    }
  }
setviewpostion(marker: any){
    this.marker.lat = marker?.stop?.latitude || marker.latitude;
    this.marker.lng = marker?.stop?.longitude || marker.longitude;
    this.zoom=12;
    this.closeAllMarkers();
    this.filteredMarker = this.markers.find((item: any)=>{return item.lat == this.marker.lat && item.lng == this.marker.lng});
    this.filteredMarker.isOpen = true;
}

  getSimBasePlaybackData() {
    let req: any = {};
    req.trip_no = this.selectedTripData?.trip_no;
    this.masterService.getSimBaseData(req).subscribe((res: any)=> {
        // this.showTruck = true;
        this.vehData = res;
        this.playBackData = res.data;
        for(const data of this.playBackData.points) {
            this.counter += 1;
            data.counter = this.counter;
        }
        if(this.selectedTripData.tripBase == 'Sim Based') {
          this.vehData.tot_dist = this.playBackData.tot_dist;
        } else {
          this.vehData.tot_dist = this.vehData?.tot_dist / 1000;
        }
        // this.drawFlags();
        this.drawRoute();
      
    });
  }

  getPlayBackData() {
    this.vehData.tot_dist = '';
    this.device = this.storageService
      .get('alldevices')
      .find(
        (item: any) => item.imei == this.selectedTripData?.vehicle?.device_imei
      );
    let req: any = {};
    req.device_id = this.selectedTripData?.device?.imei || this.device?.imei;
    req.start_time = this.selectedTripData?.start_date;
    req.end_time = this.selectedTripData?.end_date || new Date().toISOString();
    this.masterService.getplayData(req).subscribe((res: any) => {
      //console.info(res);
      this.vehData = res;
      this.playBackData = res.data;
      let data = res.data;
      for (let i = 0; i < data.length; i++) {
        if (data[i].duration) {
          data[i].duration = this.secondsToHms(data[i].duration);
        }
        if (data[i].distance) {
          data[i].distance = data[i].distance / 1000;
          data[i].distance = data[i].distance.toFixed(2);
        }
        if(data[i].status =='stopped'){
          this.counter =  this.counter+1;
          data[i].counter= this.counter;
        }

      }
      this.playData.data = data;
      this.vehData.tot_dist = this.vehData?.tot_dist / 1000;
      this.drawRoute();
    });
  }
}
