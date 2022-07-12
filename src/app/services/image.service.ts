import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Injectable} from "@angular/core";
import { CommonService } from "./common.service"

declare let window: any;

const URL = {
  UPLOAD_DMS: 'api/dms/upload_image/',
  UPLOAD_TAG: 'api/dms/upload_tag/'
}
@Injectable({
  providedIn: 'root'
})

export class ImageService {
  docType: any;
  constructor(private http: HttpClient,private commonService:CommonService) {}

  public uploadImage(image: any,content:any): Observable<Response> {
    const fd = new FormData();
    this.docType = content.imgName;
    fd.append('uploadfile', image);
    fd.append('bodyKey', this.docType);
    fd.append('modelName', content.colName);
    if(content.scanVal){
      fd.append('scanVal', content.scanVal);
    }

   return this.http.post(URL.UPLOAD_DMS+content.col_id, fd).pipe(
      map((res: any) => {
        if(res.data) {

          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  public uploadTag(content:any): Observable<Response> {
    var request = {
      bodyKey:content.imgName,
      modelName:content.colName,
      scanVal:content.scanVal
    };
    return this.http.post(URL.UPLOAD_TAG+content.col_id, request)
      .pipe(map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  readImage(filePath: string, callback: Function) {
    (<any>window).resolveLocalFileSystemURL(
      filePath,
      (fileEntry:any) => {
        fileEntry.file(
          (file:File) => {
            var reader = new FileReader();
            reader.onloadend = function (evt: any) {
              callback(null, evt.target.result);
            };
            reader.readAsDataURL(file);
          },
          (e:any) => callback(e, null)
        );
      },
      (e:any) => callback(e, null)
    );
  }
}
