import { Injectable } from "@angular/core";
import { forkJoin, Observable, of } from "rxjs";
import { ImgPreviewService } from "./img-preview.service";

interface FilePath {
  name?: string;
  url: string;
  preview?: boolean;
}

declare let cordova: any;
declare let device: any;
declare let plugins: any;

@Injectable({
  providedIn: "root",
})
export class PhoneService {
  constructor(
    //private promptService: PromptService,
    private imgPreviewService: ImgPreviewService
  ) {}

  downloadFile(
    aFilePath: FilePath[],
    option: any = { preview: true }
  ): Observable<any> {
    // return of(this.imgPreviewService.show(aFilePath));
    if (typeof cordova == "undefined") {
      return of();
    }

    return new Observable<any>((subscriber) => {
      if (option.preview !== false) {
        return this.imgPreviewService.show(aFilePath);
      }

      let $tasks: any[] = [];
      aFilePath.forEach((filePath) =>
        $tasks.push(this.downloadFromUrl(filePath, option))
      );
      forkJoin($tasks).subscribe((results) => {
        // let fileNames = results.filter(o => !!o).map(o => o.name).join(', ');
        // this.promptService.success('File(s) Downloaded Successfully', fileNames);
        subscriber.next(results);
        subscriber.complete();
      });
    });
  }

  private downloadFromUrl(
    filePath: FilePath,
    option: any = {}
  ): Observable<any> {
    return new Observable((subscriber) => {
      let fileName = Date.now() + "." + filePath.url.split(".").pop().trim();
      if (option.name === "preserve") fileName = filePath.name;
      if (typeof cordova != "undefined") {
        let blob: { type: any; } | null = null;
        let xhr = new XMLHttpRequest();
        xhr.open("GET", filePath.url);
        xhr.onprogress = (evt) => {
          if (evt.lengthComputable) {
            let percent = (evt.loaded / evt.total) * 100;
            percent = Math.round((percent * 100) / 100);
            console.log("[download]", percent);
           // if (option.swal) Swal.showValidationMessage(`${percent}%`);
          }
        };
        xhr.responseType = "blob"; //force the HTTP response, response-type header to be blob
        xhr.onload = () => {
          blob = xhr.response; //xhr.response is now a blob object
     //     if (option.swal) Swal.resetValidationMessage();
          this.saveFile(blob, fileName, option).subscribe(
            ({ fileName, filePath }) => {
              subscriber.next({
                name: fileName,
                path: filePath,
                mimeType: blob,
              });
              subscriber.complete();
            }
          );
        };
        xhr.send();
      } else {
        let anchorElement = document.createElement("a");
        anchorElement.href = filePath.url;
        // anchorElement.download = fileName;
        anchorElement.target = "_blank";
        anchorElement.click();
        subscriber.next();
        subscriber.complete();
      }
    });
  }

  resolveCacheDirectory() {
    if (typeof device != "undefined") {
      switch (device.platform) {
        case "Android":
          return "file:///storage/emulated/0/LMS-Lite/";
        default:
          return cordova.file.cacheDirectory;
      }
    }
  }

  resolveFile(fileName: string) {
    return new Observable<any>((subscriber) => {
      if (fileName) {
        subscriber.next(false);
        subscriber.complete();
        return;
      }

      (<any>window).resolveLocalFileSystemURL(
        `${this.resolveCacheDirectory()}/${fileName}`,
        (dirEntry:any) => {
          subscriber.next(true);
          subscriber.complete();
        },
        (err:any) => {
          subscriber.next(false);
          subscriber.complete();
        }
      );
    });
  }

  mkdirMyPinDir(): Observable<boolean> {
    return new Observable((subscriber) => {
      if ((<any>window).resolveLocalFileSystemURL)
        (<any>window).resolveLocalFileSystemURL(
          "file:///storage/emulated/0/",
          async (dirEntry:any) => {
            dirEntry.getDirectory(
              "MyPin",
              { create: true },
              (dirEntry:any) => {
                subscriber.next(true);
                subscriber.complete();
              },
              (err:any) => {
                console.error("[dir creation err]", err);
                subscriber.next(false);
                subscriber.complete();
              }
            );
          }
        );
      else {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  removeMyPinDir(): Observable<boolean> {
    return new Observable((subscriber) => {
      const error = (err:any) => {
        console.error("[dir creation err]", err);
        subscriber.next(false);
        subscriber.complete();
      };
      if ((<any>window).resolveLocalFileSystemURL)
        (<any>window).resolveLocalFileSystemURL(
          "file:///storage/emulated/0/",
          async (dirEntry) => {
            dirEntry.getDirectory(
              "MyPin",
              { create: true },
              (dirEntry) => {
                dirEntry.removeRecursively(function () {
                  console.log("Remove Recursively Succeeded");
                  subscriber.next(true);
                  subscriber.complete();
                }, error);
              },
              error
            );
          }
        );
      else {
        subscriber.next(false);
        subscriber.complete();
      }
    });
  }

  private saveFile(blob, fileName, option: any = {}): Observable<any> {
    return new Observable((subscriber) => {
      (<any>window).resolveLocalFileSystemURL(
        this.resolveCacheDirectory(),
        async (dirEntry) => {
          dirEntry.getFile(
            fileName,
            { create: true, exclusive: false },
            (fileEntry) => {
              this.writeFile(fileEntry, blob).subscribe(() => {
                subscriber.next({
                  fileName,
                  filePath: dirEntry.name,
                });
                subscriber.complete();
              });
            },
            (err) => {
              console.log(err);
              subscriber.complete();
            }
          );
        }
      );
    });
  }

  private writeFile(fileEntry: any, blob: any): Observable<any> {
    return new Observable((subscriber) => {
      fileEntry.createWriter(function (fileWriter) {
        fileWriter.onwriteend = () => {
          subscriber.next();
          subscriber.complete();
        };

        fileWriter.onerror = (e) =>
          console.error("[Failed file write]: " + e.toString());
        fileWriter.write(blob);
      });
    });
  }


}
