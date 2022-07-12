import { NgModule } from "@angular/core";
//import { UploadFileComponent } from "./components/upload-file/upload-file.component";
// import {NgZorroAntdMobileModule} from "ng-zorro-antd-mobile";
import {NzModalModule} from "ng-zorro-antd/modal";
import {CommonModule} from "@angular/common";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
//import { UploadFileComponent } from "./components/upload-file/upload-file.component";
import { UploadUtilComponent } from "./components/uplod-util/upload-util.component";
import { UploadAccordianComponent } from "./components/upload-accordian/upload-accordian.component";
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QrCodeScannerModule } from "./components/qrcode/qrcode.component";


@NgModule({
  declarations: [
   // UploadFileComponent,
    UploadUtilComponent,
    UploadAccordianComponent,
    QrCodeScannerModule
  ],
  imports: [
    // NgZorroAntdMobileModule,
    NzModalModule,
    CommonModule,
    NzDrawerModule,
    FontAwesomeModule,
    ZXingScannerModule
  ],
  exports: [
   // UploadFileComponent,
    UploadUtilComponent,
    UploadAccordianComponent,
    QrCodeScannerModule
  ]
})
export class SharedComponentModule {}
