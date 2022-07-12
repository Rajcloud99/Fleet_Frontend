import { Component, OnInit ,OnDestroy,AfterViewInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import {BreakpointObserver, Breakpoints, BreakpointState  } from '@angular/cdk/layout'
import { Socket } from 'ngx-socket-io';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

   // dataSource!: MatTableDataSource<any>;
  public isScreenSmall!: boolean;
  isCollapsed = false;
  constructor(private router: Router,
              private socket: Socket,
              private breakpointObserver: BreakpointObserver) { }
  fillerNav = ['Masters','Operations','Tracking','Billing Management','Reports','Accounting And Taxation'];

  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
   // this.dataSource.sort = this.sort;
 }
 
  ngOnInit(): void {
    this.breakpointObserver 
    // .observe([Breakpoints.XSmall])
    .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
    .subscribe((state: BreakpointState) => {
      this.isScreenSmall = state.matches;
    })
  }
  displayedColumnsHeader: string[] = ['Name', 'Address','Customer','Type', 'Contact Person','Contact Number','GST NO','LATITUDE','LONGITUDE','ADDED BY','CREATED AT'];
  displayedColumns: string[] = ['name', 'address','customer.name','type', 'contact_person','contact_number','gstin','lat','lng','last_modified_by_name','created_at'];
  
  logout() {
    // this.storageServ.clearAll();
    this.router.navigate(['/login']);
    this.socket.removeAllListeners('message');
  }

}
