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
  selector: 'app-landmark-upsert',
  templateUrl: './landmark-upsert.component.html',
  styleUrls: ['./landmark-upsert.component.scss']
})
export class LandmarkUpsertComponent implements OnInit {
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
  LandmarkData: any;
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
          this.LandmarkData = currentState && currentState.extras.state;
          this.Preview = true;
        }else if(this.mode =='Edit'){
          this.LandmarkData = currentState && currentState.extras.state;
          this.Preview = false;
        } else if(this.mode =='Add') {
          this.Preview = false;
        }

      }
    });
  }
  landmarkForm = this.fb.group({
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    latitude: [null, [Validators.required]],
    longitude: [null, [Validators.required]],
  });

  ngOnInit(): void {
    
    this.common.setNavTittleAndMenu("Landmark");
    this.innerWidth = window.innerWidth;
    if(this.LandmarkData){
      this.fillFormdata(this.LandmarkData);
      this.drawRoute();
    }
  }
  onSubmit(){
    if(this.landmarkForm.invalid) {
      this.common.error('all mandatory is required');
      return;
    }
    let landmarkdt ={
      name: this.landmarkForm.value.name,
      address: this.landmarkForm.value.address,
      created_at:this.LandmarkData?.created_at,
      location :{
        latitude:this.landmarkForm.value.latitude,
        longitude: this.landmarkForm.value.longitude
      }
    }
      if(this.mode == 'Add'){
        this.masterService
          .AddlandMark(landmarkdt)
          .subscribe((data: any) => {
            if (data) {
              this.router.navigateByUrl('home/tracking/landmark');
            }
          });

    }else if(this.mode == 'Edit'){
      this.masterService
        .EditlandMark(this.LandmarkData?._id,landmarkdt)
        .subscribe((data: any) => {
          if (data) {
            this.router.navigateByUrl('home/tracking/landmark');
          }
        });

    }



  }

  markerDragEnd($event: any) {
    console.log($event);
    let latitude = $event.coords.lat;
    let longitude = $event.coords.lng;
    this.landmarkForm.patchValue({latitude:latitude,longitude:longitude});
    // this.getReverseGeocodingData(latitude,longitude);
  }
  // getReverseGeocodingData( lat:number,lng:number){
  //     let latlng = new google.maps.LatLng(lat, lng);
  //     // This is making the Geocode request
  //     var geocoder = new google.maps.Geocoder();
  //     geocoder.geocode({ location:latlng },  (results, status) =>{
  //       if (status !== google.maps.GeocoderStatus.OK) {
  //         alert(status);
  //       }
  //       // This is checking to see if the Geoeode Status is OK before proceeding
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         console.log(results);
  //         var address = (results[0].formatted_address);
  //         this.landmarkForm.patchValue({address:address,latitude:lat,longitude:lng});
  //       }
  //     });
  //
  //
  // }
  searchLocation(){
    if(this.address){
      let data = this.address.nativeElement;
      this.landmarkForm.patchValue({
        address: data?.value,
        latitude: data?.location?.lat(),
        longitude: data?.location?.lng(),
      });
      this.markers= [];
      this.markers.push({
        lat: this.landmarkForm.value.latitude,
        lng: this.landmarkForm.value.longitude,
      });
      this.setviewpostion(this.markers[0]);

    }
  }
  search(){
    if(!(this.address && this.address.nativeElement && this.address.nativeElement.location)){
      this.common.error('Please search location');
    }
    if(this.oFilter.radius){
      this.common.error('radius is Mandatory');
    }
  }
  fillFormdata(data:any) {
    this.landmarkForm.patchValue({
      name: data?.name,
      address: data?.address,
      latitude: data?.location?.latitude,
      longitude: data?.location?.longitude,
    });
  }

  drawRoute() {
    this.markers = [];
    if (this.landmarkForm.value && this.landmarkForm.value.latitude  && this.landmarkForm.value.longitude) {
      this.markers.push({
        lat: this.landmarkForm.value.latitude,
        lng: this.landmarkForm.value.longitude,
      });
      this.setviewpostion(this.markers[0]);

    }
  }
  setviewpostion(marker: any){
    this.marker.lat = marker?.lat;
    this.marker.lng = marker?.lng;
    this.zoom=16;
  }
}
