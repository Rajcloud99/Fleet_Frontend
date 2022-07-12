import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdMobileModule } from 'ng-zorro-antd-mobile';

import { DemoImagePickerBasicComponent } from './components/image-picker/image-picker.component';

//import { registerLocaleData } from '@angular/common';
//import en from '@angular/common/locales/en';
//registerLocaleData(en);

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule, ReactiveFormsModule, NgZorroAntdMobileModule, BrowserAnimationsModule],
  exports: [
    DemoImagePickerBasicComponent
  ],
  declarations: [DemoImagePickerBasicComponent]
  // bootstrap:    [ DemoImagePickerBasicComponent ]
})
export class Shared2ComponentModule {}
