import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-playback-list',
  templateUrl: './playback-list.component.html',
  styleUrls: ['./playback-list.component.scss']
})
export class PlaybackListComponent implements OnInit {

  innerWidth = window.innerWidth;
  playbackData: any = [];
  tripBase: any;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.route.params.subscribe((queryParam) => {
      const currentState = this.router.getCurrentNavigation();
      this.playbackData = currentState && currentState.extras.state;
      
    })
  }

  ngOnInit(): void {
    this.tripBase = this.playbackData?.tripBase;
    delete this.playbackData.tripBase;
    if(this.tripBase != 'Sim Based') {
      this.playbackData?.forEach((data: any) => {
          data.duration = this.secondsToHms(data?.duration);
          data.distance = data.distance/1000;
          data.distance = data.distance.toFixed(2);
      });
    } else {
      for(const data of this.playbackData) {
          data.entering_time = data.start_time;
      }
    }
  }

  secondsToHms(d : any) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

}
