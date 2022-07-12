import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
//import { CommonService } from "@app/services/common.service";
import { ImagePickerComponent } from "ng-zorro-antd-mobile";
//import { ControlContainer } from "@angular/forms";
import { faCamera, faImage } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from "rxjs";
//import { PhoneService } from "../../../services/phone.service";

declare let navigator: any;
declare let Camera: any;
const ALLOWED_SIZE = 15728640;
let $this;

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.less"],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  faCamera = faCamera;
  faImage = faImage;

  @Input("files") fileList: any = [];
  @Input("size") size: number = 5;
  @Input("multiple") multiple: boolean = true;
  @Input("selectable") selectable: boolean = true;
  @Input("data") order: any = [];
  @Output("onImageClick") imageClickEvent: EventEmitter<any> = new EventEmitter();
  @Output("filesChange") fileListChange = new EventEmitter();

  parentForm: any;
  previewImage: string = '';
  previewVisible: boolean = false;
  showAttachmentSource: boolean = false;
  addImageImagePickerComponentFn: Function;
  //fileListChangeSubscription: Subscription;

  constructor(
   // private commonService: CommonService,
   // public controlContainer: ControlContainer,
   // public phoneService: PhoneService,
    private zone: NgZone
  ) {
    this.addImageImagePickerComponentFn =  ImagePickerComponent.prototype.addImage;
    ImagePickerComponent.prototype.addImage = this.addImage;
    $this = this;
  }

  ngOnInit() {
    console.log('ngOnInit upload-file');
    //this.parentForm = this.controlContainer.control;
    // this.fileListChangeSubscription = this.parentForm.controls.fileList.valueChanges
    //     .subscribe(value => {
    //         console.log(value);
    //     });
  }

  ngOnDestroy(): void {
    ImagePickerComponent.prototype.addImage = <any>(
      this.addImageImagePickerComponentFn
    );
    // this.fileListChangeSubscription.unsubscribe();
  }

  onImageClick($event:any) {
    this.imageClickEvent.emit($event);
  }

  addImage(imgItem:any) {
    let _this: any = this;

    if (imgItem.file.size <= ALLOWED_SIZE) {
      if (imgItem.file.type.indexOf("application/pdf") != -1) {
        _this._files.push({
          type: "pdf",
          url: "assets/images/pdf-file.jpg",
          nUrl: imgItem.url,
          orientation: 1,
        });
      } else if (imgItem.file.type.indexOf("image/") != -1) {
        _this._files.push({
          type: "img",
          url: imgItem.url,
          orientation: 1,
        });
      } else {
        _this._files.push({
          type: "doc",
          url: "assets/images/doc.png",
          nUrl: imgItem.url,
          orientation: 1,
        });
      }
    } else {
     // $this.commonService.error(`File '${imgItem.file.name}' too large`);
    }

    _this.sortItem();
    _this.onChange.emit({
      files: _this._files,
      operationType: "add",
      index: _this._files.length - 1,
    });
  }

  addImageClick(e:any) {
    if (navigator && navigator.camera) {
      e.preventDefault();
      this.showAttachmentSource = true;
    }
  }

  openCamera(source:any) {
    this.showAttachmentSource = false;

    if (navigator && navigator.camera) {
      let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      if (source === "camera") {
        sourceType = Camera.PictureSourceType.PICTURE;
      }

      navigator.camera.getPicture(
        (filePath:any) => {
          console.log('filePath getPicture');
         /*
          this.phoneService.corpImage(filePath).subscribe((cropImagePath) => {

            cropImagePath &&
              this.commonService.readImage(
                cropImagePath,
                (error, base64Img) => {
                  this.zone.run(() => {
                    if (base64Img) {
                      this.fileList = this.fileList.concat({
                        type: "img",
                        url: base64Img,
                        orientation: 1,
                      });
                      this.fileListChange.emit(this.fileList);
                    }
                  });
                }
              );

          });
          */
        },
        (error:any) => {
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

  fileChange($event:any) {
    this.fileList = this.fileList.slice(0, 5);
    this.fileListChange.emit(this.fileList);
  }

  onDrawerClose() {
    this.showAttachmentSource = false;
  }
}
