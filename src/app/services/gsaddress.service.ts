import { Injectable } from '@angular/core';
import {} from 'googlemaps';
@Injectable({
  providedIn: 'root'
})
export class GsaddressService {

  constructor() { }

 async calcDist(point1:any, point2:any) {
    if(point1.location &&  point2.location){
      const service = new google.maps.DistanceMatrixService();
        return await service.getDistanceMatrix({
          origins: [point1.location],
          destinations: [point2.location],
          travelMode: google.maps.TravelMode.DRIVING,
          },(response,status) => {
            if(status === 'OK')  {
              // if(response && Array.isArray(response.rows) && response.rows[0]){
              //   let element = response.rows[0].elements;
              //   return Math.round(element[0].distance.value/100);
              // }
              return response;
            }
            return response;
            
          });
    }
  }

  deg2rad(deg:any) {
		return deg * (Math.PI / 180)
	}

  async getDistanceInKm(lat1:any, lon1:any, lat2:any, lon2:any) {
		let R = 6371; // Radius of the earth in km
		let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
		let dLon = this.deg2rad(lon2 - lon1);
		let a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		let d = R * c; // Distance in km
		return d;
	};


}
