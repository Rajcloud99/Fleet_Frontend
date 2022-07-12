import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRouteListViewComponent } from './transport-route-list-view.component';

describe('TransportRouteListViewComponent', () => {
  let component: TransportRouteListViewComponent;
  let fixture: ComponentFixture<TransportRouteListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRouteListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRouteListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
