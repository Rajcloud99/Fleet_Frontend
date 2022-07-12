
import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { MasterService } from '../../master.service';
import { NzMarks } from 'ng-zorro-antd/slider';
import {
  faPause,
} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, Validators} from "@angular/forms";
import {CommonService} from "../../../services/common.service";
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
@Component({
  selector: 'app-geofence-upsert',
  templateUrl: './geofence-upsert.component.html',
  styleUrls: ['./geofence-upsert.component.scss']
})
export class GeofenceUpsertComponent implements OnInit {
  faPause = faPause;
  innerWidth: any;
  mode:any;
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
  oFilter :any ={};
  markers: any = [];
  disabled: boolean = false;
  geoZoneListRoot: any;
  @ViewChild("address", { static: false })
  address!: ElementRef;
  map: any;
  zoom: number = 6;
  marker: Marker = {
    lat: 23.673858,
    lng: 83.815982,
  };
  lat: any = 23.673858;
  lng: any = 83.815982;
  device: any;
  Preview:boolean =false;
  // for geozone

  CircleGeoZone:any =[];
  RectangleGeoZone:any =[];
  PolygonGeoZone:any =[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private common :CommonService,
    private masterService: MasterService,
    private storageService: StorageService,
    private fb: FormBuilder,
  ) {
    this.route.params.subscribe((queryParam) => {
      this.mode  = queryParam.mode;
      if (this.mode) {
        const currentState = this.router.getCurrentNavigation();
        if(this.mode =='Preview'){
          this.geoZoneListRoot = currentState && currentState.extras.state;
          if(!this.geoZoneListRoot.length){
            this.geoZoneListRoot= [];
            this.geoZoneListRoot.push(currentState && currentState.extras.state);
          }
          this.Preview = true;
        }else if(this.mode =='Add'){
          this.geoZoneListRoot = currentState && currentState.extras.state;
          this.Preview = false;
        }

      }
    });
  }
  GeozoneForm = this.fb.group({
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
  });

  ngOnInit(): void {

    this.common.setNavTittleAndMenu("Geofence");
    this.innerWidth = window.innerWidth;
    if(this.geoZoneListRoot){
      this.fillFormdata(this.geoZoneListRoot);
    }
  }
  searchLocation(){
    if(this.address){
      let data = this.address.nativeElement;
      this.GeozoneForm.patchValue({
        latitude: data?.location?.lat(),
        longitude: data?.location?.lng(),
      });
      this.markers= [];
      this.markers.push({
        lat: this.GeozoneForm.value.latitude,
        lng: this.GeozoneForm.value.longitude,
      });
      this.setviewpostion(this.markers[0]);


    }
  }
  search(){
    if(this.GeozoneForm.value?.latitude && this.GeozoneForm.value?.longitude) {
      this.markers = [];
      this.markers.push({
        lat: this.GeozoneForm.value.latitude,
        lng: this.GeozoneForm.value.longitude,
      });
      this.setviewpostion(this.markers[0]);
    }
  }
  setviewpostion(marker: any){
    this.marker.lat = marker?.lat;
    this.marker.lng = marker?.lng;
    this.zoom=15;
  }
  popupinfo(x:any,y:any){

  }
  fillFormdata(geoZoneListRoot:any) {
    if(geoZoneListRoot && geoZoneListRoot.length>0){
      for (let x=0; x<geoZoneListRoot.length;x++){
        this.setLayerData(geoZoneListRoot[x]);
      }
      this.marker.lat = geoZoneListRoot[0].geozone[0].latitude;
      this.marker.lng = geoZoneListRoot[0].geozone[0].longitude;
      this.zoom = 7;
    }
  }
  setLayerData(mapData:any) {
    let layerType = mapData.ptype;
    if (layerType === 'circle') {
    this.CircleGeoZone.push(mapData);

    } else if (layerType === 'rectangle') {

      this.RectangleGeoZone.push(mapData);

    } else if (layerType === 'polygon') {
       mapData.geozone = this.getLatLongInArray(mapData.geozone);
      this.PolygonGeoZone.push(mapData);
    }
  }

  getLatLongInArray(aLatLng:any) {
    var aData = [];
    if(aLatLng && aLatLng.length>0){
      for (var i=0; i<aLatLng.length; i++){
        aData.push({lat : aLatLng[i].latitude,lng :aLatLng[i].longitude})
      }
    }
    return aData;
  }
//  GET DATA FOR RECTANGLE DRAW
  max(coordType: 'latitude' | 'longitude',geozone:any) {
    return Math.max(...geozone.map((marker: { [x: string]: any; }) => marker[coordType]));
  }
  min(coordType: 'latitude' | 'longitude',geozone:any) {
    return Math.min(...geozone.map((marker: { [x: string]: any; }) => marker[coordType]));
  }


}
