import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";

declare let navigator: any;
declare let Camera: any;
const ALLOWED_SIZE = 15728640;
let $this;

@Component({
  selector: "app-upload-util",
  templateUrl: "./upload-util.component.html",
  styleUrls: ["./upload-util.component.less"],
})
export class UploadUtilComponent implements OnInit, OnDestroy {

  constructor(
    private zone: NgZone
  ) {
    $this = this;
  }

  ngOnInit() {
    console.log('ngOnInit upload-util');
    //this.parentForm = this.controlContainer.control;
    // this.fileListChangeSubscription = this.parentForm.controls.fileList.valueChanges
    //     .subscribe(value => {
    //         console.log(value);
    //     });
  }

  ngOnDestroy(): void {
    // this.fileListChangeSubscription.unsubscribe();
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
    }
  }

  openCamera(source:any) {
    if (navigator && navigator.camera) {
      let sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
      if (source === "camera") {
        sourceType = Camera.PictureSourceType.PICTURE;
      }

      navigator.camera.getPicture(
        (filePath:any) => {
          console.log('filePath getPicture');
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
    //this.fileList = this.fileList.slice(0, 5);
    //this.fileListChange.emit(this.fileList);
  }

  onDrawerClose() {
    //this.showAttachmentSource = false;
  }
}
