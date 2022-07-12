import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportRouteUpsertComponent } from './transport-route-upsert.component';

describe('TransportRouteUpsertComponent', () => {
  let component: TransportRouteUpsertComponent;
  let fixture: ComponentFixture<TransportRouteUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportRouteUpsertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportRouteUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
