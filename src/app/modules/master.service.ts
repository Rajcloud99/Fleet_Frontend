import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, debounceTime, map } from 'rxjs/operators';
import { CommonService } from '../services/common.service';
import { StorageService } from '../services/storage.service';

const URL = {

  //vendor tds rate
  GET_TDS_RATE: 'api/tdsRate/get/',
  //vendor Deal
  PUT_VENDOR_DEAL : 'api/trips/vendorDeal/',
  // Branch API
  GET_CUSTOMER_RATE_CHART : 'api/customerRateChart/aggr',
  BRANCH_GET : 'api/branch/get/',
  POST_BRANCH_ADD : 'api/branch/add/',
  PUT_BRANCH_UPDATE : 'api/branch/update/',
  POST_BRANCH_DISABLE: 'api/branch/enabledisable/',
  POST_GET_VEHICLE: 'api/regvehicle/get/',
  POST_VEHICLE_REPORT_GET: 'api/reports/vehicle',
  USER_GET:'api/users/get',
  POST_GET_CITIES: 'api/city/autosuggest',
  CREATE_TRIP : "api/trips/createTrip",
  VEHICLE_ALLOCATE: 'api/trips/vehicle_allocate',
  EMPTY_TRIP: 'api/trips/empty-trip',
  POST_TRIP_GR_GET: 'api/trip_gr/get',
  AUTOSUGGESR_CITY : 'api/city/autosuggest',
  POST_TRIP_GET: 'api/trips/getV2',
  PUT_TRIP_UPDATE_STATUS : 'api/trips/update_status/',
  PUT_TRIP_UPDATE:'api/trips/update/',
  GET_TRANSPORTER_ROUTES :'api/transportroute/get/',
  POST_JOBORDER_POWERCONNECT: 'api/trips/jobOrderPowerConnectReport',
  POST_JOBRISKY: 'api/trips/jobOrderRiskyReport',
  POST_JOBORDER: 'api/trips/jobOrderReport',

  //Driver API
  GET_DRIVER_GET: 'api/driver/get/',
  GET_DRIVER_REPORT_GET: 'api/driver/report/',
  POST_DRIVER_CREATE: 'api/driver/add2/',
  PUT_DRIVER_UPDATE: 'api/driver/update/',
  DELETE_DRIVER_REMOVE: 'api/driver/delete/',
  POST_DOC_GET: 'api/dms/get/',
  PUT_DOC_VALIDATE: 'api/dms/validate/',
  PUT_DOC_SAVE: 'api/dms/save/',
  PUT_DOC_REMOVE: 'api/dms/deleteImg/',


  //Billing Party API
  GET_BILLING_PARTY_GET: 'api/billingParty/get/',
  POST_BILLING_PARTY_CREATE: 'api/billingParty/add',
  PUT_BILLING_PARTY_UPDATE: 'api/billingParty/update/',
  DELETE_BILLING_PARTY_REMOVE: 'api/billingParty/delete/',

  //Gr Without Trip API
  POST_GR_WITHOUT_TRIP_GET: 'api/trip_gr/get/',
  POST_GR_WITHOUT_TRIP_CREATE: 'api/trip_gr/addGr',
  PUT_GR_WITHOUT_TRIP_UPDATE: 'api/trip_gr/add_gr_number/',
  DELETE_GR_WITHOUT_TRIP_REMOVE: 'api/trip_gr/delete/',
  POST_MAP_GR_WITH_TRIP: 'api/trip_gr/mapGrIntoTrip',

  //Account get API for all
  POST_ACCOUNT_GET: 'api/accounts/get/',

  // stationary get API
  POST_STATIONARY_GET: 'api/billStationary/get/',

  // VEHICLE API
  POST_VEHICLE_GET : 'api/regvehicle/get',
  POST_VEHICLE_ADD : 'api/regvehicle/add2',
  PUT_VEHICLE_UPDATE : 'api/regvehicle/update/',
  POST_VEHICLE_REMOVE :'api/regvehicle/delete/',
  GET_VEHICLE_TYPE :'api/vehicle/type/get/',
  GET_VEHICLE_GROUP :'api/vehicle/get/',
  //vender api
  POST_VENDER_GET : 'api/vendor/transport/get/',
  DELETE_VENDOR: 'api/vendor/transport/delete/',
  PUT_VENDOR_UPDATE : 'api/vendor/transport/update',
  POST_VENDOR_ADD : 'api/vendor/transport/add',

  // GET  CONSIGNOR CONSIGNEE API
  GET_CONSIGNOR_CONSIGNEE: "api/consignor_consignee/get",

  // API FOR  GET CUSTOMER
  GET_All_CUSTOMER : "api/customer/get",
  //add customer
  CUSTOMER_ADD : "api/customer/add",
  //add customer
  CUSTOMER_UPDATE : "api/customer/update/",

  // GET SOUCE AND DESTINATION
  GET_GR_ROUTE : 'api/customerRateChart/',
  // GET billed SOUCE AND billed DESTINATION
  POST_BILLED_ROUTE: 'api/city/get',
  // api for gr
  GET_ALL_GR: "Api/trip_gr/getV2Lite",
  //cencle trip GR
  CANCEL_TRIP_GR: "api/trip_gr/cancel/",
  GET_CONFIGS : "api/configs/",
  //for trip memo get
  GET_ALL_TRIP_MEMO:"api/trip_memo/get_trip_memo",
  POST_TRIP_MEMO_UPDATE:"API/trip_memo/updateTripMemo/",

  // for material
  MATERIAL_GET : "api/material/type/get/",
  MATERIAL_ADD : "api/material/type/add/",
  MATERIAL_EDIT : "api/material/type/update/",
  MATERIAL_DELETE : "api/material/type/delete/",
  MATERIAL_TYPE_GET : "api/material/group/get/",
  MATERIAL_GROUP_ADD : "api/material/group/add/",
  MATERIAL_GROUP_EDIT : "api/material/group/update/",
  MATERIAL_GROUP_DELETE : "api/material/group/delete/",

  //for bookings and duty
  BOOKING_GET : "api/bookings/get/",
  DUTY_ADD : "api/bookings/add/",
  DUTY_EDIT : "api/bookings/update/",
  TRAFF_MANNG_EDIT : "api/bookings/assign/",
  //for geofence
  POST_GET_GEOZONE : "api/geozone/get",
  POST_DELETE_GEOZONE : "api/geozone/remove",
  POST_EDIT_GEOZONE : "api/geozone/update",
  //for Transport Router
  TRANSPORT_ROUTE_GET: "api/transportroute/get/",
  TRANSPORT_ROUTE_UPDATE_PUT:"api/transportroute/update/",
  TRANSPORT_ROUTE_ADD_POST:"api/transportroute/add/",
  GET_LOCATION_MAPMYINDIA:'api/mapmyindia/atlas/api/places/search/json/',
  // tracking module
  POST_VEHICLEWISE: "api/tracking/vehiclewise",

  // for landmark
  POST_GET_LANDMARK : "landmark/get",
  POST_Add_LANDMARK : "landmark/add",
  POST_EDIT_LANDMARK :"landmark/update",
  POST_DELETE_LANDMARK :"landmark/remove",
  //**********
  POST_TRIP_ALERTS: "api/trips/getAlerts",
  POST_GET_ALERTS: "alert/getV2",
  POST_VEHICLE_PLAYBACK: "api/reports/playback",
  POST_SIM_BASE_PLAYBACK: "api/trips/simBasePlayBack",
  POST_GROUP_ALERTS: "alert/groupAlerts",

  //******************** */
  POST_GET_ALARMS: "api/alarm/get",
  POST_UPDATE_ALARM: "api/alarm/update",
  POST_CREATE_ALARM: "api/alarm/create",
  POST_REMOVE_ALARM: "api/alarm/remove"
}
@Injectable({
  providedIn: 'root'
})
export class MasterService {
  gpsgaadi_token: any;
  gpsId: any;
  constructor(
    private http: HttpClient,
    private commonService: CommonService,
    private store: StorageService
  ) {
    this.gpsgaadi_token = this.store.get('userData').client_config.gpsgaadi_token;
  }

  getRandomNo () {
    return Date.now()+''+Math.round(Math.random()*100);
  }
  getAllBranch(request?: any): Observable<any> {
    let params = new HttpParams();
    request = {'sort': -1, ...request, 'request_id': this.getRandomNo(), 'validate': 'all'};
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.BRANCH_GET,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  mapGrWithTrip(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request['request_id'] = this.getRandomNo();
    return this.http.post(URL.POST_MAP_GR_WITH_TRIP, request).pipe(
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



  addBranch(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request['request_id'] = this.getRandomNo();
    return this.http.post(URL.POST_BRANCH_ADD, request).pipe(
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

  editBranch(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    // request._id = randomNo;
    return this.http.put(URL.PUT_BRANCH_UPDATE+id, request).pipe(
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

  deleteBranch(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request._id = this.getRandomNo();
    return this.http.post(URL.POST_BRANCH_DISABLE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getAllTrip(request?: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = "all";
    request.summary = true;
    request.isCancelled = false;
    request.dateType = "allocation_date";
    request.__SRC__ = "WEB";
    request.no_of_docs = 10;
    return this.http.post(URL.POST_TRIP_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getTrip(request?: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = "all";
    request.isCancelled = false;
    return this.http.post(URL.POST_TRIP_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  updateTripStatus(id: string,request: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = "all";
    return this.http.put(URL.PUT_TRIP_UPDATE_STATUS+id,request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      })
      ,catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    )
  }

  updateTrip(id: string,request: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = "all";
    return this.http.put(URL.PUT_TRIP_UPDATE+id,request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      })
      ,catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    )
  }

  getAllGrWithOutTrip(request?: any): Observable<any> {
    request = request || {};
    request.request_id= Date.now() + '' + Math.round(Math.random() * 100),
    request.validate= 'all'
    return this.http.post(URL.POST_GR_WITHOUT_TRIP_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }


  getDocuments(request?: any): Observable<any> {
    request = request || {};
    request.request_id= Date.now() + '' + Math.round(Math.random() * 100),
    request.validate= 'all'
    return this.http.post(URL.POST_DOC_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  validateDocument(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_DOC_VALIDATE+id, request).pipe(
      map((res: any) => {
        if(res) {
          this.commonService.success(res.message);
          return res;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  saveDocument(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_DOC_SAVE+id, request).pipe(
      map((res: any) => {
        if(res) {
          this.commonService.success(res.message);
          return res;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  deleteDocument(request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_DOC_REMOVE+request._id, request).pipe(
      map((res: any) => {
        if(res) {
          this.commonService.success(res.message);
          return res;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getBillStationary(request?: any): Observable<any> {
    request = request || {};
    request.request_id= Date.now() + '' + Math.round(Math.random() * 100),
    request.validate= 'all'
    return this.http.post(URL.POST_STATIONARY_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err && err.error && err.error.message);
        return [];
      })
    );
  }

  addGrWithOutTrip(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_GR_WITHOUT_TRIP_CREATE, request).pipe(
      map((res: any) => {
        if(res) {
          this.commonService.success(res.messages);
          return res;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  editGrWithOutTrip(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_GR_WITHOUT_TRIP_UPDATE+id, request).pipe(
      map((res: any) => {
        if(res) {
          this.commonService.success(res.message);
          return res;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  deleteGrWithOutTrip(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request._id = this.getRandomNo();
    return this.http.delete(URL.DELETE_GR_WITHOUT_TRIP_REMOVE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.error_message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.error_message);
        return [];
      })
    );
  }

  getAllBillingParty(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_BILLING_PARTY_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }



  addBillingParty(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_BILLING_PARTY_CREATE, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  editBillingParty(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_BILLING_PARTY_UPDATE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  deleteBillingParty(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request._id = this.getRandomNo();
    return this.http.delete(URL.DELETE_BILLING_PARTY_REMOVE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.error_message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.error_message);
        return [];
      })
    );
  }

  getAllDriver(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_DRIVER_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  downloadDvrReport(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_DRIVER_REPORT_GET, request).pipe(
      map((res: any) => {
        if (res.url) {
          return res.url;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getAllAccount(request?: any): Observable<any> {
    request = request || {};
    request.no_of_docs = 10;
    return this.http.post(URL.POST_ACCOUNT_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }


  addDriver(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_DRIVER_CREATE, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  editDriver(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.PUT_DRIVER_UPDATE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  deleteDriver(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request._id = this.getRandomNo();
    return this.http.post(URL.DELETE_DRIVER_REMOVE+id, request).pipe(
      map((res: any) => {
        if(res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }



  getAllVehicles(request?: any): Observable<any> {
    request = request || {};
    request.no_of_docs = 10;
    // request.deleted = false;
    request.request_id = this.getRandomNo();
    request.validate = 'all';

    return this.http.post(URL.POST_GET_VEHICLE, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getAllVendor(request?: any): Observable<any> {
    request = request || {};
    request.no_of_docs = 20;
    request.deleted = false;
    request.skip = 1;
    request.sort = {name: 1};
    request.request_id = this.getRandomNo();
    request.validate = 'all';

    return this.http.post(URL.POST_VENDER_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  getUsers(request ?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request, 'sort': -1, 'request_id': this.getRandomNo(), 'validate': 'all'};
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.USER_GET,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  //  ******************GET VENDOR TDS RATE****************
  getTDSRate(request?: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = 'all';

    return this.http.post(URL.GET_TDS_RATE, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
  //*****************************

  // trip page Vendordeal
  PutVendordeal(id: string, request?: any): Observable<any> {
    request = request || {};
    return this.http.put(URL.PUT_VENDOR_DEAL + id, request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }


  getSources(request ?: any): Observable<any> {
    request = {...request, 'request_id': this.getRandomNo(), 'validate': 'all'};
    return this.http.post(URL.POST_GET_CITIES, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  createTrip(request ?: any): Observable<any> {
    request = {...request, 'request_id': this.getRandomNo(), 'validate': 'all'};
    return this.http.post(URL.VEHICLE_ALLOCATE, request).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    )
  }

  addEmptyTrip(request? : any) : Observable<any> {
    request = {...request, 'request_id': this.getRandomNo(), 'validate': 'all'};

    return this.http.post(URL.EMPTY_TRIP, request).pipe(
      map((res: any) => {
        if (res) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    )
  }

  getRouteName(request ?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request,'request_id':this.getRandomNo(),'validate': 'all'};
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.GET_TRANSPORTER_ROUTES,{params}).pipe(
      map((res:any)=>{
        if(res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error',err && err.error && err.error.message);
        return [];
      })
    )
  }
  getTripGr(request ?: any): Observable<any> {
    request = request || {};
    request.request_id = this.getRandomNo();
    request.validate = 'all';
    return this.http.post(URL.POST_TRIP_GR_GET, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data && res.data.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    )
  }

  //////////////////// Vehicle related /////////
  getAllVehicle(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
      // request.skip = 1,
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.POST_VEHICLE_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  //get vehicle report

  getAllVehiclereport(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.skip = 1;
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.POST_VEHICLE_REPORT_GET,request).pipe(
      map((res: any) => {
        if(res.url){
          this.commonService.success(res.message);
          return res;
        }else{
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  addvehicle(request?: any): Observable<any> {
    return this.http.post(URL.POST_VEHICLE_ADD, request).pipe(
      map((data: any) => {
        if (data.status === 'OK') {
          this.commonService.success(data.message);
          return true;
        } else {
          this.commonService.error(data.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  editvehicle(id: string, request?: any): Observable<any> {
    request = request || {};
    return this.http.put(URL.PUT_VEHICLE_UPDATE + id, request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }

  deletevehicle(id: string, request?: any): Observable<any> {
    request = request || {};
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    request._id = id;
    request.validate = "all";
    request.deleted = true;
    return this.http.post(URL.POST_VEHICLE_REMOVE + id, request).pipe(
      map((data: any) => {
        if (data.status === 'OK') {
          this.commonService.success(data.message);
          return true;
        } else {
          this.commonService.error(data.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }
  getGroupVehicle(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.get(URL.GET_VEHICLE_GROUP,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  getVehicleType(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.get(URL.GET_VEHICLE_TYPE,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
//  *********************vender related**********************
  getAllvender(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.POST_VENDER_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        }else if (res.url) {
          this.commonService.success(res.message);
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  addvendor(request?: any): Observable<any> {
    return this.http.post(URL.POST_VENDOR_ADD, request).pipe(
      map((data: any) => {
        if (data.status === 'OK') {
          this.commonService.success(data.message);
          return true;
        } else {
          this.commonService.error(data.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  editvendor(id: string, request?: any): Observable<any> {
    request = request || {};
    return this.http.put(URL.PUT_VENDOR_UPDATE+"/"+id+"/"+false,request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }

  deletevendor(id: string, request?: any): Observable<any> {
    request = request || {};
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    request._id = id;
    request.validate = "all";
    request.deleted = true;
    return this.http.delete(URL.DELETE_VENDOR + id, request).pipe(
      map((data: any) => {
        if (data.status === 'OK') {
          this.commonService.success(data.message);
          return true;
        } else {
          this.commonService.error(data.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }
  // getAllVendorreport(request?: any): Observable<any> {
  //   request = request || {};
  //   request.validate = "all";
  //   request.skip = 1;
  //   request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
  //   return this.http.post(URL.POST_VEHICLE_REPORT_GET,request).pipe(
  //     map((res: any) => {
  //       if(res.url){
  //         this.commonService.success(res.message);
  //         return res;
  //       }else{
  //         this.commonService.error(res.message);
  //         return false;
  //       }
  //     }),
  //     catchError(err => {
  //       return [];
  //     })
  //   );
  // }
//***************************************ACCOUNT RELATED*****************
  getAllaccount(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.POST_ACCOUNT_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  getAllMaterial(request?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request, 'sort': -1, 'validate': 'all'};
    request.request_id = this.getRandomNo();
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.MATERIAL_GET,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  getAllBooking(request?: any): Observable<any> {
    request = {...request, 'sort': {$natural: -1}, 'validate': 'all'};
    request.request_id = this.getRandomNo();
    return this.http.post(URL.BOOKING_GET,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  getAllCustomer(request?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request, 'sort': -1, 'validate': 'all'};
    request.request_id = this.getRandomNo();
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.GET_All_CUSTOMER,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  addCustomer(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.CUSTOMER_ADD, request).pipe(
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
  editCustomer(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.CUSTOMER_UPDATE + id, request).pipe(
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


  //GR RELATED
  getAllGr(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    // request.skip = 1,
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.GET_ALL_GR,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  //get consignee amd consignor
  getAllConsignor_Consignee(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_CONSIGNOR_CONSIGNEE, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
/////////////////////////////// get Customer
  getAllCustomers(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_All_CUSTOMER, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
// get route
  getgrroute(request?: any): Observable<any> {
    request = request || {};
    return this.http.get(URL.GET_GR_ROUTE, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
  // get billed source and destionation
  getbilledroute(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.POST_BILLED_ROUTE,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }


  getAllMaterialType(request?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request, 'sort': -1, 'validate': 'all'};
    // request.request_id = this.getRandomNo();
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.MATERIAL_TYPE_GET,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
// cencle gr

  CancelGr(id: string, request?: any): Observable<any> {
    request = request || {};
    request.request_id =this.getRandomNo();
    request.validate = "all";
    request.deleted = true;
    return this.http.put(URL.CANCEL_TRIP_GR +id, request).pipe(
      map((data: any) => {
        if (data.status === 'OK') {
          this.commonService.success(data.message);
          return true;
        } else {
          this.commonService.error(data.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }

  addMaterial(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.MATERIAL_ADD, request).pipe(
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

  addGroupMaterial(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.MATERIAL_GROUP_ADD, request).pipe(
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

  deleteMaterial(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    request.sort = -1,
    request.skip = 1
    return this.http.delete(URL.MATERIAL_DELETE + id, request).pipe(
      map((res: any) => {
        if(res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  deleteGroupMaterial(id:string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    request.sort = -1,
      request.skip = 1
    return this.http.delete(URL.MATERIAL_GROUP_DELETE + id, request).pipe(
      map((res: any) => {
        if(res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
        }
      }),
      catchError ((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }


  editMaterial(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.MATERIAL_EDIT+id, request).pipe(
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
// get configs
  getConfigs(id:any,request?: any): Observable<any> {
    let params = new HttpParams();
    return this.http.get(URL.GET_CONFIGS+ id,{params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }

  editMaterialGroup(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.MATERIAL_GROUP_EDIT+id, request).pipe(
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
//trip memo  RELATED
  getAllTripMemo(request?: any): Observable<any> {
    request = request || {};
    request.validate = "all";
    // request.skip = 1,
    request.request_id =(Date.now() + '' + Math.round(Math.random() * 100));
    return this.http.post(URL.GET_ALL_TRIP_MEMO,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        return [];
      })
    );
  }
  tripmemoupdate(id: string, request?: any): Observable<any> {
    request = request || {};
    return this.http.post(URL.POST_TRIP_MEMO_UPDATE + id, request).pipe(
      map((res: any) => {
        if (res.data) {
          this.commonService.success(res.message);
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.error(err.error.message);
        return [];
      })
    );
  }
  GetCustomerRate(request?: any): Observable<any> {
    request = request || {};
    let params = new HttpParams();
    request.request_id = this.getRandomNo();
    request.validate = 'all';
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.GET_CUSTOMER_RATE_CHART, {params}).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  autosuggestCity(request ?: any): Observable<any> {
     let params = new HttpParams();
       request = {'query' : request.requestObj.query ,'request_id':this.getRandomNo(),'validate': 'all'};
      for(const key in request) {
      params = params.append(key,request[key]);
      }
      return this.http.post(URL.AUTOSUGGESR_CITY,request).pipe(
        map((res:any)=>{
         if(res.data) {
         return res.data;
         } else {
         this.commonService.error(res.message);
         return false;
         }
        }),
       catchError( err => {
         // console.log('ritikaError' + err && err.error && err.error.message);
         this.commonService.errorModal('Error',err && err.error && err.error.message);
         return [];
       })
     )
   }

   getAllTransportRoutes(request ?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request,'request_id':this.getRandomNo(),'validate': 'all'};
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.TRANSPORT_ROUTE_GET,{params}).pipe(
      map((res:any)=>{
        if(res.data) {
          return res.data;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error',err && err.error && err.error.message);
        return [];
      })
    )
  }

  addTransportRoute(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.TRANSPORT_ROUTE_ADD_POST, request).pipe(
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

  editTransportRoute(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.TRANSPORT_ROUTE_UPDATE_PUT+id, request).pipe(
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

  getLocation(request ?: any): Observable<any> {
    let params = new HttpParams();
    request = {...request,'request_id':this.getRandomNo(),'validate': 'all'};
    for(const key in request) {
      params = params.append(key,request[key]);
    }
    return this.http.get(URL.GET_LOCATION_MAPMYINDIA,{params}).pipe(
      map((res:any)=>{
        if(res) {
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError( err => {
        this.commonService.errorModal('Error',err && err.error && err.error.message);
        return [];
      })
    )
  }

  vehicleWise(request ?: any): Observable<any> {
    request.request_id = this.getRandomNo();
    request.no_of_docs = 3000;
    request.skip = 1;
    request.validate = "all";
    request.__SRC__ = "WEB";
    return this.http.post(URL.POST_VEHICLEWISE, request).pipe(
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

  getAlerts(request?: any): Observable<any> {
    request.request_id = this.getRandomNo();
    request.validate = "all";
    return this.http.post(URL.POST_TRIP_ALERTS, request).pipe(
      map((res: any)=>{
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

  getGroupAlerts(request?: any) : Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    // request.selected_uid = this.gpsId;
    this.gpsId = this.store.get('gpsId');
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    // request.sort = {_id: -1};
    request.type_url = 'gps_url';
    return this.http.post(URL.POST_GROUP_ALERTS,request).pipe(
      map((res: any)=> {
        if(res?.data) {
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

  getAllAlerts(request?: any): Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    request.user_id=this.gpsId;
    request.sort = {_id: -1};
    request.type_url = 'gps_url';
    return this.http.post(URL.POST_GET_ALERTS,request).pipe(
      map((res: any)=> {
        if(res) {
          this.commonService.success(res.message);
          return res;
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

  getAllAlarms(request?: any): Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    request.sort = {_id: -1};
    request.type_url = 'trucku';
    request.request = 'get_alarm';
    request.row_count = request.row_count || 15;
    return this.http.post(URL.POST_GET_ALARMS,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.data?.message);
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

  updateAlarm(request?: any): Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    request.type_url = 'trucku';
    request.request = 'update_alarm';
    // request.row_count = request.row_count || 15;
    return this.http.post(URL.POST_UPDATE_ALARM,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.data?.message);
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

  removeAlarm(request?: any): Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    request.type_url = 'trucku';
    request.request = 'remove_alarm';
    // request.row_count = request.row_count || 15;
    return this.http.post(URL.POST_REMOVE_ALARM,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.data?.message);
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

  createAlarm(request?: any): Observable<any> {
    request = request || {};
    // request.authorizationToken = this.gpsgaadi_token;
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_uid = this.gpsId;
    request.type_url = 'trucku';
    request.request = 'create_alarm';
    // request.row_count = request.row_count || 15;
    return this.http.post(URL.POST_CREATE_ALARM,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.data?.message);
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

  AddlandMark(request?: any): Observable<any> {
    request.type_url = 'gps_url';
    this.gpsId = this.store.get('gpsId');
    request.authorizationToken = this.gpsgaadi_token;
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_Add_LANDMARK,request).pipe(
      map((res: any)=> {
        if(res.status== 'OK') {
          this.commonService.success(res.message);
          return res;
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
  getAllLandmark(request?: any): Observable<any> {
    request.type_url = 'gps_url';
    request.validate = "all";
    this.gpsId = this.store.get('gpsId');
    request.authorizationToken = this.gpsgaadi_token;
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_GET_LANDMARK,request).pipe(
      map((res: any)=> {
        if(res.data) {
          // this.commonService.success(res.message);
          return res;
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
  EditlandMark(_id:any,request?: any): Observable<any> {
    request._id = _id;
    request.type_url = 'gps_url';
    this.gpsId = this.store.get('gpsId');
    request.authorizationToken = this.gpsgaadi_token;
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_EDIT_LANDMARK,request).pipe(
      map((res: any)=> {
        if(res.status == 'OK') {
          this.commonService.success(res.message);
          return res;
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
  DeleteLandMark(request?: any): Observable<any> {
    request.type_url = 'gps_url';
    this.gpsId = this.store.get('gpsId');
    request.authorizationToken = this.gpsgaadi_token;
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_DELETE_LANDMARK,request).pipe(
      map((res: any)=> {
        if(res.status == 'OK') {
          this.commonService.success(res.message);
          return res;
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

  getSimBaseData(request?: any): Observable<any> {
    return this.http.post(URL.POST_SIM_BASE_PLAYBACK,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.message);
          return res;
        } else if(res && res.url) {// for download case
          return res;
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

getplayData(request?: any): Observable<any> {
    request.request = 'playback';
    request.version = 2;
    request.type_url = 'trucku';
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_VEHICLE_PLAYBACK,request).pipe(
      map((res: any)=> {
        if(res.data) {
          this.commonService.success(res.message);
          return res;
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

  addDuty(request? : any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.post(URL.DUTY_ADD, request).pipe(
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
  editDuty(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.DUTY_EDIT+id, request).pipe(
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

  //  for geofence

  getGeofence(request?: any): Observable<any> {
    this.gpsId = this.store.get('gpsId');
    request = request || {};
    request.request = "get_geozone",
    request.type_url = 'trucku';
    request.validate = "all";
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
     request.user_id = this.gpsId;
    request.request_id = this.getRandomNo();
    request.row_count = 13,
    request.no_of_docs = 13;
    return this.http.post(URL.POST_GET_GEOZONE,request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
          return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
  DeleteGeofence(request?: any): Observable<any> {
    request.request = "remove_geozone",
    request.type_url = 'trucku';
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_DELETE_GEOZONE,request).pipe(
      map((res: any)=> {
        if(res.status == 'OK') {
          this.commonService.success(res.data.message);
          return res;
        } else {
          this.commonService.error(res.data.message);
          return false;
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  EditGeofence(request?: any): Observable<any> {
    request.request = "update_geozone",
      request.type_url = 'trucku';
    this.gpsId = this.store.get('gpsId');
    request.selected_uid = this.gpsId;
    request.login_uid = this.gpsId;
    request.user_id = this.gpsId;
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_EDIT_GEOZONE,request).pipe(
      map((res: any)=> {
        if(res.status == 'OK') {
          this.commonService.success(res.data.message);
          return res;
        } else {
          this.commonService.error(res.data.message);
          return false;
        }
      }),
      catchError((err) => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  //*************************

  updateTMang(id: string, request?: any) : Observable<any> {
    request = request || {};
    request.validate = 'all';
    request.request_id = this.getRandomNo();
    return this.http.put(URL.TRAFF_MANNG_EDIT+id, request).pipe(
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

  downloadJobRiskyReport(request?: any): Observable<any> {
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_JOBRISKY, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  downloadJobOrderReport(request?: any): Observable<any> {
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_JOBORDER, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }

  downloadJobPowerConnectReport(request?: any): Observable<any> {
    request.validate = "all";
    request.request_id = this.getRandomNo();
    return this.http.post(URL.POST_JOBORDER_POWERCONNECT, request).pipe(
      map((res: any) => {
        if (res.data) {
          return res.data;
        } else if(res && res.url) {// for download case
            return res;
        } else {
          this.commonService.error(res.message);
          return false;
        }
      }),
      catchError(err => {
        this.commonService.errorModal('Error', err && err.error && err.error.message);
        return [];
      })
    );
  }
}
