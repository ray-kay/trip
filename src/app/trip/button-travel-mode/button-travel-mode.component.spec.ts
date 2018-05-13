import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTravelModeComponent } from './button-travel-mode.component';

describe('ButtonTravelModeComponent', () => {
  let component: ButtonTravelModeComponent;
  let fixture: ComponentFixture<ButtonTravelModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonTravelModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTravelModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
