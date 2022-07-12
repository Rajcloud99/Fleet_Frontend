import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NgForm,FormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { MasterService } from '../../master.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import {GsaddressService} from 'src/app/services/gsaddress.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-transport-route-upsert',
  templateUrl: './transport-route-upsert.component.html',
  styleUrls: ['./transport-route-upsert.component.scss']
})
export class TransportRouteUpsertComponent implements OnInit {
  submitted = false;
  getId:any;
  mode: any;
  receivedData: any;
  configs:any;
  rKm:any;
  sourceG:any;
  destinationG:any;
  sourceM:any;
  destinationM:any;
  source:any;
  destination:any;
  sCity:any;
  dCity:any;
  rName:any;
  isInvalid=false;
  islndmrk=false;
  tatHr:number=0;
  tatMin:number=0;
  receivedLocationS:any;
  receivedLocationD:any;
  formData:{[index: string]: any } = { };

  @ViewChild("ld", { static: false })
  ld!: ElementRef;
  @ViewChild("ud", { static: false })
  ud!: ElementRef;

  @ViewChild('TrUpsertForm',{ static: false }) TrUpsertForm!: NgForm;

  constructor(private router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private gsaddressservice: GsaddressService,
    private masterService: MasterService,
    private storageServ: StorageService,
    private commonService: CommonService) { 
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
          // Add Mode
          this.mode = 1;
        }
      })
    }


    fillFormdata (data: any) {
      this.configs = this.storageServ.get('userData').configs;
      if(this.configs.booking && this.configs.booking.showGoogleRoute){
        this.sourceG=data?.source?.placeName+','+data?.source?.placeAddress;
        this.destinationG=data?.destination?.placeName+','+data?.destination?.placeAddress;
      }else{
        this.sourceM=data?.source;
        this.destinationM=data?.destination;
        this.receivedLocationS=[data?.source];
        this.receivedLocationD=[data?.destination];
      }
      this.sCity=data?.source?.c;
      this.dCity=data?.destination?.c;
      this.rName=data?.name;
      this.rKm=data?.route_distance;
      this.islndmrk=data?.islndmrk;
      this.tatHr=data?.tat_hr;
      this.tatMin=data?.tat_min;
    }

  ngOnInit() {

    this.configs = this.storageServ.get('userData').configs;
    if  (this.getId){
      
    }
    let tittle=this.getId ? 'Transport Route Edit' : 'Transport Route Add'
    this.commonService.setNavTittleAndMenu(tittle)
  }

  backToListView() {
    this.router.navigateByUrl('home/master/transportRoute');
  }


 async  setRouteKm () {
    const mContext = this;
    if(mContext.ld.nativeElement.location &&  mContext.ud.nativeElement.location){
      let res = await mContext.gsaddressservice.calcDist(mContext.ld.nativeElement,mContext.ud.nativeElement);
      mContext.Distance(res);
    }else return;
  }

  Distance(res: any){
    if(res && Array.isArray(res.rows) && res.rows[0]){
      const element = res.rows[0].elements;
      const ans = Math.round(element[0].distance.value/1000);
      this.rKm = ans;
      this.rName=`${this.ld.nativeElement.c} to ${this.ud.nativeElement.c}`;
    }
  }

 
  getLocation (query:any) {
    if(query.length<2){
      return;
    }
    let reqParam={
      type_url: 'trucku',
      location:21+','+90,
      zoom:4,
      query:query,
    }
    this.clean(reqParam);
    this.masterService.getLocation(reqParam).subscribe((res: any) => {
      if(res) {
        this.receivedLocationS = res.suggestedLocations;
        this.receivedLocationD = res.suggestedLocations;
      }
    });
}


getLandmark (query:any) {
  if(query.length<2 || !this.islndmrk){
    return;
  }
  let reqParam={
    type_url: 'gps_url',
    sort: {_id: -1},
    name:query,
  }
  this.clean(reqParam);
  this.masterService.getAllLandmark(reqParam).subscribe((res: any) => {
    if(res) {
      this.receivedLocationS = res.data;
      this.receivedLocationD = res.data;
    }
  });
}


async setRouteKmM(){
  this.receivedLocationS = [];
  this.receivedLocationD = [];
  if(this.sourceM && this.destinationM){
    if(this.islndmrk){
    let s={
      latitude:this.sourceM.location.latitude,
      longitude:this.sourceM.location.longitude,
      placeName:this.sourceM.name
    };
    let d={
      latitude:this.destinationM.location.latitude,
      longitude:this.destinationM.location.longitude,
      placeName:this.destinationM.name
    };
    let dis=await this.gsaddressservice.getDistanceInKm(s.latitude,s.longitude,d.latitude,d.longitude);
    this.rKm=Math.round(dis);
    this.rName=`${s.placeName} to ${d.placeName}`;
    }else{
      let s=this.sourceM;
      let d=this.destinationM;
      let dis=await this.gsaddressservice.getDistanceInKm(s.latitude,s.longitude,d.latitude,d.longitude);
    this.rKm=Math.round(dis);
    this.rName=`${s.placeName} to ${d.placeName}`;
    }
    
  }
}

  onSubmit() {
if(this.configs.booking && this.configs.booking.showGoogleRoute){
  let data=this.receivedData;
  this.source={ 'c':this.sCity,
  'd':this.ld.nativeElement.d,
  'f':this.ld.nativeElement.f,
  'location':this.ld.nativeElement.location,
  'pin':this.ld.nativeElement.pin,
  's':this.ld.nativeElement.s,
  'placeAddress':this.ld.nativeElement.s,
  'placeName':this.ld.nativeElement.c

};
this.destination = {'c':this.dCity,
'd':this.ud.nativeElement.d,
'f':this.ud.nativeElement.f,
'location':this.ud.nativeElement.location,
'pin':this.ud.nativeElement.pin,
's':this.ud.nativeElement.s,
'placeAddress':this.ud.nativeElement.s,
'placeName':this.ud.nativeElement.c
}; 
this.source=this.mode === 2 && this.getId && this.sourceG===(data?.source?.placeName+','+data?.source?.placeAddress)?data?.source:this.source;
this.source={...this.source,'c':this.sCity};
this.destination=this.mode === 2 && this.getId && this.destinationG===(data?.destination?.placeName+','+data?.destination?.placeAddress)?data?.destination:this.destination;
this.destination={...this.destination,'c':this.dCity};

}else if(this.islndmrk){
  this.source={...this.sourceM,placeAddress:this.sourceM.address,'c':this.sCity};
  this.destination={...this.destinationM,placeAddress:this.destinationM.address,'c':this.dCity};
}
else{
  this.source={...this.sourceM,'c':this.sCity};
  this.destination={...this.destinationM,'c':this.dCity};
}
   
    this.formData.source=this.source;
    this.formData.destination=this.destination;
    this.formData.name=this.rName;
    this.formData.route_distance=this.rKm;
    this.formData.islndmrk=this.islndmrk;
    this.formData.tat_hr=this.tatHr;
    this.formData.tat_min=this.tatMin;

    this.clean(this.formData.source);
    this.clean(this.formData.destination);
    this.clean(this.formData);
    if(!(Object.keys(this.formData.source).length>5 && this.sCity && this.dCity && Object.keys(this.formData.destination).length>5 && this.formData.name && this.formData.route_distance)){
      return this.commonService.error("Please fill all mandatory fields!");
    }
    if (this.mode === 2 && this.getId) {      
      this.updateData(this.formData);
    } else {
      this.saveData(this.formData);
    } 
  }


  saveData(formData: any) {
    this.masterService.addTransportRoute(formData).subscribe((data: any) => {
      if (data) {
        this.router.navigateByUrl('home/master/transportRoute');
      }
    });
  }

  updateData(formData: any) {
    this.masterService.editTransportRoute(this.getId,formData).subscribe((data: any) => {
      if(data) {
        this.router.navigateByUrl('home/master/transportRoute');
      }
    });
  }

  clean(obj: any) {
    for (let propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
  }
}
