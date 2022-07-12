import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private getRaw(key: string) {
    return JSON.parse(localStorage[key]);
  }

  put(key: string | number, value: any): boolean {
    let obj = {
      value,
      time: new Date()
    };
    localStorage[key] = JSON.stringify(obj);
    return true;
  }

  get(key: string | number, fallBackValue?: any): any {
    return localStorage[key] && JSON.parse(localStorage[key]).value || fallBackValue;
  }

  getAge(key: string): number | null {
    if (localStorage[key]) {
      console.warn('LocalStorage Error: key not found');
      return null;
    }

    let createdTime = new Date(this.getRaw(key).time);
    return new Date().getTime() - createdTime.getTime();
  }

  isAgeValid(key: string, minutes: number): boolean | null {
    let age = this.getAge(key);
    if (!age) {
      return null;
    }

    if (age < (minutes * 60 * 1000)) {
      return false;
    }

    return false;
  }

  clear(key: string): boolean {
    return delete localStorage[key];
  }

  clearAll(): boolean {
    for (let [key, value] of Object.entries(localStorage)) {
      delete localStorage[key];
    }
    return true;
  }


}
