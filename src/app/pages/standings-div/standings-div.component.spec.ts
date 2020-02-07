import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsDivComponent } from './standings-div.component';

describe('StandingsDivComponent', () => {
  let component: StandingsDivComponent;
  let fixture: ComponentFixture<StandingsDivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandingsDivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandingsDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
