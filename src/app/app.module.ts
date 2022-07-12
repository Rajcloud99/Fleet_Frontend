import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './login/login.component';
import {InterceptorService} from "./services/interceptor.service";
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import {NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { DatePipe, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DefaultComponent } from './layout/default/default.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import {HeaderComponent} from './shared/components/header/header.component';
import { BranchComponent } from './modules/branch/branch.component';
import { BranchListViewComponent } from './modules/branch/branch-list-view/branch-list-view.component';
import { BranchDetailViewComponent } from './modules/branch/branch-detail-view/branch-detail-view.component';
import { BranchUpsertComponent } from './modules/branch/branch-upsert/branch-upsert.component';
import { DriverComponent } from './modules/driver/driver.component';
import { DriverUpsertComponent } from './modules/driver/driver-upsert/driver-upsert.component';
import { DriverListViewComponent } from './modules/driver/driver-list-view/driver-list-view.component';
import { DriverDetailViewComponent } from './modules/driver/driver-detail-view/driver-detail-view.component';
import { StorageService } from './services/storage.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VehicleComponent } from './modules/vehicle/vehicle.component';
import { VehicleListViewComponent } from './modules/vehicle/vehicle-list-view/vehicle-list-view.component';
import { VehicleUpsertComponent } from './modules/vehicle/vehicle-upsert/vehicle-upsert.component';
import { VehicleDetailViewComponent } from './modules/vehicle/vehicle-detail-view/vehicle-detail-view.component';
import { CreateTripComponent } from './modules/create-trip/create-trip.component';
import { BillingPartyComponent } from './modules/billing-party/billing-party.component';
import { BillingPartyListViewComponent } from './modules/billing-party/billing-party-list-view/billing-party-list-view.component';
import { BillingPartyUpsertComponent } from './modules/billing-party/billing-party-upsert/billing-party-upsert.component';
import { BillingPartyDetailViewComponent } from './modules/billing-party/billing-party-detail-view/billing-party-detail-view.component';
import { AddGrPopupComponent } from './modules/add-gr-popup/add-gr-popup.component';
import { GrWithoutTripComponent } from './modules/gr-without-trip/gr-without-trip.component';
import { GrWithoutTripListViewComponent } from './modules/gr-without-trip/gr-without-trip-list-view/gr-without-trip-list-view.component';
import { GrWithoutTripUpsertComponent } from './modules/gr-without-trip/gr-without-trip-upsert/gr-without-trip-upsert.component';
import { MaterialComponent } from './modules/material/material.component';
import { MaterialListViewComponent } from './modules/material/material-list-view/material-list-view.component';
import { MaterialUpsertComponent } from './modules/material/material-upsert/material-upsert.component';
import {GrUpsertComponent} from "./modules/gr/gr-upsert/gr-upsert.component";
import {GrListViewComponent} from "./modules/gr/gr-list-view/gr-list-view.component";
import {GrComponent} from "./modules/gr/gr.component";
import {CommonPipsModule} from "./shared/commonPips.module";
import {MaterialGroupListViewComponent} from "./modules/material-group/material-group-list-view/material-group-list-view.component";
import { MaterialGroupUpsertComponent } from './modules/material-group/material-group-upsert/material-group-upsert.component';
import {VendorUpsertComponent} from "./modules/vendor/vendor-upsert/vendor-upsert.component";
import {VendorListViewComponent} from "./modules/vendor/vendor-list-view/vendor-list-view.component";
import { VendorComponent } from './modules/vendor/vendor.component';
import { TripListViewComponent } from './modules/trip/trip-list-view/trip-list-view.component';
import { MaterialCardDetailViewComponent } from './modules/material/material-card-detail-view/material-card-detail-view.component';
import { BackButtonComponent } from './shared/components/back-button/back-button.component';
import { TripDetailViewComponent } from './modules/trip/trip-detail-view/trip-detail-view.component';
import { AddInvoicePopupComponent } from './modules/add-invoice-popup/add-invoice-popup.component';
import { AddrSearchDirective } from './addr-search.directive';
import { VendordealPopupComponent } from './modules/vendordeal-popup/vendordeal-popup.component';
import { EmptyTripComponent } from './modules/trip/empty-trip/empty-trip.component';
import { TripMemoComponent } from './modules/trip-memo/trip-memo.component';
import { TripMemoListViewComponent } from './modules/trip-memo/trip-memo-list-view/trip-memo-list-view.component';
import { TripMemoUpsertComponent } from './modules/trip-memo/trip-memo-upsert/trip-memo-upsert.component';
import { TransportRouteComponent } from './modules/transport-route/transport-route.component';
import { TransportRouteListViewComponent } from './modules/transport-route/transport-route-list-view/transport-route-list-view.component';
import { TransportRouteUpsertComponent } from './modules/transport-route/transport-route-upsert/transport-route-upsert.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { CustomerListViewComponent } from './modules/customer/customer-list-view/customer-list-view.component';
import { CustomerUpsertComponent } from './modules/customer/customer-upsert/customer-upsert.component';
import { MapComponent } from './modules/map/map.component';
import { AgmCoreModule } from '@agm/core';
import { AgmMarkerClustererModule } from '@agm/markerclusterer';
import { LiveTrackComponent } from './modules/live-track/live-track.component';
import { SocketIoConfig, SocketIoModule } from "ngx-socket-io";
import { environment } from 'src/environments/environment';
import { WebsocketService } from './services/websocket.service';
import { NgZorroAntdMobileModule } from "ng-zorro-antd-mobile";
import {SharedComponentModule} from "./shared/shared-component.module";
import { DutyComponent } from './modules/duty/duty.component';
import { DutyListViewComponent } from './modules/duty/duty-list-view/duty-list-view.component';
import { TripListComponent } from './modules/trip-details/trip-list/trip-list.component';
import { TripDetailsComponent } from './modules/trip-details/trip-details/trip-details.component';
import { TripGpsComponent } from './modules/trip-gps/trip-gps.component';
import { NvD3Module } from 'ng2-nvd3';

import 'd3';
import 'nvd3';
import { MapListViewComponent } from './modules/map/map-list-view/map-list-view.component';
import { PlaybackComponent } from './modules/trip-details/playback/playback.component';
import { ItineraryComponent } from './modules/trip-details/itinerary/itinerary.component';
import { AnalyticsComponent } from './modules/trip-details/analytics/analytics.component';
import { UploadComponent } from './modules/trip-details/upload/upload.component';
import { DutyUpsertComponent } from './modules/duty/duty-upsert/duty-upsert.component';
import { LandmarkComponent } from './modules/landmark/landmark.component';
import { LandmarkListViewComponent } from './modules/landmark/landmark-list-view/landmark-list-view.component';
import { LandmarkUpsertComponent } from './modules/landmark/landmark-upsert/landmark-upsert.component';
import { PlaybackFormComponent } from './modules/playback-form/playback-form.component';
import { CommonService } from './services/common.service';
import { TrafficManagerComponent } from './modules/duty/traffic-manager/traffic-manager.component';
import { AlertListComponent} from './modules/trip-details/alert-list/alert-list.component';
import { AlertsListViewComponent } from './modules/alerts/alerts-list-view/alerts-list-view.component';
import { PlaybackListComponent } from './modules/trip-details/playback/playback-list/playback-list.component';
import { GeofenceComponent } from './modules/geofence/geofence.component';
import { GeofenceListViewComponent } from './modules/geofence/geofence-list-view/geofence-list-view.component';
import { GeofenceUpsertComponent } from './modules/geofence/geofence-upsert/geofence-upsert.component';
import { AlarmComponent } from './modules/alarm/alarm.component';
import { AlarmListViewComponent } from './modules/alarm/alarm-list-view/alarm-list-view.component';
import { AlarmUpsertComponent } from './modules/alarm/alarm-upsert/alarm-upsert.component';

const config: SocketIoConfig = { url: environment.ws, options: {} };
registerLocaleData(en);



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SidebarComponent,
    DefaultComponent,
    FooterComponent,
    HeaderComponent,
    BranchComponent,
    BranchListViewComponent,
    BranchDetailViewComponent,
    BranchUpsertComponent,
    DriverComponent,
    DriverUpsertComponent,
    DriverListViewComponent,
    DriverDetailViewComponent,
    CreateTripComponent,
    BillingPartyComponent,
    BillingPartyListViewComponent,
    BillingPartyUpsertComponent,
    BillingPartyDetailViewComponent,
    AddGrPopupComponent,
    VehicleComponent,
    VehicleListViewComponent,
    VehicleUpsertComponent,
    VehicleDetailViewComponent,
    GrUpsertComponent,
    GrListViewComponent,
    AddInvoicePopupComponent,
    GrComponent,
    GrWithoutTripComponent,
    GrWithoutTripListViewComponent,
    GrWithoutTripUpsertComponent,
    MaterialComponent,
    MaterialListViewComponent,
    MaterialUpsertComponent,
    MaterialGroupListViewComponent,
    MaterialGroupUpsertComponent,
    VendorComponent,
    VendorListViewComponent,
    VendorUpsertComponent,
    TripListViewComponent,
    MaterialCardDetailViewComponent,
    TripListViewComponent,
    TripDetailViewComponent,
    BackButtonComponent,
    AddInvoicePopupComponent,
    AddrSearchDirective,
    VendordealPopupComponent,
    EmptyTripComponent,
    VendordealPopupComponent,
    TripMemoComponent,
    TripMemoListViewComponent,
    TripMemoUpsertComponent,
    TransportRouteComponent,
    TransportRouteListViewComponent,
    TransportRouteUpsertComponent,
    CustomerComponent,
    CustomerListViewComponent,
    CustomerUpsertComponent,
    MapComponent,
    LiveTrackComponent,
    DutyComponent,
    DutyListViewComponent,
    TripListComponent,
    TripDetailsComponent,
    TripGpsComponent,
    MapListViewComponent,
    PlaybackComponent,
    ItineraryComponent,
    AnalyticsComponent,
    UploadComponent,
    DutyUpsertComponent,
    UploadComponent,
    PlaybackFormComponent,
    UploadComponent,
    LandmarkComponent,
    LandmarkListViewComponent,
    LandmarkUpsertComponent,
    TrafficManagerComponent,
    AlertsListViewComponent,
    AlertListComponent,
    PlaybackListComponent,
    GeofenceComponent,
    GeofenceListViewComponent,
    GeofenceUpsertComponent,
    GeofenceListViewComponent,
    AlarmComponent,
    AlarmListViewComponent,
    AlarmUpsertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    CommonPipsModule,
    SharedComponentModule,
    NvD3Module,
    NgZorroAntdMobileModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAluwUWvBhUcZtAcFzTIo0H5ukdacPoFhQ'
    }),
    AgmMarkerClustererModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [
    DatePipe,
    StorageService,
    CommonService,
    WebsocketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
