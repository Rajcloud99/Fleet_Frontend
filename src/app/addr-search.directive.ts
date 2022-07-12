import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import {} from 'googlemaps';

@Directive({
  selector: '[appAddrSearch]'
})
export class AddrSearchDirective {
  @Output() calDist = new EventEmitter();
  constructor(private ele: ElementRef) { 
    const autocomplete = new google.maps.places.Autocomplete(ele.nativeElement, {
      fields: ["address_components", 'geometry', "name"],
      types: ["(regions)"],
      componentRestrictions: {country: "in"}
    });
    autocomplete.addListener("place_changed", ()=>{
      const place = autocomplete.getPlace();
      let c = "";
      let d = "";
      let f = "";
      let s = "";
      let pin = "";
    for (const component of place.address_components || []) {
      const componentType = component.types[0];

      switch (componentType) {
        case "sublocality_level_1":
          c = component.long_name;
          break;

        case "locality":
          c =  (c ? c + ' ' : '') + component.long_name;
          break;

        case "postal_code":
          pin = component.long_name;
          break;

        case "administrative_area_level_2":
          d = component.long_name;
          break;

        case "administrative_area_level_1": {
          if(!c)
            c = component.long_name;
            s = component.long_name;
            f = component.short_name;
            break;
        }
      }
    }

    let obj = {
      c, d, f, s, pin,
      location: place?.geometry?.location
    };
    ele.nativeElement.location = obj.location;
    ele.nativeElement.c = obj.c;
    ele.nativeElement.d = obj.d;
    ele.nativeElement.f = obj.f;
    ele.nativeElement.s = obj.s;
    ele.nativeElement.pin = obj.pin;
    
    this.calDist.emit();
    });
  }
}
