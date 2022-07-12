import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  faArrowLeft,
  faTruckMoving,
  faBell,
  faList,
  faFileDownload
} from '@fortawesome/free-solid-svg-icons';
import { ConstantService } from 'src/app/services/constant.service';
import { ObjToCsvService } from 'src/app/services/obj-to-csv.service';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { ThrowStmt } from '@angular/compiler';

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
  vehSpeed?:number;
  course?:number;
  distance?:number;
  dateTime?:Date;
}
interface LatLng {
  lat: number;
  lng: number;
  vehSpeed?:number;
  course?:number;
  cum_dist?:number;
  datetime?:Date;
}

interface reCenter {
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
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss'],
})
export class PlaybackComponent implements OnInit {
  faPlay = faPlay;
  faPause = faPause;
  faArrowsAltH = faArrowsAltH;
  faUndo = faUndo;
  faList = faList;
  faUndoAlt = faUndoAlt;
  faRedoAlt = faRedoAlt;
  faArrowLeft = faArrowLeft;
  faTruckMoving = faTruckMoving;
  faBell = faBell;
  faFileDownload = faFileDownload;
  showPause = false;
  innerWidth = window.innerWidth;
  marks: NzMarks = {
    10: '10',
    50: '50',
    100: '100',
  };

  vehData: any = [];
  playBackData: any = [];
  alertsData: any = [];
  markers: any = [];
  points: any = [];
  speed: number = 10;
  disabled: boolean = false;
  selectedTripData: any;
  polyLine: Polyline = {
    color: '#2196f3',
    latLng: [],
  };
  drawLine: Polyline = {
    color: '#2196f3',
    latLng: [],
  };
  map: any;
  zoom: number = 7;
  marker: Marker = {
    lat: 23.673858,
    lng: 83.815982,
    vehSpeed:0,
  };
  lat: any = 23.673858;
  lng: any = 83.815982;
  device: any;
  reCenter:reCenter={
    lat:23.673858,
    lng: 83.815982,
  }

  deltaLat: any;
  deltaLng: any;
  iteration = 0;
  idx = 0;
  numDeltas = 200; // iteration
  delay = 1000; //miliseconds
  move: any;
  isPaused = false;
  isOpen = false;
  length = 0;
  skip = 0;
  startEnd: any = [];
  showRoute = true;
  showTruck = false;
  timerRef: any;
  showAlerts = false;
  start = 'assets/start.png';
  stop = 'assets/stop.png';
  stopFlag = 'assets/stopFlag.png';
  // truckIcon = 'assets/truck.png';
  iconUrl: any;
  truckIcon: any;
  bellIcon: any;
  alertsMarkers: any;
  truck_path: string;
  @ViewChild("donwload", { static: false })
  donwloadAnchor!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private masterService: MasterService,
    private storageService: StorageService,
    private constantService: ConstantService,
    private commonService: CommonService,
    private objToCsvService: ObjToCsvService,
    private datePipe: DatePipe
  ) {
    this.route.params.subscribe((queryParam) => {
      if (queryParam) {
        const currentState = this.router.getCurrentNavigation();
        this.selectedTripData = currentState && currentState.extras.state;
      }
    });
    this.truck_path = this.constantService.constants.truck_path;
  }

  ngOnInit(): void {
    if(this.selectedTripData.tripBase == 'Sim Based') {
      this.getSimBasePlaybackData();
    } else  {
      this.getPlayBackData();
    }
    this.truckIcon= {
      path: this.truck_path,
      fillColor:"#15e425",
      fillOpacity: 0.8,
      strokeWeight: 0.5,
      scale: 0.5,
      rotation: 0,
    };
    this.bellIcon= {
      path: faBell.icon[4] as string,
      fillColor:"#0000ff",
      fillOpacity: 1,
      strokeWeight: 1,
      strokeColor: "#FFFFFF",
      scale: 0.055,
    };
  }

  listView () {
    if(this.selectedTripData?.tripBase =='Sim Based') {
      this.playBackData = this.playBackData?.points;
      this.playBackData.tripBase = 'Sim Based';
    }
    if(!this.playBackData) {
      return this.commonService.errorModal('Error','There is no data to see in listView');
    }
    this.router.navigateByUrl('home/operation/playback-list', {state: this.playBackData});
  }
  setTruckIcon(angle: any) {
    this.truckIcon = {
      path: this.truck_path,
      fillColor:"#15e425",
      fillOpacity: 0.8,
      strokeWeight: 0.5,
      scale: 0.5,
      rotation: angle
    };
  }

  back() {
    this.router.navigateByUrl(
      'home/operation/tripDetails/view/' + this.selectedTripData._id,
      { state: this.selectedTripData }
    );
  }

  downloadCsv (aData: any) {
    if(this.selectedTripData?.tripBase =='Sim Based') {
      return this.getSimBasePlaybackData(true);
    }
    let cnt = 1;
		this.objToCsvService.convertToCsv('PlaybackSheet',[
			'S.No',
			'Start Time',
			'End Time',
			'Location',
			'Latitude',
			'Longitude',
			'Nearest Landmark',
			'Speed(Kmph)',
			'Duration(Hour)',
			'Distance(Kms)'
		], aData.map( (o: any) => {
			let arr = [];
			try {
				arr.push(cnt++ || 0);
			} catch (e) {
				arr.push(0);
			}

			try {
				arr.push(this.datePipe.transform(o.start_time,'dd/MMM/yyyy hh:mm:ss') || 'NA');
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(this.datePipe.transform(o.end_time, 'dd/MMM/yyyy hh:mm:ss') || 'NA');
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(o.start_addr?.replace(/,/g,' ') || 'NA');
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(o.start?.latitude || 'NA');
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(o.start?.longitude || 'NA');
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(o?.nearest_landmark?.name && o.nearest_landmark?.dist ? o.nearest_landmark.dist/1000 + " KM from " + o.nearest_landmark.name : "NA");
			} catch (e) {
				arr.push('NA');
			}

			try {
				arr.push(o.top_speed || '0');
			} catch (e) {
				arr.push('0');
			}

			try {
				arr.push((o.duration/3600).toFixed(2) || "0");
			} catch (e) {
				arr.push("0");
			}

			try {
				arr.push((o.distance/1000).toFixed(2) || "0");;
			} catch (e) {
				arr.push('0');
			}
			return arr;
		}));
  }

  drawRoute() {
    if(this.playBackData && !Array.isArray(this.playBackData)) {
      this.marker.lat =this.playBackData?.start?.latitude;
      this.marker.lng = this.playBackData?.start?.longitude;
      for(const point of this.playBackData.points) {
        this.polyLine.latLng.push({ lat: point.lat, lng: point.lng,datetime:point.datetime});
      }
    } else  {
      if (this.playBackData && this.playBackData.length > 0) {
        this.playBackData?.forEach((data: any, idx:number) => {
          if(idx == 0) {
            this.marker.lat = data?.start?.latitude;
            this.marker.lng = data?.start?.longitude;
          }
          if (data?.imei && data.points && data.points.length) {
            data.points?.forEach((point: any) => {
              let dist=point.cum_dist/1000
              this.polyLine.latLng.push({ lat: point.lat, lng: point.lng, vehSpeed:point.speed,course: point.course,cum_dist:dist,datetime:point.datetime});
            });
          }
        });
      }
    }
  }

  drawAlerts () {
    if(this.showAlerts) {
      let req: any = {};
      req.imei = [];
      req.imei.push(Number(this.device?.imei));
      req.from = this.selectedTripData?.start_date;
      req.to = this.selectedTripData?.end_date || new Date().toISOString();
      this.masterService.getAllAlerts(req).subscribe(alerts => {
        this.alertsData = alerts;
        this.plotAlerts();
      })
    }
  }

  plotAlerts() {
    this.alertsMarkers = [];
    for(const alert of this.alertsData) {
      if(alert?.location?.lat && alert?.location?.lng)
      this.alertsMarkers.push({lat: alert.location?.lat, lng: alert?.location.lng,code: alert.code,time: alert.datetime});
    }
  }

  secondsToHms(d : any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}


  drawFlags() {
    if(this.playBackData && !Array.isArray(this.playBackData)) {
      this.markers = [];
      this.markers.push({ lat: this.playBackData?.start?.latitude, lng: this.playBackData?.start?.longitude, icon:this.start});
      this.markers.push({ lat: this.playBackData?.stop?.latitude, lng: this.playBackData?.stop?.longitude, icon:this.stop});
      for(const data of this.playBackData.points) {
        this.markers.push({ lat: data?.latitude, lng: data?.longitude, icon:this.stopFlag, duration:data?.duration, address: data?.place_name,start_time: data?.start_time, end_time: data?.leaving_time});
      }
    } else {
      if(this.playBackData && this.playBackData.length > 0) {
        this.markers = [];
        let length = this.playBackData.length;
        this.playBackData?.forEach((data: any,idx:number) => {
          if(idx === 0) {
            this.markers.push({ lat: data?.start?.latitude, lng: data?.start?.longitude, icon:this.start});
          } else if(idx === length-1) {
            this.markers.push({ lat: data?.stop?.latitude, lng: data?.stop?.longitude, icon:this.stop});
          }
          if(data.drive === false) {
            let duration = this.secondsToHms(data?.duration);
            let idle=this.secondsToHms(data?.idle_duration);
            this.markers.push({ lat: data?.stop?.latitude, lng: data?.stop?.longitude, icon:this.stopFlag, start_time: data?.start_time, end_time: data?.end_time,duration: duration, address:data?.start_addr,landmark:data?.NearLandMark , idleDuration:idle});
          }
        });
      }
    }
  }

  speedChange() {
    if (this.speed === 10) {
      this.delay = 100 * 10;
    } else if (this.speed === 20) {
      this.delay = 200 * 4;
    } else if (this.speed === 30) {
      this.delay = 300 * 2;
    } else if (this.speed === 40) {
      this.delay = 400 * 1;
    } else if (this.speed === 50) {
      this.delay = 500 / 10;
    } else if (this.speed === 60) {
      this.delay = 600 / 20;
    } else if (this.speed === 70) {
      this.delay = 700 / 40;
    } else if (this.speed === 80) {
      this.delay = 800 / 80;
    } else if (this.speed === 90) {
      this.delay = 900 / 160;
    } else if (this.speed === 100) {
      this.delay = 1000 / 640;
    }
  }

  resetRoute() {
    // this.drawLine.latLng = [];
    this.showPause = true;
    this.pauseRoute();
    this.speed = 30;
    this.idx = 0;
    this.marker.lat = this.playBackData[0]?.start?.latitude;
    this.marker.lng = this.playBackData[0]?.start?.longitude;
  }

  moveMarker(point: any) {
    this.drawLine.latLng.push({ lat:point.lat,lng:point.lng})
    this.marker.lat = point.lat;
    this.marker.lng = point.lng;
  }

  getskip() {
    this.skip = this.speed * 5;
  }

  playRoute() {
    // this.showRoute = false;
    this.showPause = true;
    if (true || !this.isPaused) {
      this.showTruck = true;
      this.drawLine.latLng = this.drawLine.latLng || [];
      // this.markers = []
      this.zoom = 12;
      this.idx = this.idx || 0;
      let len = this.polyLine.latLng.length;
      const mContext = this;
      mContext.timerRef = setInterval(() => {
        if(this.idx < len) {
          if(this.idx%10==0 || mContext.polyLine.latLng[this.idx].lat-mContext.reCenter.lat>1 || mContext.polyLine.latLng[this.idx].lng-mContext.reCenter.lng>1){
            mContext.reCenter.lat=mContext.polyLine.latLng[this.idx].lat;
            mContext.reCenter.lng=mContext.polyLine.latLng[this.idx].lng;
          }
            // mContext.drawLine.latLng.push({ lat:mContext.polyLine.latLng[i].lat,lng:mContext.polyLine.latLng[i].lng})
            mContext.marker.lat = mContext.polyLine.latLng[this.idx].lat;
            mContext.marker.lng = mContext.polyLine.latLng[this.idx].lng;
            mContext.marker.vehSpeed=mContext.polyLine.latLng[this.idx].vehSpeed;
            mContext.setTruckIcon(mContext.polyLine.latLng[this.idx].course);
            mContext.marker.distance=mContext.polyLine.latLng[this.idx].cum_dist;
            mContext.marker.dateTime=mContext.polyLine.latLng[this.idx].datetime;
            if(this.idx+5 < len){
              this.idx += 5;
            } else this.idx++;
        } else {
          mContext.pauseRoute();
        }
      },mContext.delay);
    }
    this.isPaused = false;
  }

  clrInterval() {
    clearInterval(this.move);
  }

  pauseRoute() {
    clearInterval(this.timerRef);
    this.timerRef = null;
    this.showPause = !this.showPause;
  }

  getSimBasePlaybackData(download = false) {
    let req: any = {};
    req.trip_no = this.selectedTripData?.trip_no;
    if(download) {
      req.download = true;
    }
    this.masterService.getSimBaseData(req).subscribe((res: any)=> {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
        this.donwloadAnchor.nativeElement.click();
      } else {
        this.showTruck = true;
        this.vehData = res;
        this.playBackData = res.data;
        if(this.selectedTripData.tripBase == 'Sim Based') {
          this.vehData.tot_dist = this.playBackData.tot_dist;
        } else {
          this.vehData.tot_dist = this.vehData?.tot_dist / 1000;
        }
        this.drawFlags();
        this.drawRoute();
      }
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
    req.device_id =this.selectedTripData?.device?.imei || this.device?.imei;
    req.start_time = this.selectedTripData?.start_date;
    req.end_time = this.selectedTripData?.end_date || new Date().toISOString();
    this.masterService.getplayData(req).subscribe((res: any) => {
      this.showTruck = true;
      this.vehData = res;
      this.playBackData = res.data;
      this.vehData.tot_dist = this.vehData?.tot_dist / 1000;
      this.drawFlags();
      this.drawRoute();
    });
  }
}
