import { Component, VERSION, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { Result } from '@zxing/library';

@Component({
  selector: 'qr-code',
  templateUrl: 'qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrCodeScannerModule implements OnInit {

  ngVersion = VERSION.full;
  @ViewChild('scanner', { static: true }) scanner: ZXingScannerComponent | any;

  hasDevices: boolean | any;
  hasPermission: boolean | any;
  qrResultString: string | any;
  qrResult: Result | any;

  availableDevices: MediaDeviceInfo[] | any;
  currentDevice: MediaDeviceInfo | any;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  ngOnInit(): void {

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasDevices = true;
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
        if (/back|rear|environment/gi.test(device.label)) {
          this.scanner.changeDevice(device);
          this.currentDevice = device;
          break;
        }
      }
    });

    this.scanner.camerasNotFound.subscribe(() => this.hasDevices = false);
    this.scanner.scanComplete.subscribe((result: Result) => this.qrResult = result);
    this.scanner.permissionResponse.subscribe((perm: boolean) => this.hasPermission = perm);
  }

  handleQrCodeResult(resultString: string) {
    console.debug('Result: ', resultString);
    let final_value = resultString;
    try{
      final_value = JSON.parse(resultString)
    }catch (e) {
      console.error('some error ', e.message);
    }
    this.qrResultString = final_value;
  }
}
//https://stackblitz.com/edit/zxing-ngx-scanner?file=package.json,projects%2Fzxing-scanner-demo%2Fsrc%2Fapp%2Fapp.component.ts,projects%2Fzxing-scanner-demo%2Fsrc%2Fapp%2Fapp.component.html,projects%2Fzxing-scanner-demo%2Fsrc%2Fapp%2Fapp-info-dialog%2Fapp-info-dialog.component.ts,projects%2Fzxing-scanner-demo%2Fsrc%2Fapp%2Fformats-dialog%2Fformats-dialog.component.ts
