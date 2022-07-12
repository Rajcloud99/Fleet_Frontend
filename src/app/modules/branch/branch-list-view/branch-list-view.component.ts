import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../master.service'
import {faPlusSquare, faEdit, faTrash, faSearch, faTimes,faDownload, faFilter} from '@fortawesome/free-solid-svg-icons'
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { MoreMenu } from 'src/app/shared/modal/moreMenu.modal';
@Component({
  selector: 'app-branch-list-view',
  templateUrl: './branch-list-view.component.html',
  styleUrls: ['./branch-list-view.component.scss']
})
export class BranchListViewComponent implements OnInit {
  receivedData: any;
  @ViewChild("donwload", { static: false })
  donwloadAnchor!: ElementRef;
  stopScrolling = false;
  pageNumber = 2;
  timer: any;
  filterObj = {
    name: ''
  };
  selectedRowId: any;
  selectedItem: any;
  faDownload = faDownload; // fontawesome icon
  faPlusSquare = faPlusSquare; // fontawesome icon
  faEdit = faEdit; // fontawesome icon
  faTrash  = faTrash; // fontawesome icon
  faSearch = faSearch; // fontawesome icon
  faTimes = faTimes; // fontawesome icon
  faFilter = faFilter; // fontawesome icon
  innerWidth: any;// stores width of any screeen
  receivedAllBranches: any;
  isMobFilterVisible = false;

  scrollTable!: HTMLCollectionOf<Element>;
  @HostListener("window: resize", ["$event"])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private masterService: MasterService,
    private router: Router,
    private commonServ : CommonService
  ) { }
  
  loadingObservable = this.commonServ.loadingObservable;
  
  ngOnInit(): void {

    let _moreMenu:MoreMenu[]=[
      {
        tittle:"fiter",
        iconName:"fa-filter",
        isVisible:true,
        clickEventMethode:()=>{
          this.isMobFilterVisible = !this.isMobFilterVisible;
        }
      },
      {
        tittle:"Add Branch",
        iconName:"fa-plus-circle",
        isVisible:true,
        clickEventMethode:()=>{
          this.navigateToAddPage();
        }
      } ,
      {
        tittle:"Edit Branch",
        iconName:"fa-edit",
        isVisible:false,
        clickEventMethode:()=>{
          this.navigateTo();
        }
      } ,  
      // {
      //   tittle:"View Landmark",
      //   iconName:"fa-eye",
      //   isVisible:false,
      //   clickEventMethode:()=>{
      //     this.navigateToDetails();
      //   }
      // } 
      
      {
        tittle:"Download",
        iconName:"fa-download",
        isVisible:true,
        clickEventMethode:()=>{
          this.downloadReport();
        }
      } 
    ];
    this.commonServ.setNavTittleAndMenu("All Branch",_moreMenu);


    this.innerWidth = window.innerWidth;
    this.search();
  }

  
  selectItem(item: any) {
    this.selectedItem = item;
    this.selectedRowId = item._id;
    
    this.commonServ.hideShowMenu(["Edit Branch"],true);
  }

  getAllBranch () {

  }

  search () {
      this.masterService.getAllBranch({name:this.filterObj.name, no_of_docs: 15}).subscribe((res: any) => {
        if(res) {
          this.receivedData = res;
          this.scrollTable = document.getElementsByClassName("ant-table-body");
          this.scrollTable[0]?.addEventListener('scroll',() => {
          this.getDataOnScroll();
        } )
        }

      });
  }

  downloadReport() {
    this.masterService.getAllBranch({download: true, all: true}).subscribe((res:any) => {
      if(res && res.url) {
        this.donwloadAnchor.nativeElement.href = res.url;
          this.donwloadAnchor.nativeElement.click();
      }
    })
  }

  reset () {
    this.filterObj.name = '';
  }
  onSearch(value: any) {
    if(value) {
      this.receivedAllBranches = [];
      this.masterService.getAllBranch({name: value}).subscribe((res: any) => {
        this.receivedAllBranches = res;
      });
    }
  }

  // navigate to upsert page of category
  navigateTo() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.router.navigateByUrl("home/master/branch/upsert/" + this.selectedRowId,{state: this.selectedItem});
    // this.commonServ.commonUsed.next({ name: "backButton", value: true });
  }

  navigateToAddPage () {
    this.router.navigateByUrl("home/master/branchUpsert");
  }
  // delete api
  delete() {
    if (!this.selectedRowId) {
      this.commonServ.errorModal("Error", "Please select any one row");
      return;
    }
    this.masterService.deleteBranch(this.selectedRowId,{'deleted':true,_id: this.selectedRowId}).subscribe((data: any) => {
      if (data) {
        this.search();
        this.router.navigateByUrl('home/master/branch');
      } 
    });
  }

  getDataOnScroll() {
    if (true) {
      let divElement: any = document.getElementsByClassName('ant-table-body')[0] || document.getElementById('myDIV');
      if ((divElement.scrollTop + divElement.clientHeight) >= divElement.scrollHeight) {
        if (this.stopScrolling === false) {
          if (this.timer) {
            clearTimeout(this.timer);
          }
          const mContext = this;
          this.timer = window.setTimeout( ()=> {
            mContext.masterService.getAllBranch({ no_of_docs: 10, skip: mContext.pageNumber, name: this.filterObj.name }).subscribe(data => {
              if (data) {
                if (data.length=== 0) {
                  mContext.stopScrolling = true;
                } else {
                  mContext.receivedData = [...mContext.receivedData, ...data];
                  mContext.pageNumber = mContext.pageNumber + 1;
                }
              }
              return;
            });
          }, 400);
        }
      }
    }
  }
}
