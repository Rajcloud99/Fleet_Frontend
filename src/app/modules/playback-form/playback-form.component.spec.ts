import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaybackFormComponent } from './playback-form.component';

describe('PlaybackFormComponent', () => {
  let component: PlaybackFormComponent;
  let fixture: ComponentFixture<PlaybackFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaybackFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaybackFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
