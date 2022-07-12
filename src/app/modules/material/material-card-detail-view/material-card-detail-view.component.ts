import { Component, OnInit } from '@angular/core';
import {faPlusSquare, faEdit, faTrash, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {NzModalService} from "ng-zorro-antd/modal";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-material-card-detail-view',
  templateUrl: './material-card-detail-view.component.html',
  styleUrls: ['./material-card-detail-view.component.scss']
})
export class MaterialCardDetailViewComponent implements OnInit {
  selectedRowId: any;
  selectedItem:any;
  mode: any;
  getId: any;
  receivedData: any;
  faEdit = faEdit;

  constructor(
    private modal: NzModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    this.route.params.subscribe(queryParam => {
      if(queryParam._id) {

        this.getId = queryParam._id;
        const currentState = this.router.getCurrentNavigation();
        this.receivedData = currentState && currentState.extras.state;
        console.log(this.receivedData);
        this.fillFormdata(this.getId);
        // this.getIdData();
      }

    })
  }
  fillFormdata(id:any){

  }
  ngOnInit(): void {
  }
  navigateToEdit(receivedData:any) {
    // if (!this.selectedRowId) {
    //   this.modal.error({
    //     nzTitle: 'Error',
    //     nzContent: 'Please select any one row'
    //   });
    //   return;
    // }
    this.router.navigateByUrl("home/master/material/upsert/" + this.selectedRowId,{state: this.selectedItem});
  }

}
