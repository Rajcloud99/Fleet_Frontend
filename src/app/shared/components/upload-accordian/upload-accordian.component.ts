import {Component, ViewChild, AfterViewInit, OnInit, NgZone, Input} from '@angular/core';
import {ImageService} from "../../../services/image.service";
import {faCamera} from '@fortawesome/free-solid-svg-icons';
import {environment} from 'src/environments/environment';

declare let cordova: any;
declare let navigator: any;
declare let Camera: any;
const ALLOWED_SIZE = 15728640;
let $this;

@Component({
  selector: 'upload-accordion',
  templateUrl: "./upload-accordian.component.html",
  styleUrls: ["./upload-accordian.component.less"]
})

export class UploadAccordianComponent implements OnInit {
  @ViewChild('vehicle', {static: true}) vehicle: ViewChild | undefined;
  @ViewChild('gps', {static: true}) gps: ViewChild | undefined;
  @ViewChild('driver', {static: true}) driver: ViewChild | undefined;
  @ViewChild('tags', {static: true}) tags: ViewChild | undefined;
  @ViewChild('material', {static: true}) material: ViewChild | undefined;
  @ViewChild('others', {static: true}) others: ViewChild | undefined;
  accordions: Array<any> = []
  selectedFile = {
    pending: true,
    status: 'NA',
    src: ''
  };
  @Input() aParentCompData: any;
  @Input() aAccordian: any;

  constructor(
    public imageService: ImageService
    //public phoneService: PhoneService,
  ) {
    $this = this;
  }

  allowUpload = true;

  faCamera = faCamera;
  activeKey = ["0", "1", "2", "3", "4", "5"];
  img_url = environment.img_url || "http://lmstest.umbrellaprotectionsystems.com:7653/";

  onChange(event: any) {
    console.log(event);
  }

  ngOnInit() {
    if (this.aParentCompData && (this.aParentCompData.status == 'Trip ended' || this.aParentCompData.status == 'Trip cancelled')) {
      this.allowUpload = false;
    }
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
        title: this.tags,
        child: [{name: 'F1', url: '', imgName: 'vf1', scan: true, scanVal: ''}, {
          name: 'L1',
          url: '',
          imgName: 'vl1',
          scan: true,
          scanVal: ''
        }, {name: 'L2', url: '', imgName: 'vl2', scan: true, scanVal: ''},
          {name: 'R1', url: '', imgName: 'vr1', scan: true, scanVal: ''}, {
            name: 'R2',
            url: '',
            imgName: 'vr2',
            scan: true,
            scanVal: ''
          }, {name: 'B1', url: '', imgName: 'vb1', scan: true, scanVal: ''}],
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

    ];
    for (let i = 0; i < this.accordions.length; i++) {
      for (let j = 0; j < this.aAccordian.length; j++) {
        for (let c = 0; c < this.accordions[i].child.length; c++) {
          if (this.aAccordian[j].category == this.accordions[i].child[c].imgName) {
            this.accordions[i].child[c].url = this.img_url + this.aAccordian[j].name;
            this.accordions[i].child[c].scanVal = this.aAccordian[j].scanVal;
            this.aAccordian.splice(j, 1);
            break;
          }
        }
      }
    }
  }

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
          quality: 25,
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
}
