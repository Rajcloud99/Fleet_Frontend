import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgPreviewService {

  private previewSubject = new Subject();
  previewObservable: Observable<any>;

  constructor() {
    this.previewObservable = this.previewSubject.asObservable();
  }

  show(files: any[] = []) {
    if(files.length)
      this.previewSubject.next(files);
  }
}
