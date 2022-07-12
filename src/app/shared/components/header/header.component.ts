import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/services/common.service';
import { StorageService } from 'src/app/services/storage.service';
import { MoreMenu } from '../../modal/moreMenu.modal';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  @Output() drawerCollapsedChange = new EventEmitter<boolean>();
  @Input() 
  drawerCollapsed!: boolean;
  faCog = faCog;
  faSignOutAlt = faSignOutAlt;
  showName: any ;
  visibleBackBtn: any;
  innerWidth: any;
  navTittle='';
  filterArray:MoreMenu[]=[];
  @HostListener('window: resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  subscription = new Subscription();
  
  

  constructor(private router: Router,
              private store: StorageService,
              private commonService: CommonService,
              private location: Location,private activatedRoute: ActivatedRoute) {
                // show back button
  this.commonService.commonUsed.subscribe((val: any) => {
 
    if (val && val.name === 'backButton') {
      this.visibleBackBtn = val && val.value;
    }
  });

  this.subscription.add(this.commonService.navbarTittle.subscribe((o)=>{
    this.navTittle=o;
  }));
 
  this.subscription.add(this.commonService.SetmoreMenu.subscribe((o)=>{
    

      this.filterArray=o.filter(obj=>obj.isVisible === true ); 
      if(this.innerWidth > 500){
        console.log('hp',this.filterArray);
        this.filterArray=this.filterArray.filter(f=>f.tittle !='fiter');
        console.log('hp',this.filterArray);
      }
     

  }));
}
  ngOnInit(): void { 
    this.innerWidth = window.innerWidth;
       if(this.innerWidth > 500){
      this.commonService.hideShowMenu(['filter'],false);
    }
    this.showName = this.store.get('userData', {}).client_config.client_full_name;
  }

  goBack() {
    this.location.back();
  }
  

  logout() {
    this.store.clearAll();
    this.router.navigate(['/login']);
  }

  toggle() {
    this.drawerCollapsedChange.emit(!this.drawerCollapsed);
  }

  ngOnDestroy(): void {
  //  this.commonService.SetmoreMenu.next([]);
  this.subscription.unsubscribe();
  }

}

