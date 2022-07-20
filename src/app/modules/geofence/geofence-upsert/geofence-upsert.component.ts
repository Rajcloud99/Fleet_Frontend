
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
  visible:boolean = false;
  Newgeofencedata:any = [];
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
 name:any;
  description :any;
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
    this.zoom=18;
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
      this.zoom = geoZoneListRoot[0].zoom_level || 15;
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
//  for drowing shape
  onMapReady(map: any) {
    if(this.mode =='Add') {
      this.initDrawingManager(map);
    }
  }
  initDrawingManager(map: any) {
    const mContext = this;
    const options: any = {
      drawingControl: true,
      drawingControlOptions: {
        drawingModes: ["polygon", "circle", "rectangle"]
      },
      polygonOptions: {

      },
      drawingMode: [
        google.maps.drawing.OverlayType.POLYGON,
        google.maps.drawing.OverlayType.CIRCLE,
        google.maps.drawing.OverlayType.RECTANGLE],
    };

    const drawingManager = new google.maps.drawing.DrawingManager(options);
    drawingManager.setMap(map);
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
      if (event.type == 'circle') {
        let GEODATA : any ={
          ptype : event.type,
          radius :event.overlay.getRadius(),
          zoom_level:event.overlay.map.zoom,
          geozone:[{
            "latitude": event.overlay.center.lat(), "longitude":  event.overlay.center.lng()},
          ]
        };
        mContext.openoppup(GEODATA);
      }
      if (event.type == 'rectangle') {
        var bounds = event.overlay.getBounds();
        var NE = bounds.getNorthEast();
        var SW = bounds.getSouthWest();
        var NW = new google.maps.LatLng(NE.lat(),SW.lng());
        var SE = new google.maps.LatLng(SW.lat(),NE.lng());
        let GEODATA={
          ptype : event.type,
          zoom_level:event.overlay.map.zoom,
          geozone:[{"latitude": NE.lat(), "longitude": NE.lng()},
            {"latitude": SW.lat(), "longitude": SW.lng()},
            {"latitude": NW.lat(), "longitude": NW.lng()},
            {"latitude": SE.lat(), "longitude": SE.lng()}
          ]
        };
        mContext.openoppup(GEODATA);
      }
      if (event.type == 'polygon') {
        const zone = [];
        const vertices = event.overlay.getPath();
        for (let i = 0; i < vertices.getLength(); i++) {
          const xy = vertices.getAt(i);
          zone.push({latitude: xy.lat(), longitude:xy.lng()});
      }
        let GEODATA={
          zoom_level:event.overlay.map.zoom,
          ptype : event.type,
          geozone:zone,
        };
        mContext.openoppup(GEODATA);
      }
      drawingManager.setDrawingMode(null);
    });
  }
  openoppup(data:any){
    this.name = undefined;
    this.description = undefined;
    this.Newgeofencedata={};
    this.Newgeofencedata = data;
    if(this.Newgeofencedata){
      this.visible = true;
    }

  }
    AddGeozone(geodata:any){
      this.masterService
        .AddGeofence(geodata).subscribe((data: any) => {
          if (data) {
            this.visible = false;
          }
        });
    }
  handleCancel(){
    this.name = undefined;
    this.description = undefined;
    this.visible = false;
  }
  handleSubmit(){
    if(!this.name){
      return this.common.error("Geofence Name is Mandatory");
    }
    this.Newgeofencedata.name = this.name;
    this.Newgeofencedata.description = this.description;
    this.AddGeozone(this.Newgeofencedata);
  }
}
