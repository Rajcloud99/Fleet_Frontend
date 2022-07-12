import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './login/login.component';
import { DriverDetailViewComponent } from './modules/driver/driver-detail-view/driver-detail-view.component';
import { DriverListViewComponent } from './modules/driver/driver-list-view/driver-list-view.component';
import { DriverUpsertComponent } from './modules/driver/driver-upsert/driver-upsert.component';
import { BranchDetailViewComponent } from './modules/branch/branch-detail-view/branch-detail-view.component';
import { BranchListViewComponent } from './modules/branch/branch-list-view/branch-list-view.component';
import { BranchUpsertComponent } from './modules/branch/branch-upsert/branch-upsert.component';
import { CreateTripComponent } from './modules/create-trip/create-trip.component';
import { BillingPartyListViewComponent } from './modules/billing-party/billing-party-list-view/billing-party-list-view.component';
import { BillingPartyUpsertComponent } from './modules/billing-party/billing-party-upsert/billing-party-upsert.component';
import { BillingPartyDetailViewComponent } from './modules/billing-party/billing-party-detail-view/billing-party-detail-view.component';
import {VehicleListViewComponent} from "./modules/vehicle/vehicle-list-view/vehicle-list-view.component";
import {VehicleDetailViewComponent} from "./modules/vehicle/vehicle-detail-view/vehicle-detail-view.component";
import {VehicleUpsertComponent} from "./modules/vehicle/vehicle-upsert/vehicle-upsert.component";
import { GrWithoutTripListViewComponent } from './modules/gr-without-trip/gr-without-trip-list-view/gr-without-trip-list-view.component';
import { GrWithoutTripUpsertComponent } from './modules/gr-without-trip/gr-without-trip-upsert/gr-without-trip-upsert.component';
import { MaterialListViewComponent } from "./modules/material/material-list-view/material-list-view.component";
import { MaterialUpsertComponent } from './modules/material/material-upsert/material-upsert.component';
import {GrListViewComponent} from "./modules/gr/gr-list-view/gr-list-view.component";
import {GrUpsertComponent} from "./modules/gr/gr-upsert/gr-upsert.component";
import {VendorListViewComponent} from "./modules/vendor/vendor-list-view/vendor-list-view.component";
import {VendorUpsertComponent} from "./modules/vendor/vendor-upsert/vendor-upsert.component";
// import {MaterialGroupListViewComponent} from "./modules/material-group/material-group-list-view/material-group-list-view.component";
import {MaterialGroupUpsertComponent} from "./modules/material-group/material-group-upsert/material-group-upsert.component";
import { TripListViewComponent } from './modules/trip/trip-list-view/trip-list-view.component';
import {MaterialGroupListViewComponent} from "./modules/material-group/material-group-list-view/material-group-list-view.component";
import {MaterialCardDetailViewComponent} from "./modules/material/material-card-detail-view/material-card-detail-view.component";
import { TripDetailViewComponent } from './modules/trip/trip-detail-view/trip-detail-view.component';
import {EmptyTripComponent} from "./modules/trip/empty-trip/empty-trip.component";
import {TripMemoListViewComponent} from "./modules/trip-memo/trip-memo-list-view/trip-memo-list-view.component";
import {TripMemoUpsertComponent} from "./modules/trip-memo/trip-memo-upsert/trip-memo-upsert.component";
import { TransportRouteComponent } from './modules/transport-route/transport-route.component';
import { TransportRouteListViewComponent } from './modules/transport-route/transport-route-list-view/transport-route-list-view.component';
import { TransportRouteUpsertComponent } from './modules/transport-route/transport-route-upsert/transport-route-upsert.component';
import {CustomerComponent} from "./modules/customer/customer.component";
import {CustomerListViewComponent} from "./modules/customer/customer-list-view/customer-list-view.component";
import {CustomerUpsertComponent} from "./modules/customer/customer-upsert/customer-upsert.component";
import { MapComponent } from './modules/map/map.component';
import { LiveTrackComponent } from './modules/live-track/live-track.component';
import {DutyListViewComponent} from './modules/duty/duty-list-view/duty-list-view.component';
import {DutyUpsertComponent} from  './modules/duty/duty-upsert/duty-upsert.component';
import  {TrafficManagerComponent} from  './modules/duty/traffic-manager/traffic-manager.component';
import { TripListComponent } from './modules/trip-details/trip-list/trip-list.component';
import { TripDetailsComponent } from './modules/trip-details/trip-details/trip-details.component';
import { TripGpsComponent } from './modules/trip-gps/trip-gps.component';
import { MapListViewComponent } from './modules/map/map-list-view/map-list-view.component';
import { PlaybackComponent } from './modules/trip-details/playback/playback.component';
import {ItineraryComponent} from "./modules/trip-details/itinerary/itinerary.component";
import { AnalyticsComponent } from './modules/trip-details/analytics/analytics.component';
import { UploadComponent } from './modules/trip-details/upload/upload.component';
import { PlaybackFormComponent } from './modules/playback-form/playback-form.component';
import {LandmarkUpsertComponent} from "./modules/landmark/landmark-upsert/landmark-upsert.component";
import {LandmarkListViewComponent} from "./modules/landmark/landmark-list-view/landmark-list-view.component";
import { AlertsListViewComponent } from './modules/alerts/alerts-list-view/alerts-list-view.component';
import { PlaybackListComponent } from './modules/trip-details/playback/playback-list/playback-list.component';
import { AlertListComponent } from './modules/trip-details/alert-list/alert-list.component';
import {GeofenceListViewComponent} from "./modules/geofence/geofence-list-view/geofence-list-view.component";
import {GeofenceUpsertComponent} from "./modules/geofence/geofence-upsert/geofence-upsert.component";
import { AlarmListViewComponent } from './modules/alarm/alarm-list-view/alarm-list-view.component';
import { AlarmUpsertComponent } from './modules/alarm/alarm-upsert/alarm-upsert.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DefaultComponent,
    canActivate: [],
    children: [{
      path:'',
      component: HomeComponent
    },
    {
      path: 'master/branch',
      component: BranchListViewComponent
    }, {
      path: 'master/branch/view',
      component: BranchDetailViewComponent
    }, {
      path: 'master/branch/view/:_id',
      component: BranchDetailViewComponent
    }, {
      path: 'master/branch/upsert/:_id',
      component: BranchUpsertComponent
    }, {
      path: 'master/branchUpsert',
      component: BranchUpsertComponent
    },
    {
      path: 'master/billingParty',
      component: BillingPartyListViewComponent
    }, {
      path: 'master/billingParty/view',
      component: BillingPartyDetailViewComponent
    }, {
      path: 'master/billingParty/view/:_id',
      component: BillingPartyDetailViewComponent
    }, {
      path: 'master/billingParty/upsert/:_id',
      component: BillingPartyUpsertComponent
    }, {
      path: 'master/billingPartyUpsert',
      component: BillingPartyUpsertComponent
    },
      {
        path: 'master/driver',
        component: DriverListViewComponent
      }, {
        path: 'master/driver/view',
        component: DriverDetailViewComponent
      }, {
        path: 'master/driver/view/:_id',
        component: DriverDetailViewComponent
      }, {
        path: 'master/driver/upsert/:_id',
        component: DriverUpsertComponent
      }, {
        path: 'master/driverUpsert',
        component: DriverUpsertComponent
      },

      {
        path: 'master/vehicle',
        component:VehicleListViewComponent
      },
      {
        path: 'master/vehicle/view',
        component: VehicleDetailViewComponent
      },
      {
        path: 'master/vehicle/view/:_id',
        component: VehicleDetailViewComponent
      },
      {
        path: 'master/vehicleUpsert',
        component: VehicleUpsertComponent
      },
      {
        path: 'master/vehicle/upsert/:_id',
        component: VehicleUpsertComponent
      },
      {
        path: 'master/vendor',
        component:VendorListViewComponent
      },
      {
        path: 'master/vendorUpsert',
        component: VendorUpsertComponent
      },
      {
        path: 'master/vendor/upsert/:_id',
        component: VendorUpsertComponent
      },
      {
        path: 'master/transportRoute',
        component:TransportRouteListViewComponent
      },
      {
        path: 'master/transportRouteUpsert',
        component: TransportRouteUpsertComponent
      },
      {
        path: 'master/transportRoute/upsert/:_id',
        component: TransportRouteUpsertComponent
      },
      {
        path: 'master/customer',
        component: CustomerListViewComponent
      },
      {
        path: 'master/customer/view',
        component: CustomerListViewComponent
      },
      {
        path: 'master/customer/add',
        component: CustomerUpsertComponent
      },
      {
        path: 'master/customer/upsert/:_id',
        component: CustomerUpsertComponent
      },


      // Operations
      {
        path: 'operation/createTrip',
        component: CreateTripComponent
    },
      {
        path: 'operation/duty',
        component: DutyListViewComponent
      },
      {
        path: 'operation/duty/dutyUpsert',
        component: DutyUpsertComponent
      },
      {
        path: 'operation/duty/dutyUpsert/:_id',
        component: DutyUpsertComponent
      },
      {
        path : 'operation/duty/trafficManager',
        component :TrafficManagerComponent
      },
      {
        path: 'operation/tripDetails',
        component: TripListComponent
      },
      {
        path: 'operation/tripDetails/view/:_id',
        component: TripDetailsComponent
      },
      {
        path: 'operation/tripDetails/playback',
        component: PlaybackComponent
      },
      {
        path: 'operation/tripDetails/itinerary',
        component: ItineraryComponent
      },
      {
        path: 'operation/tripDetails/analytics',
        component: AnalyticsComponent
      },
      {
        path: 'operation/tripDetails/upload',
        component: UploadComponent
      },
    {
      path: 'operation/trip',
      component: TripListViewComponent
    },
      {
        path: 'operation/trip/emptyTrip/:_id',
        component: EmptyTripComponent
      },
    {
      path: 'operation/trip/:_id',
      component: TripListViewComponent
    },
    {
      path: 'operation/trip/view/:_id',
      component: TripDetailViewComponent
    },
    {
      path: 'operation/grWithOutTrip',
      component: GrWithoutTripListViewComponent
    }, {
      path: 'operation/grWithOutTrip/upsert/:_id',
      component: GrWithoutTripUpsertComponent
    }, {
      path: 'operation/grWithOutTripUpsert',
      component: GrWithoutTripUpsertComponent
    },
      {
        path: 'operation/gr',
        component:GrListViewComponent
      },
      {
        path: 'operation/grUpsert',
        component: GrUpsertComponent
      },
      {
        path: 'operation/gr/Upsert/:mode',
        component: GrUpsertComponent
      },
      //for trip memo
      {
        path: 'operation/trip-memo',
        component:TripMemoListViewComponent
      },
      {
        path: 'operation/trip-memo/Upsert/:mode',
        component: TripMemoUpsertComponent
      },
      {
        path: 'operation/tripGPS',
        component: TripGpsComponent
      },


      {
        path: 'master/material',
        component: MaterialListViewComponent
      },
      {
        path: 'master/material/upsert',
        component: MaterialUpsertComponent
      },
      {
        path: 'master/material/upsert/:_id',
        component: MaterialUpsertComponent
      },
      {
        path: 'master/materialGroup',
        component: MaterialGroupListViewComponent
      },
      {
        path: 'master/materialGroup/upsert',
        component: MaterialGroupUpsertComponent
      },
      {
        path: 'master/materialGroup/upsert/:_id',
        component: MaterialGroupUpsertComponent
      },
      {
        path: 'master/material/card/:_id',
        component: MaterialCardDetailViewComponent
      },
      {
        path: 'tracking/mapListView',
        component: MapListViewComponent
      },
      {
        path: 'tracking/mapView',
        component: MapComponent
      },
      {
        path: 'tracking/landmark',
        component:LandmarkListViewComponent
      },
      {
        path: 'tracking/landmark/Upsert/:mode',
        component: LandmarkUpsertComponent
      },
      {
        path: 'tracking/geofence',
        component:GeofenceListViewComponent
      },
      {
        path: 'tracking/geofence/Upsert/:mode',
        component: GeofenceUpsertComponent
      },
      {
        path: 'tracking/mapView/liveTrack/:_id',
        component: LiveTrackComponent
      },
      {
        path: 'tracking/playbackForm',
        component: PlaybackFormComponent
      },
      {
        path: 'tracking/analytics',
        component: AnalyticsComponent
      },
      {
        path: 'tracking/alert-list-view',
        component: AlertsListViewComponent
      },
      {
             path: 'operation/playback-list',
       component: PlaybackListComponent
},
      {
        path: 'tracking/analytics',
        component: AnalyticsComponent
      },
      {
        path: 'operation/alert-list',
        component: AlertListComponent
      },
      {
        path: 'tracking/alarm',
        component:AlarmListViewComponent
      },
      {
        path: 'tracking/alarm/upsert/:_id',
        component: AlarmUpsertComponent
      }, 
      {
        path: 'tracking/alarmUpsert',
        component: AlarmUpsertComponent
      }
      ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
