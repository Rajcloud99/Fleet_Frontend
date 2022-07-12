import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrafficManagerComponent } from './traffic-manager.component';

describe('TrafficManagerComponent', () => {
  let component: TrafficManagerComponent;
  let fixture: ComponentFixture<TrafficManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrafficManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrafficManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
