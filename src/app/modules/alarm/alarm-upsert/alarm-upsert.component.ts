import { DatePipe } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MasterService } from '../../master.service';

@Component({
  selector: 'app-alarm-upsert',
  templateUrl: './alarm-upsert.component.html',
  styleUrls: ['./alarm-upsert.component.scss']
})
export class AlarmUpsertComponent implements OnInit {

  mob: any; // modelName
  sGeozone: any; // modelName
  entry: any; // modelName
  exit: any; // modelName
  sDestination: any; // modelName
  over_speed: any; // modelName
  over_speed_name: any; // modelName
  over_speed_description: any; // modelName
  mobLst: any = [];
  vehData: any = [];
  vehDataCopy: any = [];
  geofenceData: any = [];
  tenDigit = false;
  emailFalse = false;
  emailLst: any = [];
  defaultTimes:any = []
  mulEmail: any = null;// modelName
  sTime:any; //modelName
  eTime: any; //modelName
  hTime: any; //modelName
  alertType: any; //modelName
  selTruck: any; //modelName
  showGeoList = false;
  showOverSpeed = false;
  showHalt = false;
  category: string = '';
  entry_msg: string = '';
  exit_msg: string = '';
  innerWidth = window.innerWidth;
  aCategory = [
    {
        'name': 'Alert',
        'scope': 'alert'
    },
    {
        'name': 'Loading',
        'scope': 'loading'
    },
    {
        'name': 'Unloading',
        'scope': 'unloading'
    }
  ];

  aAlertTypes = [
    {
        'name': 'Geofence Alert',
        'scope': 'geofence'
    },
    {
        'name': 'Overspeed Alert',
        'scope': 'over_speed'
    },
    {
        'name': 'Halt Alert',
        'scope': 'halt'
    }
  ];
  getId: any;
  editData: any = [];
  start_time: any;
  end_time: any;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private commonService: CommonService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {
        // Edit or Update Mode
        this.getId = queryParam._id;
        const currentState = this.router.getCurrentNavigation(); 
        this.editData = currentState && currentState.extras.state;
        // this.getIdData();
      } else {
        // Add Mode
        // this.mode = 1;
      }
    })
   }

  ngOnInit(): void {
    this.getVehicles();
    this.getAllGeofences();
  }

  fillFormdata (data: any) {
    this.alertType = data.atype;
    this.selTruck = this.vehData.find( (v:any)=> v.device_imei == data.imei);
    this.vehDataCopy= [this.selTruck];
    this.determineAction(data.atype);

    if(data.atype === 'geofence') {
      this.start_time = data.start_time;
      this.end_time = data.end_time;
      this.category = data.category;
      this.entry_msg = data.entry_msg;
      this.exit_msg = data.exit_msg;
      this.entry = data.entry ? true : false;
      this.exit = data.exit ? true : false;
    }

    if(data.atype === 'over_speed') {
      this.over_speed = data.over_speed;
      this.over_speed_name = data.name;
      this.over_speed_description = data.description;
    }

    if(data.atype === 'halt') {
      this.hTime = new Date().setHours(data.halt_duration/60);
      this.hTime = new Date(this.hTime).setMinutes(data.halt_duration%60);
    }
    this.category = data.category;
    this.mobLst = data.mobiles;
    this.emailLst = data.emails;
    this.selTruck.driver_name = data.driver_name;
    this.selTruck.vehicle_reg_no = data.vehicle_no;
    this.selTruck.device_imei = data.imei;
  }
  createA (): void {
    // $rootScope.alertData = [];
    let oAlert: any = {};
    oAlert.atype = this.alertType;
    if (oAlert.atype === 'geofence') {
      oAlert.start_time = new Date().toISOString();
      oAlert.end_time = new Date(new Date().setDate(new Date().getDate()+ 10)).toISOString();
      if(this.getId) {
        oAlert.start_time =  this.start_time;
        oAlert.end_time =  this.end_time;
      }
        oAlert.category = this.category;
        oAlert.entry_msg = this.entry_msg;
        oAlert.exit_msg = this.exit_msg;

        if (this.entry === true) {
            oAlert.entry = 1;
        } else {
            oAlert.entry = 0;
        }
        if (this.exit === true) {
            oAlert.exit = 1;
        } else {
            oAlert.exit = 0;
        }

        //***********************
        if (this.defaultTimes && this.defaultTimes.length > 0) {
            oAlert.schedules = [];
            for (let t = 0; t < this.defaultTimes.length; t++) {
                //**** custom time add with date ******//

                oAlert.schedules[t] = {};
                // var xx = $scope.todayDate;
                // xx.setHours($scope.defaultTimes[t].hourSel1);
                // xx.setMinutes($scope.defaultTimes[t].minuteSel1);
                // xx.setMilliseconds(00);
                oAlert.schedules[t].start = this.sTime.toISOString();
                // var yy = $scope.todayDate;
                // yy.setHours($scope.defaultTimes[t].hourSel2);
                // yy.setMinutes($scope.defaultTimes[t].minuteSel2);
                // yy.setMilliseconds(00);
                oAlert.schedules[t].end = this.eTime.toISOString();

                oAlert.schedules[t].msg = this.defaultTimes[t].msg;

                //**** custom time add with date ******//
            }
        }
        //***********************

        oAlert.gid = this.sGeozone.gid;
        if(this.sDestination)
            oAlert.dest_id = this.sDestination;
    }

    if (oAlert.atype === 'over_speed') {
        oAlert.over_speed = this.over_speed;
        oAlert.name = this.over_speed_name;
        oAlert.description = this.over_speed_description;
    }

    if (oAlert.atype === 'halt') {
        let minTime = this.hTime.getMinutes() + (this.hTime.getHours() * 60);
        oAlert.halt_duration = minTime;
    }
    if (this.mobLst && (this.mobLst.length > 0)) {
        oAlert.mobiles = this.mobLst;
    }
    if (this.emailLst && (this.emailLst.length > 0)) {
        oAlert.emails = this.emailLst;
    }
    oAlert.driver_name = this.selTruck.driver_name || 'NA';
    oAlert.vehicle_no = this.selTruck.vehicle_reg_no;
    oAlert.imei = this.selTruck.device_imei;
    this.masterService.createAlarm(oAlert).subscribe((res: any) => {
      if(res){
        console.log(res);
      }
    });
  }

  addNew () {
    if (this.defaultTimes && this.defaultTimes.length <= 3) {
      this.defaultTimes.push({});
  } else {
      return this.commonService.warningModal('Warning','You can add only 4 schedule.');
      // swal('warning', 'You can add only 4 schedule.', 'warning');
  }
  }

  
  changeCategory( cat: any) {
    if (cat === 'alert') {
      this.entry_msg = 'Enter Into Geofence.';
      this.exit_msg = 'Exit From Geofence.';
    } else if (cat === 'loading') {
      this.entry_msg = 'Wait For Loading.';
      this.exit_msg = 'Loaded';
    } else if (cat === 'unloading') {
      this.entry_msg = 'Wait For Unloading.';
      this.exit_msg = 'Unloaded';
    }
  }

  determineAction (item: any) {
    console.log(item);
    if (item === "geofence") {
        this.showGeoList = true;
        this.showOverSpeed = false;
        this.showHalt = false;
        this.category = 'alert';
        this.entry_msg = 'Enter Into Geofence.';
        this.exit_msg = 'Exit From Geofence.';
        // this.getGeoZone();   //****call geo list function
    } else if (item === "over_speed") {
        console.log("over_speed selected");
        this.showGeoList = false;
        this.showOverSpeed = true;
        this.showHalt = false;
    } else if (item === "halt") {
        console.log("halt selected");
        this.showGeoList = false;
        this.showOverSpeed = false;
        this.showHalt = true;
    } else {
        console.log("not defined");
        this.showGeoList = false;
        this.showOverSpeed = false;
        this.showHalt = false;
    }
  };


  mobChange (mobNum: any, addOrRemove: Boolean): void {
    if (mobNum) {
      if (addOrRemove) {
          const str = mobNum;
          let temp = new Array();
          // this will return an array with strings "1", "2", etc.
          temp = str.split(",");
          for (let n = 0; n < temp.length; n++) {
              if (temp[n]) {
                  this.mobLst.push(parseInt(temp[n]));
              }
          }
          this.mob = null;
          this.tenDigit = false;
      } else {
          this.mobLst.splice(this.mobLst.indexOf(mobNum), 1);
          this.emailFalse = false
      }
    } else {
      this.tenDigit = true;
    }
  }

  // if (userEmail) {
  //   $scope.emailLst = [userEmail];
  // } else {
  //   $scope.emailLst = [];
  // }

  // let emailFalse = false;
  emailChange (email: any, addOrRemove: Boolean): void {
    if (email) {
        if (addOrRemove) {
            var str = email;
            var temp = new Array();
            // this will return an array with strings "1", "2", etc.
            temp = str.split(",");
            for (var m = 0; m < temp.length; m++) {
                if (temp[m]) {
                    this.emailLst.push(temp[m]);
                }
            }
            //$scope.emailLst.push(email);
            this.mulEmail = null;
            this.emailFalse = false
        } else {
            this.emailLst.splice(this.emailLst.indexOf(email), 1);
            this.emailFalse = false
        }
    } else {
        this.emailFalse = true;
    }
};

  getVehicles() {
    let req: any = {
      all: 'true',
			device_imei: {
				$exists: true,
				$ne: null
			},
			project: {
				device_imei: 1,
				vehicle_reg_no: 1,
				status: 1,
				segment_type: 1,
        driver_name: 1
			}
    };
    this.masterService.getAllVehicle(req).subscribe((data: any)=>{
      if(data){
        this.vehData = data;
        this.vehDataCopy = this.vehData;
        if(this.getId)
          this.fillFormdata(this.editData);
      }
    })
  }
  
  getAllGeofences() {
    this.masterService.getGeofence().subscribe((res: any) => {
      if(res) {
        this.geofenceData = res?.data;
      }
    });
  }
}
