import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackListComponent } from './playback-list.component';

describe('PlaybackListComponent', () => {
  let component: PlaybackListComponent;
  let fixture: ComponentFixture<PlaybackListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaybackListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
