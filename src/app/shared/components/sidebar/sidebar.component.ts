import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  innerWidth!: number;
  isCollapsed = true;
  visible = false;
  getObj:any;
  roles: any;
  imageUrl = '../../../../assets/user.png';
  userName: string = '';
  clinetName:string='';
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private router: Router,
    private storageServ: StorageService) {
    this.getObj = [
      {
          "_id": "5f61f63dd474bf0c535a48db",
          "id": 1,
          "value": "Masters",
          "title": "Masters",
          "path": "master",
          "icon": "./assets/master.png",
          "isSelected": true,
          "isMainSelected": true,
          "disable": true,
          "children": [
              {
                  "_id": "5f61f63dd474bf0c535a48dc",
                  "id": 1,
                  "parent_id": "1",
                  "label": "branchGet",
                  "value": "Branch",
                  "title": "Branch",
                  "path": "branch",
                  "isSelected": true,
                  "disable": true
              },
              {
                  "_id": "5f61f63dd474bf0c535a48dd",
                  "id": 2,
                  "parent_id": "1",
                  "title": "Branch",
                  "label": "branchAdd",
                  "value": "Branch Add",
                  "isSelected": true,
                  "disable": true
              },
              {
                  "_id": "5f61f63dd474bf0c535a48de",
                  "id": 3,
                  "parent_id": "1",
                  "title": "Branch",
                  "label": "branchUpdate",
                  "value": "Branch Update",
                  "isSelected": true,
                  "disable": true
              },
              {
                  "_id": "5f61f63dd474bf0c535a48df",
                  "id": 4,
                  "parent_id": "1",
                  "title": "Branch",
                  "label": "branchView",
                  "value": "Branch View",
                  "isSelected": true,
                  "disable": true
              },
              {
                  "_id": "5f61f63dd474bf0c535a48e0",
                  "id": 5,
                  "parent_id": "1",
                  "title": "Branch",
                  "label": "branchDelete",
                  "value": "Branch Delete",
                  "isSelected": true,
                  "disable": true
              },
            {
              "_id": "5f61f63dd474bf0c535a48dc",
              "id": 1,
              "parent_id": "1",
              "label": "customerGet",
              "value": "Customer",
              "title": "Customer",
              "path": "customer",
              "isSelected": true,
              "disable": true
            },
              {
                "_id": "5f61f63dd474bf0c535a48dc",
                "id": 1,
                "parent_id": "1",
                "label": "driverGet",
                "value": "Driver",
                "title": "Driver",
                "path": "driver",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48dd",
                "id": 2,
                "parent_id": "1",
                "title": "Driver",
                "label": "driverAdd",
                "value": "Driver Add",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48de",
                "id": 3,
                "parent_id": "1",
                "title": "Driver",
                "label": "driverUpdate",
                "value": "Driver Update",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48df",
                "id": 4,
                "parent_id": "1",
                "title": "Driver",
                "label": "driverView",
                "value": "Driver View",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48e0",
                "id": 5,
                "parent_id": "1",
                "title": "Driver",
                "label": "driverDelete",
                "value": "Driver Delete",
                "isSelected": true,
                "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e1",
              "id": 1,
              "parent_id": "1",
              "label": "vehicleGet",
              "value": "Vehicle",
              "title": "Vehicle",
              "path": "vehicle",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e2",
              "id": 2,
              "parent_id": "1",
              "title": "Vehicle",
              "label": "vehicleAdd",
              "value": "Vehicle Add",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e3",
              "id": 3,
              "parent_id": "1",
              "title": "Vehicle",
              "label": "vehicleUpdate",
              "value": "Vehicle Update",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e4",
              "id": 4,
              "parent_id": "1",
              "title": "Vehicle",
              "label": "vehicleView",
              "value": "Vehicle View",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e5",
              "id": 5,
              "parent_id": "1",
              "title": "Vehicle",
              "label": "vehicleDelete",
              "value": "Vehicle Delete",
              "isSelected": true,
              "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48dc",
                "id": 1,
                "parent_id": "1",
                "label": "billingPartyGet",
                "value": "Billing Party",
                "title": "Billing Party",
                "path": "billingParty",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48dd",
                "id": 2,
                "parent_id": "1",
                "title": "Billing Party",
                "label": "billingPartyAdd",
                "value": "Billing Party Add",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48de",
                "id": 3,
                "parent_id": "1",
                "title": "Billing Party",
                "label": "billingPartyUpdate",
                "value": "Billing Party Update",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48df",
                "id": 4,
                "parent_id": "1",
                "title": "Billing Party",
                "label": "billingPartyView",
                "value": "Billing Party View",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48e0",
                "id": 5,
                "parent_id": "1",
                "title": "Billing Party",
                "label": "billingPartyDelete",
                "value": "Billing Party Delete",
                "isSelected": true,
                "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e11",
              "id": 1,
              "parent_id": "1",
              "label": "vendorGet",
              "value": "Vendor",
              "title": "Vendor",
              "path": "vendor",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e21",
              "id": 2,
              "parent_id": "1",
              "title": "Vendor",
              "label": "vendorAdd",
              "value": "Vendor Add",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e31",
              "id": 3,
              "parent_id": "1",
              "title": "Vendor",
              "label": "vendorUpdate",
              "value": "Vendor Update",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48e51",
              "id": 5,
              "parent_id": "1",
              "title": "Vendor",
              "label": "vendorDelete",
              "value": "Vendor Delete",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48dc",
              "id": 1,
              "parent_id": "1",
              "label": "materialGet",
              "value": "Material",
              "title": "Material Type",
              "path": "material",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48dc",
              "id": 7,
              "parent_id": "1",
              "label": "materialGroupGet",
              "value": "Material",
              "title": "Material Group",
              "path": "materialGroup",
              "isSelected": true,
              "disable": true
            },

            {
              "_id": "5f61f63dd474bf0c535a48dc",
              "id": 1,
              "parent_id": "1",
              "label": "transport-routeGet",
              "value": "Transport Route",
              "title": "Transport Route",
              "path": "transportRoute",
              "isSelected": true,
              "disable": true
          },
          {
              "_id": "5f61f63dd474bf0c535a48dd",
              "id": 2,
              "parent_id": "1",
              "title": "Transport Route",
              "label": "transport-routeAdd",
              "value": "Transport Route Add",
              "isSelected": true,
              "disable": true
          },
          {
              "_id": "5f61f63dd474bf0c535a48de",
              "id": 3,
              "parent_id": "1",
              "title": "Transport Route",
              "label": "transport-routeUpdate",
              "value": "Transport Route Update",
              "isSelected": true,
              "disable": true
          },
          ]
      },
      {
          "_id": "5f61f63dd474bf0c535a4904",
          "id": 2,
          "value": "Operation",
          "title": "Operation",
          "path": "operation",
          "icon": "./assets/operation.png",
          "isSelected": true,
          "isMainSelected": true,
          "disable": true,
          "children": [
              {
                  "_id": "5fd0b3a86b709d32b4665cd9",
                  "id": 1,
                  "parent_id": "1",
                  "label": "Create Trip",
                  "value": "Vehicle Allocation",
                  "title": "Create Trip",
                  "path": "createTrip",
                  "isSelected": true,
                  "disable": false
              },
            {
              "_id": "5fd0b3a86b709d32b4665cd4",
              "id": 10,
              "parent_id": "2",
              "label": "Duty",
              "value": "Duty",
              "title": "Duty",
              "path": "duty",
              "isSelected": true,
              "disable": false
            },
            {
              "_id": "5fd0b3a86b709d32b4665cd8",
                 "id": 1,
                      "parent_id": "1",
                      "label": "Trip",
                      "value": "Trip",
                      "title": "Trip",
                      "path": "trip",
                      "isSelected": true,
                      "disable": false
                 },
            {
              "_id": "5fd0b3a86b709d32b4665fd8",
              "id": 1,
              "parent_id": "1",
              "label": "Trip GPS Details",
              "value": "Trip GPS Details",
              "title": "Trip GPS Details",
              "path": "tripDetails",
              "isSelected": true,
              "disable": false
            },
              {
                "_id": "5fd0b3a86b709d32b4765cd8",
                "id": 1,
                "parent_id": "1",
                "label": "Create Trip GPS",
                "value": "Trip GPS",
                "title": "Create Trip GPS",
                "path": "tripGPS",
                "isSelected": true,
                "disable": false
              },
            // {
            //   "_id": "5f61f63dd474bf0c535a4908",
            //   "id": 1,
            //   "parent_id": "1",
            //   "label": "Create GR",
            //   "value": "Create GR",
            //   "title": "Create GR",
            //   "path": "createGr",
            //   "isSelected": true,
            //   "disable": true
            // },
              // {
              //     "_id": "5f61f63dd474bf0c535a4905",
              //     "id": 1,
              //     "parent_id": "1",
              //     "label": "trip advance",
              //     "value": "Trip Advance",
              //     "title": "Trip Advance",
              //     "path": "trip advance",
              //     "isSelected": true,
              //     "disable": true
              // },
            {
              "_id": "5f61f63dd474bf0c535a49058",
              "id": 1,
              "parent_id": "1",
              "label": "Trip Memo",
              "value": "Trip Memo",
              "title": "Trip Memo",
              "path": "trip-memo",
              "isSelected": true,
              "disable": false
            },
            {
              "_id": "5f61f63dd474bf0c535a48e321",
              "id": 3,
              "parent_id": "1",
              "title": "Trip-Memo",
              "label": "Trip-MemoUpdate",
              "value": "Trip Memo Update",
              "isSelected": true,
              "disable": false
            },
            {
              "_id": "5f61f63dd474bf0c535b38058",
              "id": 1,
              "parent_id": "1",
              "label": "Broker Memo",
              "value": "Broker Memo",
              "title": "Broker Memo",
              "path": "broker-memo",
              "isSelected": true,
              "disable": false
            },
              {
                "_id": "5f61f63dd474bf0c535a48d1",
                "id": 1,
                "parent_id": "1",
                "label": "grWithOutTripGet",
                "value": "GR WithOut Trip",
                "title": "Gr Without Trip",
                "path": "grWithOutTrip",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48d2",
                "id": 2,
                "parent_id": "1",
                "title": "Gr Without Trip",
                "label": "grWithOutTripAdd",
                "value": "Gr Without Trip Add",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48d3",
                "id": 3,
                "parent_id": "1",
                "title": "Gr Without Trip",
                "label": "grWithOutTripUpdate",
                "value": "Gr Without Trip Update",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48d4",
                "id": 4,
                "parent_id": "1",
                "title": "Gr Without Trip",
                "label": "grWithOutTripView",
                "value": "Gr Without Trip View",
                "isSelected": true,
                "disable": true
            },
            {
                "_id": "5f61f63dd474bf0c535a48e5",
                "id": 5,
                "parent_id": "1",
                "title": "Gr Without Trip",
                "label": "grWithOutTripDelete",
                "value": "Gr Without Trip Delete",
                "isSelected": true,
                "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48g1",
              "id": 1,
              "parent_id": "1",
              "label": "GrGet",
              "value": "GR",
              "title": "Gr",
              "path": "gr",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48g2",
              "id": 2,
              "parent_id": "1",
              "title": "Gr",
              "label": "grAdd",
              "value": "GrAdd",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48g3",
              "id": 3,
              "parent_id": "1",
              "title": "Gr",
              "label": "grUpdate",
              "value": "Gr Update",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48g4",
              "id": 4,
              "parent_id": "1",
              "title": "Gr",
              "label": "grView",
              "value": "GR Read",
              "isSelected": true,
              "disable": true
            },
            {
              "_id": "5f61f63dd474bf0c535a48g5",
              "id": 5,
              "parent_id": "1",
              "title": "Gr",
              "label": "grDelete",
              "value": "Gr Delete",
              "isSelected": true,
              "disable": true
            },
          ]
      },
      {
        "_id": "5f61f63dd474bf0c535a4934",
        "id": 2,
        "value": "Tracking",
        "title": "Tracking",
        "path": "tracking",
        "icon": "./assets/operation.png",
        "isSelected": true,
        "isMainSelected": true,
        "disable": true,
        "children": [
          {
            "_id": "5f60f63dd474bg1c535a48dt",
                  "id": 1,
                  "parent_id": "1",
                  "label": "alarmGet",
                  "value": "Alert",
                  "title": "Alarm",
                  "path": "alarm",
                  "isSelected": true,
                  "disable": true
          },{
            "_id": "5f61f63ud474bf0c535a48dd",
            "id": 2,
            "parent_id": "1",
            "title": "Alarm",
            "label": "alarmAdd",
            "value": "Alarm Add",
            "isSelected": true,
            "disable": true
        },
        {
          "_id": "5f61f63dd434bf0c535a48de",
          "id": 3,
          "parent_id": "1",
          "title": "Alarm",
          "label": "alarmUpdate",
          "value": "Alarm Update",
          "isSelected": true,
          "disable": true
      },{
        "_id": "5f61f63dd474bf0p535a48df",
        "id": 4,
        "parent_id": "1",
        "title": "Alarm",
        "label": "alarmView",
        "value": "Alarm View",
        "isSelected": true,
        "disable": true
        },
        {
            "_id": "5fd0b3a86b709d32b4765cd3",
            "id": 1,
            "parent_id": "1"  ,
            "label": "Alerts",
            "value": "Alert",
            "title": "Alerts",
            "path": "alert-list-view",
            "isSelected": true,
            "disable": false
          },
            {
                "_id": "5fd0b3a86b709d32b4765cd9",
                "id": 1,
                "parent_id": "1",
                "label": "Map View",
                "value": "Map View",
                "title": "Map View",
                "path": "mapListView",
                "isSelected": true,
                "disable": false
            },
            {
              "_id": "5fd0b3a86b709d32b4765dd9",
              "id": 1,
              "parent_id": "1",
              "label": "Playback",
              "value": "Playback",
              "title": "Playback",
              "path": "playbackForm",
              "isSelected": true,
              "disable": false
          },
          {
            "_id": "5fd0b3a86b709d32b4765dd9",
            "id": 1,
            "parent_id": "1",
            "label": "GPS Reports",
            "value": "GPS Reports",
            "title": "GPS Reports",
            "path": "gpsreports",
            "isSelected": true,
            "disable": false
        },
          {
            "_id": "5fd0b3a86b718d32b4765dd9",
            "id": 1,
            "parent_id": "1",
            "label": "Analytics",
            "value": "Analytics",
            "title": "Analytics",
            "path": "analytics",
            "isSelected": true,
            "disable": false
        },
          {
            "_id": "5f61f63dd479bf0c535a4908",
            "id": 1,
            "parent_id": "1",
            "label": "Live Track",
            "value": "Live Track",
            "title": "Live Track",
            "path": "liveTrack",
            "isSelected": true,
            "disable": true
          },
          {
            "_id": "5fd0b3a86b709d32b4765cd3",
            "id": 1,
            "parent_id": "1",
            "label": "LandMark",
            "value": "Landmark",
            "title": "LandMark",
            "path": "landmark",
            "isSelected": true,
            "disable": false
          },
          {
            "_id": "5fd0b3a86b709d32b4765cd32",
            "id": 1,
            "parent_id": "1",
            "label": "Geofence",
            "value": "Geofence",
            "title": "Geofence",
            "path": "geofence",
            "isSelected": true,
            "disable": false
          },
          {
            "_id": "5fd0b3a86b709d32b4765cd32",
            "id": 1,
            "parent_id": "1",
            "label": "Sensor",
            "value": "Sensor",
            "title": "Sensor",
            "path": "sensor",
            "isSelected": true,
            "disable": false
          },
        ]
    }
      // {
      //     "_id": "5f61f63dd474bf0c535a490f",
      //     "id": 2,
      //     "value": "Reports",
      //     "title": "Reports",
      //     "path": "report",
      //     "icon": "./assets/report.png",
      //     "isSelected": true,
      //     "isMainSelected": true,
      //     "disable": true,
      //     "children": [
      //         {
      //             "_id": "5f61f63dd474bf0c535a4910",
      //             "id": 1,
      //             "parent_id": "1",
      //             "label": "booking report",
      //             "value": "Booking Report",
      //             "title": "Booking Report",
      //             "path": "booking report",
      //             "isSelected": true,
      //             "disable": true
      //         },
      //       {
      //         "_id": "5f61f63dd474bf0c535a4911",
      //         "id": 2,
      //         "parent_id": "1",
      //         "label": "billing report",
      //         "value": "Billing Report",
      //         "title": "Billing Report",
      //         "path": "billing report",
      //         "isSelected": true,
      //         "disable": true
      //       },
      //         {
      //             "_id": "5f61f63dd474bf0c535a4912",
      //             "id": 3,
      //             "parent_id": "1",
      //             "label": "gr report",
      //             "value": "Gr Report",
      //             "title": "Gr Report",
      //             "path": "gr report",
      //             "isSelected": true,
      //             "disable": true
      //         },
      //       {
      //         "_id": "5f61f63dd474bf0c535a4913",
      //         "id": 4,
      //         "parent_id": "1",
      //         "label": "trip performance report",
      //         "value": "Trip Performance Report",
      //         "title": "Trip Performance Report",
      //         "path": "trip performance report",
      //         "isSelected": true,
      //         "disable": true
      //       }
      //     ]
      // },
      // {
      //   "_id": "5f61f63dd474bf0c535a490g",
      //   "id": 2,
      //   "value": "Accounting",
      //   "title": "Accounting",
      //   "path": "Accounting",
      //   "icon": "./assets/account.png",
      //   "isSelected": true,
      //   "isMainSelected": true,
      //   "disable": true,
      //   "children": [
      //     {
      //       "_id": "5f61f63dd474bf0c535a4910",
      //       "id": 1,
      //       "parent_id": "1",
      //       "label": "voucher",
      //       "value": "Voucher",
      //       "title": "Voucher",
      //       "path": "voucher",
      //       "isSelected": true,
      //       "disable": true
      //     },
      //     {
      //       "_id": "5f61f63dd474bf0c535a4911",
      //       "id": 1,
      //       "parent_id": "1",
      //       "label": "Ledger",
      //       "value": "Ledger",
      //       "title": "Ledger",
      //       "path": "ledger",
      //       "isSelected": true,
      //       "disable": true
      //     }
      //   ]
      // }
  ];

   }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.roles = this.storageServ.get('userData').access;
    this.userName = this.storageServ.get('userData')?.user?.full_name;
    this.clinetName = this.storageServ.get('userData')?.client_config?.client_display_name;

    for(const submenu of this.getObj) {
      submenu.children = submenu.children.filter((child: any)=>{
        return this.roles[child.value] !== undefined;
      });
    }

    // console.log(this.getObj);
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  openHandler(value: any) {
    for(const submenu of this.getObj){
      if(submenu != value)  submenu.open = false;
      else submenu.open = true;
    }
  }

  logout() {
    this.storageServ.clearAll();
    this.router.navigate(['/login']);
  }

  getPath(parent: any, child: any) {
    let path = 'home/';
    if (parent && parent.path) {
      path += parent.path;
      if (child && child.path) {
        path += ('/' + child.path);
      }
    }
    return path;
  }

  selectHandler(parent: any, child: any) {
    this.close();
    if(this.innerWidth <= 500) {
      this.isCollapsed = !this.isCollapsed;
    }
    const path = this.getPath(parent, child);
    this.router.navigate([path]);
  }

}
