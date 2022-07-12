import { Component, OnInit } from '@angular/core';
import { faChevronCircleLeft} from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common'

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss']
})
export class BackButtonComponent implements OnInit {
  faChevronCircleLeft = faChevronCircleLeft;
  constructor(
    private location: Location
  ) { }

  ngOnInit(): void {
  }
  goBack() {
    this.location.back();
  }
}
