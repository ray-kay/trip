import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDestinationPanelComponent } from './map-destination-panel.component';

describe('MapDestinationPanelComponent', () => {
  let component: MapDestinationPanelComponent;
  let fixture: ComponentFixture<MapDestinationPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapDestinationPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDestinationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
