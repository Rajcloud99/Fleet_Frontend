import {Component, ViewChild, AfterViewInit, OnInit, NgZone, Input} from '@angular/core';
import {ImageService} from "../../../services/image.service";
import {faCamera, faQrcode, faSave} from '@fortawesome/free-solid-svg-icons';
import {environment} from 'src/environments/environment';
import {ActivatedRoute, Router} from "@angular/router";
import { StorageService } from 'src/app/services/storage.service';
import {NzModalService} from "ng-zorro-antd/modal";
import {CommonService} from "../../../services/common.service";
import { MasterService } from '../../master.service';




declare let cordova: any;
declare let navigator: any;
declare let Camera: any;
const ALLOWED_SIZE = 15728640;
let $this;

@Component({
  selector: 'app-upload',
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})

export class UploadComponent implements OnInit {
  @ViewChild('vehicle', {static: true}) vehicle: ViewChild | undefined;
  @ViewChild('gps', {static: true}) gps: ViewChild | undefined;
  @ViewChild('driver', {static: true}) driver: ViewChild | undefined;
  @ViewChild('tags', {static: true}) tags: ViewChild | undefined;
  @ViewChild('material', {static: true}) material: ViewChild | undefined;
  @ViewChild('others', {static: true}) others: ViewChild | undefined;
  innerWidth = window.innerWidth;
  accordions: Array<any> = []
  imageObject: Array<any> = []
  selectedFile = {
    pending: true,
    status: 'NA',
    src: ''
  };
  visible :boolean =false;
  configs: any;
  imgpreviewdata:any;
  showFlag: any;
  sealStatusFlag:boolean=true;
  selectedImageIndex: any;
  currentIndex: any;
  @Input() aParentCompData: any;
  @Input() aAccordian: any;

  constructor(
    public imageService: ImageService,
    private route: ActivatedRoute,
    private router: Router,
    private modal: NzModalService,
    private common: CommonService,
    private storageServ: StorageService,
    private masterService: MasterService,
    //public phoneService: PhoneService,
  ) {
    $this = this;
    this.route.params.subscribe((queryParam) => {
      if (queryParam) {
        const currentState = this.router.getCurrentNavigation();
        this.aParentCompData = currentState && currentState.extras.state;
        this.aAccordian = this.aParentCompData.receivedDocument || [];
      }
    });
  }

  allowUpload = true;

  faCamera = faCamera;
  faQrcode = faQrcode;
  faSave = faSave;
  activeKey = ["0", "1", "2", "3", "4", "5"];
  img_url = environment.img_url || "http://lmstest.umbrellaprotectionsystems.com:7653/";

  onChange(event: any) {
    console.log(event);
  }

  ngOnInit() {
    if (this.aParentCompData && (this.aParentCompData.status == 'Trip ended' || this.aParentCompData.status == 'Trip cancelled')) {
      this.allowUpload = false;
    }
    this.configs = this.storageServ.get('userData').configs;
    this.accordions = [
      {
        title: this.vehicle,
        child: [{name: 'Front', url: '', imgName: 'vehicle_front'}, {name: 'Back', url: '', imgName: 'vehicle_back'}],
        inactive: false,
        addImage: '/asset/account.png'
      },
      {
        title: this.gps,
        child: [{name: 'Device', url: '', imgName: 'device'}],
        inactive: false,
        addImage: '/asset/account.png'
      },
      {
        title: this.driver,
        child: [{name: 'PIC', url: '', imgName: 'driver'}],
        inactive: false,
        addImage: '/asset/account.png'
      },
      {
        title: this.material,
        child: [{name: 'PIC1', url: '', imgName: 'material'}, {name: 'PIC2', url: '', imgName: 'material2'}],
        inactive: false,
        addImage: '/asset/account.png'
      },
      {
        title: this.others,
        child: [{name: 'Ext1', url: '', imgName: 'ext1'}, {name: 'Ext2', url: '', imgName: 'ext2'}],
        inactive: false,
        addImage: '/asset/account.png'
      },
      {
        title: this.tags,
        child: [
          {name: 'F1(Load)', url: '', imgName: 'vf1', scan: true, scanVal: ''},{name: 'F1(Unload)', url: '', imgName: 'vf12', scan: true, scanVal: '', compaire: true},
          {name: 'F2(Load)', url: '', imgName: 'vf2', scan: true, scanVal: ''},{name: 'F2(Unload)', url: '', imgName: 'vf22', scan: true, scanVal: '', compaire: true},
          {name: 'L1(Load)', url: '', imgName: 'vl1', scan: true, scanVal: ''},{name: 'L1(Unload)', url: '', imgName: 'vl12', scan: true, scanVal: '', compaire: true},
          {name: 'L2(Load)', url: '', imgName: 'vl2', scan: true, scanVal: ''},{name: 'L2(Unload)', url: '', imgName: 'vl22', scan: true, scanVal: '', compaire: true},
          {name: 'L3(Load)', url: '', imgName: 'vl3', scan: true, scanVal: ''},{name: 'L3(Unload)', url: '', imgName: 'vl32', scan: true, scanVal: '', compaire: true},
          {name: 'L4(Load)', url: '', imgName: 'vl4', scan: true, scanVal: ''},{name: 'L4(Unload)', url: '', imgName: 'vl42', scan: true, scanVal: '', compaire: true},
          {name: 'R1(Load)', url: '', imgName: 'vr1', scan: true, scanVal: ''},{name: 'R1(Unload)', url: '', imgName: 'vr12', scan: true, scanVal: '', compaire: true},
          {name: 'R2(Load)', url: '', imgName: 'vr2', scan: true, scanVal: ''}, {name: 'R2(Unload)', url: '', imgName: 'vr22', scan: true, scanVal: '', compaire: true},
          {name: 'R3(Load)', url: '', imgName: 'vr3', scan: true, scanVal: ''}, {name: 'R3(Unload)', url: '', imgName: 'vr32', scan: true, scanVal: '', compaire: true},
          {name: 'R4(Load)', url: '', imgName: 'vr4', scan: true, scanVal: ''}, {name: 'R4(Unload)', url: '', imgName: 'vr42', scan: true, scanVal: '', compaire: true},
          {name: 'B1(Load)', url: '', imgName: 'vb1', scan: true, scanVal: ''},{name: 'B1(Unload)', url: '', imgName: 'vb12', scan: true, scanVal: '', compaire: true},
          {name: 'B2(Load)', url: '', imgName: 'vb2', scan: true, scanVal: ''},{name: 'B2(Unload)', url: '', imgName: 'vb22', scan: true, scanVal: '', compaire: true}
        ],
        inactive: false,
        addImage: '/asset/account.png'
      },

    ];
    if(this.configs && this.configs.accordions){
      this.accordions = this.configs.accordions;

      this.accordions.forEach(obj=> {
        switch (obj.title){
          case "vehicle":
            obj.title = this.vehicle;
            break;
          case "gps":
            obj.title = this.gps;
            break;
          case "driver":
            obj.title = this.driver;
            break;
          case "material":
            obj.title = this.material;
            break;
          case "others":
            obj.title = this.others;
            break;
          case "tags":
            obj.title = this.tags;
            break;
        }
      })
    }
    for (let i = 0; i < this.accordions?.length; i++) {
      for (let j = 0; j < this.aAccordian?.length; j++) {
        for (let c = 0; c < this.accordions[i]?.child?.length; c++) {
          if (this.aAccordian[j].category == this.accordions[i].child[c].imgName) {
            // let index = a.findIndex(x => x.LastName === "Skeet");
            if( !this.imageObject.length || this.imageObject.findIndex(x => x.title === this.aAccordian[j].category) < 0) {
              this.imageObject.push({title: this.aAccordian[j].category, image: this.img_url + this.aAccordian[j].name})
            }else{
              this.imageObject[this.imageObject.findIndex(x => x.title === this.aAccordian[j].category)].title = this.aAccordian[j].category;
              this.imageObject[this.imageObject.findIndex(x => x.title === this.aAccordian[j].category)].image = this.img_url + this.aAccordian[j].name;
            }
            this.accordions[i].child[c].url = this.img_url + this.aAccordian[j].name;
            this.accordions[i].child[c].scanVal = this.aAccordian[j].scanVal;
            this.accordions[i].child[c].date = this.aAccordian[j].date;
            // this.aAccordian.splice(j, 1);
            // j =0;
            // c =0;
            break;
          }
        }
      }
    }
    this.isStatusMatch();
    if(!(this?.aParentCompData?.barCodeStatus=='MATCHED')){
      this.isMatchComplete();
    }
    this.isSealed();
  }

isMatchComplete(){
let tagMatchcount=0;
for (let i = 0; i < this.accordions[5].child.length; i++) {
if(this.accordions[5]?.child[i]?.status=='Match'){
  tagMatchcount+=1;
  }
}
  if(this.accordions[5].child.length==tagMatchcount*2){
    this.updateBarCodeStatus(this.aParentCompData._id);
  }
  
}

isSealed(){
  const result = this.accordions[5].child.filter((doc:any) => doc.scanVal !== '');  
  if(result.length>0){
    this.updateSealStatus(this.aParentCompData._id);
    }    
  }

updateSealStatus(id:any) {
  if(this.accordions[5].child.length<1){
    return;
  }
  if(this.aParentCompData.sealStatus==='YES'){
    return;
  }
  if(!id){
    return;
  }
  if(this.sealStatusFlag){
    let reqParam={
      sealStatus:"YES",
    }
    this.masterService.updateTrip(id,reqParam).subscribe((res: any) => {
      if(res) {
        this.common.success("Seal Status Yes");
        this.sealStatusFlag=false;
      }
    });
  }
 
}

updateBarCodeStatus(id:any) {
  if(!id){
    return;
  }
  let reqParam={
    barCodeStatus:"MATCHED",
  }
  this.masterService.updateTrip(id,reqParam).subscribe((res: any) => {
    if(res) {
      this.common.success("Barcode Status Matched");
    }
  });
}

  isStatusMatch(){
    for (let i = 0; i < this.accordions[5].child.length; i++) {
      let componentType = this.accordions[5].child[i];
      let imgName = this.accordions[5].child[i].imgName;
      let scanVal = this.accordions[5].child[i].scanVal;
      let index;
      if(componentType.url)
      switch (imgName) {
        case "vf1":
           index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vf12')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vf2":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vf22')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vl1":
           index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vl12')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vl2":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vl22')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vl3":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vl32')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vl4":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vl42')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

        case "vr1":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vr12')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;
        case "vr2":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vr22')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;
        case "vr3":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vr32')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;
        case "vr4":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vr42')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;



        case "vb1":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vb12')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;
        case "vb2":
          index = this.accordions[5].child.findIndex((x:any) => x.imgName === 'vb22')
          if(this.accordions[5].child[index].scanVal === scanVal && componentType.url)
            this.accordions[5].child[index].status = 'Match';
          else if(this.accordions[5].child[index].url)
            this.accordions[5].child[index].status = 'Not Match';
          break;

      }
    }
  }

  showLightbox(index: any) {
    this.selectedImageIndex = index;
    this.showFlag = true;
  }

  // closeEvent() {
  //   this.showFlag = false;
  //   this.currentIndex = -1;
  // }

  openCamera(content: any) {
    if (navigator && navigator.camera) {
      let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      if (content.source === "camera") {
        sourceType = Camera.PictureSourceType.PICTURE;
      }

      navigator.camera.getPicture(
        (filePath: any) => {
          console.log('filePath getPicture', filePath);
          content.url = filePath;
          content.localFile = true;
          content.enableSave = true;
          // this.processFile(filePath,content);
        },
        (error: any) => {
          console.error("Unable to obtain picture: " + error, "app");
        },
        {
          quality: 10,
          correctOrientation: true,
          // destinationType: Camera.DestinationType.FILE_URI,
          sourceType,
          // allowEdit: true,
          DestinationType: Camera.DestinationType.DATA_URL,
        }
      );
    }
  }

  handleGallery(content: any) {
    content.source = 'gallery'
    content.col_id = this.aParentCompData._id;
    content.colName = 'trip';
    this.openCamera(content);
  }

  handleCamera(content: any) {
    content.source = 'camera'
    content.col_id = this.aParentCompData._id;
    content.colName = 'trip';
    this.openCamera(content);
  }

  handleBarCode(content: any) {
    content.source = 'camera'
    content.col_id = this.aParentCompData._id;
    content.colName = 'trip';
    this.scanBarCode(content);
  }

  scanBarCode(content: any) {
    if (cordova && cordova.plugins && cordova.plugins.barcodeScanner) {
      cordova.plugins.barcodeScanner.scan(
        function (result: any) {
          if (!result.cancelled) {
            if (true || result.format == "QR_CODE") {//allow all format. Can restrict later
              console.log('qr code result', result.text);
              content.scanVal = result && result.text;
              content.enableSave = true;
              /*
              navigator.notification.prompt("Please enter name of data",  function(input){
                var name = input.input1;
                var value = result.text;

                var data = localStorage.getItem("LocalData");
                console.log(data);
                data = JSON.parse(data);
                data[data.length] = [name, value];

                localStorage.setItem("LocalData", JSON.stringify(data));

                alert("Done");

              });
               */
            } else {
              console.log('qr code result not in format', result);
            }
          } else {
            console.error(' bar code result cancelled');
          }
        },
        function (error: any) {
          alert("Scanning failed: " + error);
        }
      );
    } else {
      console.log('scanner not attached ');
    }

  }

  saveDocs(content: any) {
    if (content.url) {
      this.processFile(content.url, content);
      content.enableSave = false;
    }
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.isStatusMatch();
    this.isMatchComplete();
    this.isSealed();
  }

  private onError() {
    this.selectedFile.pending = true;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(filePath: any, content: any) {
    if(!content.localFile && content.scanVal){
      //No file chnage from camera
      this.imageService.uploadTag(content).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })

    }else{
      this.imageService.readImage(filePath, (error: any, base64Img: any) => {
        this.selectedFile.pending = true;
        this.imageService.uploadImage(base64Img, content).subscribe(
          (res) => {
            this.onSuccess();
          },
          (err) => {
            this.onError();
          })
      });
    }
  }
  PreviewImage(data:any) {
    if(!data){
      this.common.error('image data not found')
      return;
    }
  this.imgpreviewdata = data;
    this.visible = true;
  }

  handleCancel(){
    this.visible = false;
  }
}
